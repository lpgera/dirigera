import crypto from 'crypto'

const CODE_CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('')
const CODE_LENGTH = 128
export const CODE_CHALLENGE_METHOD = 'S256'

export const generateCodeVerifier = () => {
  return [...Array(CODE_LENGTH)]
    .map(
      () => CODE_CHARACTERS[Math.floor(Math.random() * CODE_CHARACTERS.length)]
    )
    .join('')
}

export const calculateCodeChallenge = (codeVerifier: string) => {
  return crypto.createHash('sha256').update(codeVerifier).digest('base64url')
}
