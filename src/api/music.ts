import type { Got } from 'got'
import type { Music } from '../types/Music.ts'

export default (got: Got) => {
  return {
    async get() {
      return await got.get(`music`).json<Music>()
    },
  }
}
