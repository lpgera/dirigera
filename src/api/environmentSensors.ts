// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Device } from '../types/device/Device'
import type { EnvironmentSensor } from '../types/device/EnvironmentSensor'

export default (got: Got) => {
  return {
    async list() {
      const devices = await got.get(`devices`).json<Device[]>()
      return devices.filter(
        (d): d is EnvironmentSensor => d.deviceType === 'environmentSensor'
      )
    },

    async get({ id }: { id: string }) {
      const device = await got.get(`devices/${id}`).json<Device>()
      if (device.deviceType !== 'environmentSensor') {
        throw new Error('The requested device is not an environmentSensor')
      }
      return device as EnvironmentSensor
    },
  }
}
