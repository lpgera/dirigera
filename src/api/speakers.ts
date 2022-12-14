import type { Got } from 'got-cjs'
import type { Speaker } from '../types/Speaker'

export default (got: Got, accessToken?: string) => {
  if (!accessToken) {
    throw new Error('Access token is missing.')
  }
  return {
    async list() {
      const devices = (await got.get(`devices`).json()) as any[]
      return devices.filter((d) => d.type === 'speaker') as Speaker[]
    },

    async get({ id }: { id: string }) {
      const device = (await got.get(`devices/${id}`).json()) as any
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
