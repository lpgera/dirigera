import type { Got } from 'got-cjs'
import type { Music } from '../types/Music'

export default (got: Got, accessToken?: string) => {
  if (!accessToken) {
    throw new Error('Access token is missing.')
  }
  return {
    async get() {
      return (await got.get(`music`).json()) as Music
    },
  }
}
