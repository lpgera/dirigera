import readline from 'readline/promises'
import os from 'os'
import {
  calculateCodeChallenge,
  CODE_CHALLENGE_METHOD,
  generateCodeVerifier,
} from './authCode'
import { discoverGatewayIP } from './mdnsDiscovery'
import { closeWebSocket, initializeWebSocket } from './ws'
import type { Home } from './types/Home'
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
import deviceSets from './api/deviceSets'
import rooms from './api/rooms'
import scenes from './api/scenes'
import music from './api/music'
import users from './api/users'

export type DirigeraClient = Awaited<ReturnType<typeof createDirigeraClient>>
export type { AirPurifier } from './types/AirPurifier'
export type { Blinds } from './types/Blinds'
export type { Capabilities } from './types/Capabilities'
export type { Controller } from './types/Controller'
export type { Device } from './types/Device'
export type { DeviceSet } from './types/DeviceSet'
export type { Home } from './types/Home'
export type { Hub } from './types/Hub'
export type { Light } from './types/Light'
export type { MotionSensor } from './types/MotionSensor'
export type { Music } from './types/Music'
export type { Outlet } from './types/Outlet'
export type { Repeater } from './types/Repeater'
export type { Room } from './types/Room'
export type { Scene } from './types/Scene'
export type { Speaker } from './types/Speaker'
export type { User } from './types/User'

export async function createDirigeraClient({
  gatewayIP,
  accessToken,
}: {
  gatewayIP?: string
  accessToken?: string
}) {
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
    async authenticate() {
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

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      await rl.question(
        'Press the Action Button on the bottom of your Dirigera Hub and then press the Enter button here'
      )

      rl.close()

      const { access_token: accessToken }: { access_token: string } =
        await gotInstance
          .post(`oauth/token`, {
            form: {
              code,
              name: os.hostname(),
              grant_type: 'authorization_code',
              code_verifier: codeVerifier,
            },
          })
          .json()

      return accessToken
    },
    async home() {
      return (await gotInstance.get(`home`).json()) as Home
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
    deviceSets: deviceSets(gotInstance),
    rooms: rooms(gotInstance),
    scenes: scenes(gotInstance),
    music: music(gotInstance),
    users: users(gotInstance),
    startListeningForUpdates(callback: (updateEvent: any) => void) {
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
