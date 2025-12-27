import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { Device } from '../types/device/Device'
import type { OccupancySensor } from '../types/device/OccupancySensor'

export default (got: Got) => {
  return {
    async list() {
      const devices = await got.get(`devices`).json<Device[]>()
      return devices.filter(
        (d): d is OccupancySensor => d.deviceType === 'occupancySensor'
      )
    },

    async get({ id }: { id: string }) {
      const device = await got.get(`devices/${id}`).json<Device>()
      if (device.deviceType !== 'occupancySensor') {
        throw new Error('The requested device is not a motionSensor')
      }
      return device as OccupancySensor
    },

    async setOnDuration({
      id,
      onDuration,
    }: {
      id: string
      onDuration: OccupancySensor['attributes']['sensorConfig']['onDuration']
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                sensorConfig: {
                  onDuration,
                },
              },
            },
          ],
        })
        .json()
    },

    async setScheduleOn({
      id,
      scheduleOn,
    }: {
      id: string
      scheduleOn: OccupancySensor['attributes']['sensorConfig']['scheduleOn']
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                sensorConfig: {
                  scheduleOn,
                },
              },
            },
          ],
        })
        .json()
    },

    async setSchedule({
      id,
      schedule,
    }: {
      id: string
      schedule: OccupancySensor['attributes']['sensorConfig']['schedule']
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                sensorConfig: {
                  schedule,
                },
              },
            },
          ],
        })
        .json()
    },
  }
}
