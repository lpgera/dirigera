// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { MotionSensor } from '../types/MotionSensor'

export default (got: Got) => {
  return {
    async list() {
      const devices = (await got.get(`devices`).json()) as any[]
      return devices.filter(
        (d) => d.deviceType === 'motionSensor'
      ) as MotionSensor[]
    },

    async get({ id }: { id: string }) {
      const device = (await got.get(`devices/${id}`).json()) as any
      if (device.deviceType !== 'motionSensor') {
        throw new Error('The requested device is not a motionSensor')
      }
      return device as MotionSensor
    },

    async setOnDuration({
      id,
      onDuration,
    }: {
      id: string
      onDuration: MotionSensor['attributes']['sensorConfig']['onDuration']
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
      scheduleOn: MotionSensor['attributes']['sensorConfig']['scheduleOn']
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
      schedule: MotionSensor['attributes']['sensorConfig']['schedule']
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
