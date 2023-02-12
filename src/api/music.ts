// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Music } from '../types/Music'

export default (got: Got) => {
  return {
    async get() {
      return (await got.get(`music`).json()) as Music
    },
  }
}
