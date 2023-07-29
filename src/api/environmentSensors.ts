// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { EnvironmentSensor } from '../types/EnvironmentSensor'

export default (got: Got) => {
  return {
    async list() {
      const devices = (await got.get(`devices`).json()) as any[]
      return devices.filter(
        (d) => d.deviceType === 'environmentSensor',
      ) as EnvironmentSensor[]
    },

    async get({ id }: { id: string }) {
      const device = (await got.get(`devices/${id}`).json()) as any
      if (device.deviceType !== 'environmentSensor') {
        throw new Error('The requested device is not an environmentSensor')
      }
      return device as EnvironmentSensor
    },
  }
}
