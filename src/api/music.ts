import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { Music } from '../types/Music'

export default (got: Got) => {
  return {
    async get() {
      return await got.get(`music`).json<Music>()
    },
  }
}
