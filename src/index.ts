import readline from 'readline/promises'
import os from 'os'
import got, { Got } from 'got-cjs'
import {
  calculateCodeChallenge,
  CODE_CHALLENGE_METHOD,
  generateCodeVerifier,
} from './authCode'

export default class Dirigera {
  private readonly gotInstance: Got

  constructor({
    gatewayIP,
    accessToken,
  }: {
    gatewayIP: string
    accessToken?: string
  }) {
    this.gotInstance = got.extend({
      prefixUrl: `https://${gatewayIP}:8443/v1`,
      headers: {
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : null),
      },
      https: {
        rejectUnauthorized: false,
      },
    })
  }

  async authenticate() {
    const codeVerifier = generateCodeVerifier()
    const codeChallenge = calculateCodeChallenge(codeVerifier)

    const { code }: { code: string } = await this.gotInstance(
      `oauth/authorize`,
      {
        searchParams: {
          audience: 'homesmart.local',
          response_type: 'code',
          code_challenge: codeChallenge,
          code_challenge_method: CODE_CHALLENGE_METHOD,
        },
      }
    ).json()

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    await rl.question(
      'Press the Action Button on the bottom of your Dirigera Hub and then press the Enter button here'
    )

    rl.close()

    const { access_token: accessToken }: { access_token: string } =
      await this.gotInstance(`oauth/token`, {
        method: 'POST',
        form: {
          code,
          name: os.hostname(),
          grant_type: 'authorization_code',
          code_verifier: codeVerifier,
        },
      }).json()

    return accessToken
  }

  // TODO return type missing
  async home() {
    return this.gotInstance(`home`, {
      method: 'GET',
    }).json()
  }
}
