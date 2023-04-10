// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Blinds } from '../types/Blinds'

export default (got: Got) => {
  return {
    async list() {
      const devices = (await got.get(`devices`).json()) as any[]
      return devices.filter((d) => d.type === 'blinds') as Blinds[]
    },

    async get({ id }: { id: string }) {
      const device = (await got.get(`devices/${id}`).json()) as any
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
