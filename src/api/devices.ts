// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { AnyDevice } from '../types/AnyDevice'

export default (got: Got) => {
  return {
    async list() {
      return (await got.get(`devices`).json()) as AnyDevice[]
    },

    async get({ id }: { id: string }) {
      return (await got.get(`devices/${id}`).json()) as AnyDevice
    },

    async setCustomName({
      id,
      customName,
    }: {
      id: string
      customName: string
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                customName,
              },
            },
          ],
        })
        .json()
    },

    async setAttributes({
      id,
      attributes,
      transitionTime,
    }: {
      id: string
      attributes: Partial<AnyDevice['attributes']>
      transitionTime?: number
    }) {
      return got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes,
              transitionTime,
            },
          ],
        })
        .json()
    },
  }
}
