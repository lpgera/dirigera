import os from 'node:os'
import {
  calculateCodeChallenge,
  CODE_CHALLENGE_METHOD,
  generateCodeVerifier,
} from './authCode'
import { discoverGatewayIP } from './mdnsDiscovery'
import { closeWebSocket, initializeWebSocket } from './ws'
import type { Home } from './types/Home'
import type { Event } from './types/event/Event'
import hub from './api/hub'
import devices from './api/devices'
import lights from './api/lights'
import outlets from './api/outlets'
import controllers from './api/controllers'
import speakers from './api/speakers'
import blinds from './api/blinds'
import airPurifiers from './api/airPurifiers'
import repeaters from './api/repeaters'
import motionSensors from './api/motionSensors'
import lightSensors from './api/lightSensors'
import environmentSensors from './api/environmentSensors'
import openCloseSensors from './api/openCloseSensors'
import deviceSets from './api/deviceSets'
import rooms from './api/rooms'
import scenes from './api/scenes'
import music from './api/music'
import users from './api/users'

export type DirigeraClient = Awaited<ReturnType<typeof createDirigeraClient>>
export type { AirPurifier } from './types/device/AirPurifier'
export type { Blinds } from './types/device/Blinds'
export type { Capabilities } from './types/Capabilities'
export type { Controller } from './types/device/Controller'
export type { Device } from './types/device/Device'
export type { DeviceSet } from './types/DeviceSet'
export type { EnvironmentSensor } from './types/device/EnvironmentSensor'
export type { Home } from './types/Home'
export type { Hub } from './types/device/Hub'
export type { Light } from './types/device/Light'
export type { LightSensor } from './types/device/LightSensor'
export type { MotionSensor } from './types/device/MotionSensor'
export type { Music } from './types/Music'
export type { OpenCloseSensor } from './types/device/OpenCloseSensor'
export type { Outlet } from './types/device/Outlet'
export type { Repeater } from './types/device/Repeater'
export type { Room } from './types/Room'
export type { Scene } from './types/Scene'
export type { Speaker } from './types/device/Speaker'
export type { User } from './types/User'

export type { Event } from './types/event/Event'
export type { DeviceAddedEvent } from './types/event/DeviceAddedEvent'
export type { DeviceConfigurationChangedEvent } from './types/event/DeviceConfigurationChangedEvent'
export type { DeviceDiscoveredEvent } from './types/event/DeviceDiscoveredEvent'
export type { DeviceRemovedEvent } from './types/event/DeviceRemovedEvent'
export type { DeviceSetCreatedEvent } from './types/event/DeviceSetCreatedEvent'
export type { DeviceSetDeletedEvent } from './types/event/DeviceSetDeletedEvent'
export type { DeviceSetUpdatedEvent } from './types/event/DeviceSetUpdatedEvent'
export type { DeviceStateChangedEvent } from './types/event/DeviceStateChangedEvent'
export type { MusicUpdatedEvent } from './types/event/MusicUpdatedEvent'
export type { PingEvent } from './types/event/PingEvent'
export type { PongEvent } from './types/event/PongEvent'
export type { RoomCreatedEvent } from './types/event/RoomCreatedEvent'
export type { RoomDeletedEvent } from './types/event/RoomDeletedEvent'
export type { RoomUpdatedEvent } from './types/event/RoomUpdatedEvent'
export type { SceneCompletedEvent } from './types/event/SceneCompletedEvent'
export type { SceneCreatedEvent } from './types/event/SceneCreatedEvent'
export type { SceneDeletedEvent } from './types/event/SceneDeletedEvent'
export type { SceneTriggeredEvent } from './types/event/SceneTriggeredEvent'
export type { SceneUpdatedEvent } from './types/event/SceneUpdatedEvent'
export type { TerminationEvent } from './types/event/TerminationEvent'

export async function createDirigeraClient({
  gatewayIP,
  accessToken,
}: {
  gatewayIP?: string
  accessToken?: string
} = {}) {
  const ip = gatewayIP ?? (await discoverGatewayIP())

  const { got } = await import('got')

  const gotInstance = got.extend({
    prefixUrl: `https://${ip}:8443/v1`,
    headers: {
      ...(accessToken ? { authorization: `Bearer ${accessToken}` } : null),
    },
    https: {
      rejectUnauthorized: false,
    },
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

      const { default: pRetry } = await import('p-retry')

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
          onFailedAttempt: (error) => {
            if (verbose) {
              process.stdout.write(
                `\rTime left: ${String(error.retriesLeft).padStart(2, ' ')} seconds`
              )
              if (error.retriesLeft === 0) {
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
    lightSensors: lightSensors(gotInstance),
    environmentSensors: environmentSensors(gotInstance),
    openCloseSensors: openCloseSensors(gotInstance),
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
