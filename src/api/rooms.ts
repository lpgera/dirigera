// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Room } from '../types/Room'
import type { Device } from '../types/Device'

export default (got: Got) => {
  return {
    async list() {
      return (await got.get(`rooms`).json()) as Room[]
    },

    async get({ id }: { id: string }) {
      return (await got.get(`rooms/${id}`).json()) as Room
    },

    // TODO add room management API
    //  * createRoom
    //  * deleteRoom
    //  * moveRoomDevices
    //  * updateRoom
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
    async setAttributes({
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
