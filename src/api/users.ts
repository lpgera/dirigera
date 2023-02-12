// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { User } from '../types/User'

export default (got: Got) => {
  return {
    async list() {
      return (await got.get(`users`).json()) as User[]
    },

    async getCurrentUser() {
      return (await got.get(`users/me`).json()) as User
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
