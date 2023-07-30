// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Device } from '../types/Device'
import type { Repeater } from '../types/Repeater'

export default (got: Got) => {
  return {
    async list() {
      const devices = await got.get(`devices`).json<Device[]>()
      return devices.filter((d): d is Repeater => d.type === 'repeater')
    },

    async get({ id }: { id: string }) {
      const device = await got.get(`devices/${id}`).json<Device>()
      if (device.type !== 'repeater') {
        throw new Error('The requested device is not a repeater')
      }
      return device as Repeater
    },
  }
}
