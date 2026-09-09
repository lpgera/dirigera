import crypto from 'node:crypto'

export const CODE_CHALLENGE_METHOD = 'S256'

export const generateCodeVerifier = () => {
  return crypto.randomBytes(96).toString('base64url')
}

export const calculateCodeChallenge = (codeVerifier: string) => {
  return crypto.createHash('sha256').update(codeVerifier).digest('base64url')
}
