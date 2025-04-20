import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { Device } from '../types/device/Device'
import type { WaterSensor } from '../types/device/WaterSensor'

export default (got: Got) => {
  return {
    async list() {
      const devices = await got.get(`devices`).json<Device[]>()
      return devices.filter(
        (d): d is WaterSensor => d.deviceType === 'waterSensor'
      )
    },

    async get({ id }: { id: string }) {
      const device = await got.get(`devices/${id}`).json<Device>()
      if (device.deviceType !== 'waterSensor') {
        throw new Error('The requested device is not a waterSensor')
      }
      return device as WaterSensor
    },
  }
}
