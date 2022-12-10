import readline from 'readline/promises'
import os from 'os'
import got from 'got-cjs'
import {
  calculateCodeChallenge,
  CODE_CHALLENGE_METHOD,
  generateCodeVerifier,
} from './authCode'
import { discoverGatewayIP } from './mdnsDiscovery'

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
  })

  const assertAccessToken = () => {
    if (!accessToken) {
      throw new Error('Access token is missing.')
    }
  }

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
      assertAccessToken()
      return gotInstance.get(`home`).json()
    },
    // TODO low level API, shouldn't be exposed
    async setDeviceState(id: string, attributes: Record<string, any>) {
      assertAccessToken()
      return gotInstance.patch(`devices/${id}`, {
        json: [
          {
            attributes,
          },
        ],
      })
    },
  }
}
