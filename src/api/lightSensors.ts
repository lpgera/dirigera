import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { Device } from '../types/device/Device'
import type { LightSensor } from '../types/device/LightSensor'

export default (got: Got) => {
  return {
    async list() {
      const devices = await got.get(`devices`).json<Device[]>()
      return devices.filter(
        (d): d is LightSensor => d.deviceType === 'lightSensor'
      )
    },

    async get({ id }: { id: string }) {
      const device = await got.get(`devices/${id}`).json<Device>()
      if (device.deviceType !== 'lightSensor') {
        throw new Error('The requested device is not a lightSensor')
      }
      return device as LightSensor
    },
  }
}
