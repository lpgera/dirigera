import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { Scene } from '../types/Scene'

export default (got: Got) => {
  return {
    async list() {
      return await got.get(`scenes`).json<Scene[]>()
    },

    async get({ id }: { id: string }) {
      return await got.get(`scenes/${id}`).json<Scene>()
    },

    async trigger({ id }: { id: string }) {
      await got.post(`scenes/${id}/trigger`).json()
    },

    async undo({ id }: { id: string }) {
      await got.post(`scenes/${id}/undo`).json()
    },

    async create({
      info,
      type,
      actions,
      triggers,
    }: Pick<Scene, 'info' | 'type' | 'actions' | 'triggers'>) {
      return await got
        .post(`scenes`, {
          json: {
            info,
            type,
            actions,
            triggers,
          },
        })
        .json<{ id: string }>()
    },

    async delete({ id }: { id: string }) {
      await got.delete(`scenes/${id}`)
    },

    async update({
      id,
      info,
      type,
      actions,
      triggers,
    }: Pick<Scene, 'id' | 'info' | 'type' | 'actions' | 'triggers'>) {
      await got
        .put(`scenes/${id}`, {
          json: {
            info,
            type,
            actions,
            triggers,
          },
        })
        .json()
    },
  }
}
