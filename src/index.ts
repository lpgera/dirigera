import readline from 'readline/promises'
import os from 'os'
import {
  calculateCodeChallenge,
  CODE_CHALLENGE_METHOD,
  generateCodeVerifier,
} from './authCode'
import { discoverGatewayIP } from './mdnsDiscovery'
import { initializeWebSocket } from './ws'
import type { Home } from './types/Home'
import hub from './api/hub'
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

/** Access Token Store
 * - Retrieves the access token
 * - If `accessToken` parameter is specified, you should store the token for later use.
 *
 * ```ts
 * const client = createDirigeraClient({
 *     accessToken: async (accessToken) => {
 *         const file = 'token.txt';
 *         if (accessToken) {
 *             await writeFile(file, 'token.txt')
 *         }
 *         try {
 *             return await readFile(file, 'utf8');
 *         } catch(err) {
 *             return null;
 *         }
 *     }
 * })
 * ```
 */
type AccessTokenStore = (
  accessToken?: string
) => string | null | Promise<string | null>

export async function createDirigeraClient({
  gatewayIP,
  accessToken,
}: {
  gatewayIP?: string
  accessToken?: string | null | AccessTokenStore
}) {
  const ip = gatewayIP ?? (await discoverGatewayIP())

  const accessTokenStore =
    typeof accessToken === 'function' ? accessToken : null
  accessToken =
    typeof accessToken === 'function' ? await accessToken() : accessToken

  const { got } = await import('got')

  let gotInstance = got.extend({
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

  const authenticate = async () => {
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

    console.error(
      'Action Required: Press the Action Button on the bottom of your Dirigera Hub'
    )

    const getAccessToken = async () => {
      // @ts-ignore
      const { access_token: newAccessToken }: { access_token: string } =
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
          .catch((err) => ({ access_token: undefined }))

      if (!newAccessToken) {
        // Wait a second before trying again.
        await new Promise((r) => setTimeout(() => r(true), 1000))
        return await getAccessToken()
      }

      return newAccessToken
    }

    const newAccessToken = await getAccessToken()

    if (accessTokenStore) {
      await accessTokenStore(newAccessToken)
    }
    accessToken = newAccessToken
    if (accessToken) {
      gotInstance = gotInstance.extend({
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
    }
    return newAccessToken
  }

  if (accessTokenStore && !accessToken) {
    await authenticate()
  }

  return {
    authenticate,
    async home() {
      return (await gotInstance.get(`home`).json()) as Home
    },
    hub: hub(gotInstance),
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
        // @ts-ignore
        accessToken,
        callback,
        ip,
      })
    },
  }
}
