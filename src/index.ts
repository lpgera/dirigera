import os from 'node:os'
import { Agent } from 'node:https'
import got from 'got'
import pRetry from 'p-retry'
import {
  calculateCodeChallenge,
  CODE_CHALLENGE_METHOD,
  generateCodeVerifier,
} from './authCode.ts'
import certificate from './certificate.ts'
import { discoverGatewayIP } from './mdnsDiscovery.ts'
import { closeWebSocket, initializeWebSocket } from './ws.ts'
import type { Home } from './types/Home.ts'
import type { Event } from './types/event/Event.ts'
import hub from './api/hub.ts'
import devices from './api/devices.ts'
import lights from './api/lights.ts'
import outlets from './api/outlets.ts'
import controllers from './api/controllers.ts'
import speakers from './api/speakers.ts'
import blinds from './api/blinds.ts'
import airPurifiers from './api/airPurifiers.ts'
import repeaters from './api/repeaters.ts'
import motionSensors from './api/motionSensors.ts'
import occupancySensors from './api/occupancySensors.ts'
import lightSensors from './api/lightSensors.ts'
import environmentSensors from './api/environmentSensors.ts'
import openCloseSensors from './api/openCloseSensors.ts'
import waterSensors from './api/waterSensors.ts'
import deviceSets from './api/deviceSets.ts'
import rooms from './api/rooms.ts'
import scenes from './api/scenes.ts'
import music from './api/music.ts'
import users from './api/users.ts'

export type DirigeraClient = Awaited<ReturnType<typeof createDirigeraClient>>
export type { AirPurifier } from './types/device/AirPurifier.ts'
export type { Blinds } from './types/device/Blinds.ts'
export type { Capabilities } from './types/Capabilities.ts'
export type { Controller } from './types/device/Controller.ts'
export type { Device } from './types/device/Device.ts'
export type { DeviceSet } from './types/DeviceSet.ts'
export type { EnvironmentSensor } from './types/device/EnvironmentSensor.ts'
export type { Home } from './types/Home.ts'
export type { Hub } from './types/device/Hub.ts'
export type { Light } from './types/device/Light.ts'
export type { LightSensor } from './types/device/LightSensor.ts'
export type { MotionSensor } from './types/device/MotionSensor.ts'
export type { Music } from './types/Music.ts'
export type { OccupancySensor } from './types/device/OccupancySensor.ts'
export type { OpenCloseSensor } from './types/device/OpenCloseSensor.ts'
export type { Outlet } from './types/device/Outlet.ts'
export type { Repeater } from './types/device/Repeater.ts'
export type { Room } from './types/Room.ts'
export type { Scene } from './types/Scene.ts'
export type { Speaker } from './types/device/Speaker.ts'
export type { User } from './types/User.ts'
export type { WaterSensor } from './types/device/WaterSensor.ts'

export type { Event } from './types/event/Event.ts'
export type { DeviceAddedEvent } from './types/event/DeviceAddedEvent.ts'
export type { DeviceConfigurationChangedEvent } from './types/event/DeviceConfigurationChangedEvent.ts'
export type { DeviceDiscoveredEvent } from './types/event/DeviceDiscoveredEvent.ts'
export type { DeviceRemovedEvent } from './types/event/DeviceRemovedEvent.ts'
export type { DeviceSetCreatedEvent } from './types/event/DeviceSetCreatedEvent.ts'
export type { DeviceSetDeletedEvent } from './types/event/DeviceSetDeletedEvent.ts'
export type { DeviceSetUpdatedEvent } from './types/event/DeviceSetUpdatedEvent.ts'
export type { DeviceStateChangedEvent } from './types/event/DeviceStateChangedEvent.ts'
export type { MusicUpdatedEvent } from './types/event/MusicUpdatedEvent.ts'
export type { PingEvent } from './types/event/PingEvent.ts'
export type { PongEvent } from './types/event/PongEvent.ts'
export type { RemotePressEvent } from './types/event/RemotePressEvent.ts'
export type { RoomCreatedEvent } from './types/event/RoomCreatedEvent.ts'
export type { RoomDeletedEvent } from './types/event/RoomDeletedEvent.ts'
export type { RoomUpdatedEvent } from './types/event/RoomUpdatedEvent.ts'
export type { SceneCompletedEvent } from './types/event/SceneCompletedEvent.ts'
export type { SceneCreatedEvent } from './types/event/SceneCreatedEvent.ts'
export type { SceneDeletedEvent } from './types/event/SceneDeletedEvent.ts'
export type { SceneTriggeredEvent } from './types/event/SceneTriggeredEvent.ts'
export type { SceneUpdatedEvent } from './types/event/SceneUpdatedEvent.ts'
export type { TerminationEvent } from './types/event/TerminationEvent.ts'

export async function createDirigeraClient({
  gatewayIP,
  accessToken,
  rejectUnauthorized = true,
}: {
  gatewayIP?: string
  accessToken?: string
  rejectUnauthorized?: boolean
} = {}) {
  const ip = gatewayIP ?? (await discoverGatewayIP())

  const gotInstance = got.extend({
    prefixUrl: `https://${ip}:8443/v1`,
    headers: {
      ...(accessToken ? { authorization: `Bearer ${accessToken}` } : null),
    },
    ...(rejectUnauthorized
      ? {
          agent: {
            https: new Agent({
              ca: [certificate],
              checkServerIdentity: () => undefined,
            }),
          },
        }
      : { https: { rejectUnauthorized: false } }),

    hooks: {
      beforeError: [
        (error) => {
          if (
            error.code === 'ERR_NON_2XX_3XX_RESPONSE' &&
            error?.response?.body
          ) {
            error.name = 'DirigeraError'
            error.message = `${error.response.body}`
          }

          return error
        },
      ],
    },
  })

  return {
    async authenticate({ verbose = false }: { verbose?: boolean } = {}) {
      const codeVerifier = generateCodeVerifier()
      const codeChallenge = calculateCodeChallenge(codeVerifier)

      const { code }: { code: string } = await gotInstance
        .get(`oauth/authorize`, {
          searchParams: {
            audience: 'homesmart.local',
            response_type: 'code',
            code_challenge: codeChallenge,
            code_challenge_method: CODE_CHALLENGE_METHOD,
          },
        })
        .json()

      if (verbose) {
        console.log(
          'Press the Action Button on the bottom of your Dirigera Hub within 60 seconds.'
        )
      }

      return await pRetry(
        async () => {
          const { access_token }: { access_token: string } = await gotInstance
            .post(`oauth/token`, {
              form: {
                code,
                name: os.hostname(),
                grant_type: 'authorization_code',
                code_verifier: codeVerifier,
              },
            })
            .json()

          if (!access_token) {
            throw new Error('Access token is missing.')
          }

          if (verbose) {
            process.stdout.write('\n')
          }

          return access_token
        },
        {
          retries: 59,
          minTimeout: 1000,
          factor: 1,
          onFailedAttempt: (context) => {
            if (verbose) {
              process.stdout.write(
                `\rTime left: ${String(context.retriesLeft).padStart(2, ' ')} seconds`
              )
              if (context.retriesLeft === 0) {
                process.stdout.write('\n')
              }
            }
          },
        }
      )
    },
    async home() {
      return await gotInstance.get(`home`).json<Home>()
    },
    hub: hub(gotInstance),
    devices: devices(gotInstance),
    lights: lights(gotInstance),
    outlets: outlets(gotInstance),
    controllers: controllers(gotInstance),
    speakers: speakers(gotInstance),
    blinds: blinds(gotInstance),
    airPurifiers: airPurifiers(gotInstance),
    repeaters: repeaters(gotInstance),
    motionSensors: motionSensors(gotInstance),
    occupancySensors: occupancySensors(gotInstance),
    lightSensors: lightSensors(gotInstance),
    environmentSensors: environmentSensors(gotInstance),
    openCloseSensors: openCloseSensors(gotInstance),
    waterSensors: waterSensors(gotInstance),
    deviceSets: deviceSets(gotInstance),
    rooms: rooms(gotInstance),
    scenes: scenes(gotInstance),
    music: music(gotInstance),
    users: users(gotInstance),
    startListeningForUpdates(callback: (updateEvent: Event) => void) {
      if (!accessToken) {
        throw new Error('Access token is missing.')
      }
      initializeWebSocket({
        ip,
        accessToken,
        callback,
      })
    },
    stopListeningForUpdates() {
      closeWebSocket()
    },
  }
}
