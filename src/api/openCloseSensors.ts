// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Device } from '../types/device/Device'
import type { OpenCloseSensor } from '../types/device/OpenCloseSensor'

export default (got: Got) => {
  return {
    async list() {
      const devices = await got.get(`devices`).json<Device[]>()
      return devices.filter(
        (d): d is OpenCloseSensor => d.deviceType === 'openCloseSensor'
      )
    },

    async get({ id }: { id: string }) {
      const device = await got.get(`devices/${id}`).json<Device>()
      if (device.deviceType !== 'openCloseSensor') {
        throw new Error('The requested device is not an openCloseSensor')
      }
      return device as OpenCloseSensor
    },
  }
}
