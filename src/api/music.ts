import type { Got } from 'got-cjs'
import type { Music } from '../types/Music'

export default (got: Got) => {
  return {
    async get() {
      return (await got.get(`music`).json()) as Music
    },
  }
}
