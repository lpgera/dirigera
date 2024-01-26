import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { Device } from '../types/device/Device'
import type { AirPurifier } from '../types/device/AirPurifier'

export default (got: Got) => {
  return {
    async list() {
      const devices = await got.get(`devices`).json<Device[]>()
      return devices.filter((d): d is AirPurifier => d.type === 'airPurifier')
    },

    async get({ id }: { id: string }) {
      const device = await got.get(`devices/${id}`).json<Device>()
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
