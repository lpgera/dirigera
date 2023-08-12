// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Device } from '../types/device/Device'
import type { Blinds } from '../types/device/Blinds'

export default (got: Got) => {
  return {
    async list() {
      const devices = await got.get(`devices`).json<Device[]>()
      return devices.filter((d): d is Blinds => d.type === 'blinds')
    },

    async get({ id }: { id: string }) {
      const device = await got.get(`devices/${id}`).json<Device>()
      if (device.type !== 'blinds') {
        throw new Error('The requested device is not a blinds')
      }
      return device as Blinds
    },

    async setCurrentLevel({
      id,
      blindsCurrentLevel,
    }: {
      id: string
      blindsCurrentLevel: number
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                blindsCurrentLevel,
              },
            },
          ],
        })
        .json()
    },

    async setTargetLevel({
      id,
      blindsTargetLevel,
    }: {
      id: string
      blindsTargetLevel: number
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                blindsTargetLevel,
              },
            },
          ],
        })
        .json()
    },

    async setState({
      id,
      blindsState,
    }: {
      id: string
      blindsState: Blinds['attributes']['blindsState']
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                blindsState,
              },
            },
          ],
        })
        .json()
    },
  }
}
