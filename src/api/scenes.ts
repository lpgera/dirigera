// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Scene } from '../types/Scene'

export default (got: Got) => {
  return {
    async list() {
      return (await got.get(`scenes`).json()) as Scene[]
    },

    async get({ id }: { id: string }) {
      return (await got.get(`scenes/${id}`).json()) as Scene
    },

    async trigger({ id }: { id: string }) {
      await got.post(`scenes/${id}/trigger`).json()
    },

    async undo({ id }: { id: string }) {
      await got.post(`scenes/${id}/undo`).json()
    },

    // TODO create, delete, update
  }
}
