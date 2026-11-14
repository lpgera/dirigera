import type { Got } from 'got'
import type { Device } from '../types/device/Device.ts'
import type { ElectricalSensor } from '../types/device/ElectricalSensor.ts'

export default (got: Got) => {
  return {
    async list() {
      const devices = await got.get(`devices`).json<Device[]>()
      return devices.filter(
        (d): d is ElectricalSensor => d.deviceType === 'electricalSensor'
      )
    },

    async get({ id }: { id: string }) {
      const device = await got.get(`devices/${id}`).json<Device>()
      if (device.deviceType !== 'electricalSensor') {
        throw new Error('The requested device is not an electricalSensor')
      }
      return device as ElectricalSensor
    },

    async resetEnergyConsumption({ id }: { id: string }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                energyConsumedAtLastReset: 0,
              },
            },
          ],
        })
        .json()
    },
  }
}
