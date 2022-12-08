import crypto from 'crypto'
import readline from 'readline/promises'
import os from 'os'
import got from 'got-cjs'

export default class Dirigera {
  private readonly gatewayIP: string
  private readonly accessToken: string | undefined

  constructor({
    gatewayIP,
    accessToken,
  }: {
    gatewayIP: string
    accessToken?: string
  }) {
    this.gatewayIP = gatewayIP
    this.accessToken = accessToken
  }

  private generateCodeVerifier(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('')
    const length = 128

    return [...Array(length)]
      .map(() => characters[Math.floor(Math.random() * characters.length)])
      .join('')
  }

  private calculateCodeChallenge(codeVerifier: string): string {
    return crypto.createHash('sha256').update(codeVerifier).digest('base64url')
  }

  async authenticate() {
    const codeVerifier = this.generateCodeVerifier()
    const codeChallenge = this.calculateCodeChallenge(codeVerifier)

    const { code }: { code: string } = await got(
      `https://${this.gatewayIP}:8443/v1/oauth/authorize`,
      {
        searchParams: {
          audience: 'homesmart.local',
          response_type: 'code',
          code_challenge: codeChallenge,
          code_challenge_method: 'S256',
        },
        https: {
          rejectUnauthorized: false,
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

    const { access_token: accessToken }: { access_token: string } = await got(
      `https://${this.gatewayIP}:8443/v1/oauth/token`,
      {
        method: 'POST',
        form: {
          code,
          name: os.hostname(),
          grant_type: 'authorization_code',
          code_verifier: codeVerifier,
        },
        https: {
          rejectUnauthorized: false,
        },
      }
    ).json()

    console.log(`Your access token: ${accessToken}`)
  }

  // TODO return type missing
  async home() {
    return got(`https://${this.gatewayIP}:8443/v1/home`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
      https: {
        rejectUnauthorized: false,
      },
    }).json()
  }
}
