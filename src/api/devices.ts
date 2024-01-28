import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { Device } from '../types/device/Device'

export default (got: Got) => {
  return {
    async list() {
      return await got.get(`devices`).json<Device[]>()
    },

    async get({ id }: { id: string }) {
      return await got.get(`devices/${id}`).json<Device>()
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
      attributes: Partial<Device['attributes']>
      transitionTime?: number
    }) {
      await got
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

    async startIdentifying({ id }: { id: string }) {
      await got
        .put(`devices/${id}/identify`, {
          json: {
            period: 30,
          },
        })
        .json()
    },

    async stopIdentifying({ id }: { id: string }) {
      await got
        .put(`devices/${id}/identify`, {
          json: {
            period: 0,
          },
        })
        .json()
    },
  }
}
