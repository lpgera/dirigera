// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Device } from '../types/Device'

export default (got: Got) => {
  return {
    async list() {
      return (await got.get(`devices`).json()) as Device[]
    },

    async get({ id }: { id: string }) {
      return (await got.get(`devices/${id}`).json()) as Device
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
      attributes: Record<string, any>
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
