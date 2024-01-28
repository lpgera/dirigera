import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { Device } from '../types/device/Device'
import type { Home } from '../types/Home'
import type { DeviceSet } from '../types/DeviceSet'

export default (got: Got) => {
  return {
    async list() {
      const home = await got.get(`home`).json<Home>()
      return home.deviceSets
    },

    async createDeviceSet({ name, icon }: Pick<DeviceSet, 'name' | 'icon'>) {
      return await got
        .post(`device-set`, {
          json: {
            name,
            icon,
          },
        })
        .json<{ id: string }>()
    },

    async deleteDeviceSet({ id }: { id: string }) {
      await got.delete(`device-set/${id}`)
    },

    async updateDeviceSet({ id, name, icon }: DeviceSet) {
      await got
        .put(`device-set/${id}`, {
          json: {
            name,
            icon,
          },
        })
        .json()
    },

    async updateDeviceSetConfig({
      id,
      deviceIds,
      roomId,
      remoteLinkIds,
    }: {
      id: string
      deviceIds: string[]
      roomId?: string
      remoteLinkIds?: string[]
    }) {
      await got
        .patch(`device-set/${id}/config`, {
          json: {
            deviceIds,
            roomId,
            remoteLinkIds,
          },
        })
        .json()
    },

    async setIsOn({ id, isOn }: { id: string; isOn: boolean }) {
      await got
        .patch(`devices/set/${id}`, {
          json: [
            {
              attributes: {
                isOn,
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
        .patch(`devices/set/${id}`, {
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
