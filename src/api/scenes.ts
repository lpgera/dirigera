import type { Got } from 'got-cjs'
import type { Scene } from '../types/Scene'

export default (got: Got, accessToken?: string) => {
  if (!accessToken) {
    throw new Error('Access token is missing.')
  }
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
