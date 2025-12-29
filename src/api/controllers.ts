import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { Device } from '../types/device/Device'
import type { Controller, GenericSwitch } from '../types/device/Controller'

export default (got: Got) => {
  return {
    async list() {
      const devices = await got.get(`devices`).json<Device[]>()
      return devices.filter((d): d is Controller => d.type === 'controller')
    },

    async get({ id }: { id: string }) {
      const device = await got.get(`devices/${id}`).json<Device>()
      if (device.type !== 'controller') {
        throw new Error('The requested device is not a controller')
      }
      return device as Controller
    },

    async setControlMode({
      id,
      controlMode,
    }: {
      id: string
      controlMode: GenericSwitch['attributes']['controlMode']
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                controlMode,
              },
            },
          ],
        })
        .json()
    },
  }
}
