import readline from 'readline/promises'
import os from 'os'
import got from 'got-cjs'
import {
  calculateCodeChallenge,
  CODE_CHALLENGE_METHOD,
  generateCodeVerifier,
} from './authCode'
import { discoverGatewayIP } from './mdnsDiscovery'
import { initializeWebSocket } from './ws'
import lights from './api/lights'
import outlets from './api/outlets'
import controllers from './api/controllers'
import speakers from './api/speakers'
import blinds from './api/blinds'
import airPurifiers from './api/airPurifiers'
import repeaters from './api/repeaters'
import motionSensors from './api/motionSensors'
import deviceSets from './api/deviceSets'

export default async function createDirigeraClient({
  gatewayIP,
  accessToken,
}: {
  gatewayIP?: string
  accessToken?: string
}) {
  const ip = gatewayIP ?? (await discoverGatewayIP())

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
    // TODO return type missing
    async home() {
      if (!accessToken) {
        throw new Error('Access token is missing.')
      }
      return gotInstance.get(`home`).json()
    },
    lights: lights(gotInstance, accessToken),
    outlets: outlets(gotInstance, accessToken),
    controllers: controllers(gotInstance, accessToken),
    speakers: speakers(gotInstance, accessToken),
    blinds: blinds(gotInstance, accessToken),
    airPurifiers: airPurifiers(gotInstance, accessToken),
    repeaters: repeaters(gotInstance, accessToken),
    motionSensors: motionSensors(gotInstance, accessToken),
    deviceSets: deviceSets(gotInstance, accessToken),
    // TODO low level API, shouldn't be exposed
    async setRoomState(
      id: string,
      attributes: Record<string, any>,
      transitionTime?: number
    ) {
      if (!accessToken) {
        throw new Error('Access token is missing.')
      }
      return gotInstance
        .patch(`devices/room/${id}`, {
          json: [
            {
              attributes,
              transitionTime,
            },
          ],
        })
        .json()
    },
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
  }
}
