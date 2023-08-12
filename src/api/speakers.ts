// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Device } from '../types/device/Device'
import type { Speaker } from '../types/device/Speaker'

export default (got: Got) => {
  return {
    async list() {
      const devices = await got.get(`devices`).json<Device[]>()
      return devices.filter((d): d is Speaker => d.type === 'speaker')
    },

    async get({ id }: { id: string }) {
      const device = await got.get(`devices/${id}`).json<Device>()
      if (device.type !== 'speaker') {
        throw new Error('The requested device is not a speaker')
      }
      return device as Speaker
    },

    async setVolume({ id, volume }: { id: string; volume: number }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                volume,
              },
            },
          ],
        })
        .json()
    },

    async setPlayback({
      id,
      playback,
    }: {
      id: string
      playback: Speaker['attributes']['playback']
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                playback,
              },
            },
          ],
        })
        .json()
    },
  }
}
