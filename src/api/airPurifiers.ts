// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { AirPurifier } from '../types/AirPurifier'

export default (got: Got) => {
  return {
    async list() {
      const devices = (await got.get(`devices`).json()) as any[]
      return devices.filter((d) => d.type === 'airPurifier') as AirPurifier[]
    },

    async get({ id }: { id: string }) {
      const device = (await got.get(`devices/${id}`).json()) as any
      if (device.type !== 'airPurifier') {
        throw new Error('The requested device is not an airPurifier')
      }
      return device as AirPurifier
    },

    async setFanMode({
      id,
      fanMode,
    }: {
      id: string
      fanMode: AirPurifier['attributes']['fanMode']
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                fanMode,
              },
            },
          ],
        })
        .json()
    },

    async setMotorState({
      id,
      motorState,
    }: {
      id: string
      motorState: AirPurifier['attributes']['motorState']
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                motorState,
              },
            },
          ],
        })
        .json()
    },

    async setChildLock({
      id,
      childLock,
    }: {
      id: string
      childLock: AirPurifier['attributes']['childLock']
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                childLock,
              },
            },
          ],
        })
        .json()
    },

    async setStatusLight({
      id,
      statusLight,
    }: {
      id: string
      statusLight: AirPurifier['attributes']['statusLight']
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                statusLight,
              },
            },
          ],
        })
        .json()
    },
  }
}
