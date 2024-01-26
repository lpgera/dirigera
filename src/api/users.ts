import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { User } from '../types/User'

export default (got: Got) => {
  return {
    async list() {
      return await got.get(`users`).json<User[]>()
    },

    async getCurrentUser() {
      return await got.get(`users/me`).json<User>()
    },

    async setCurrentUserName({ name }: { name: string }) {
      await got.patch(`users/me`, {
        json: {
          name,
        },
      })
    },

    async delete({ id }: { id: string }) {
      await got.delete(`users/${id}`)
    },
  }
}
