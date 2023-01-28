import type { Got } from 'got-cjs'
import type { Room } from '../types/Room'
import type { Device } from '../types/Device'

export default (got: Got, accessToken?: string) => {
  if (!accessToken) {
    throw new Error('Access token is missing.')
  }
  return {
    async list() {
      return (await got.get(`rooms`).json()) as Room[]
    },

    async get({ id }: { id: string }) {
      return (await got.get(`rooms/${id}`).json()) as Room
    },

    // TODO add room management API
    // TODO cover device-type specific attribute changes

    async setIsOn({
      id,
      deviceType,
      isOn,
    }: {
      id: string
      deviceType: Device['deviceType']
      isOn: boolean
    }) {
      return got
        .patch(`devices/set/${id}`, {
          searchParams: {
            deviceType,
          },
          json: [
            {
              attributes: {
                isOn,
              },
            },
          ],
        })
        .json()
    },

    // TODO low level API, shouldn't be exposed
    async setRoomState({
      id,
      deviceType,
      attributes,
      transitionTime,
    }: {
      id: string
      deviceType?: Device['deviceType']
      attributes: Record<string, any>
      transitionTime?: number
    }) {
      return got
        .patch(`devices/room/${id}`, {
          searchParams: {
            deviceType,
          },
          json: [
            {
              attributes,
              transitionTime,
            },
          ],
        })
        .json()
    },
  }
}
