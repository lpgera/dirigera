import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { Room } from '../types/Room'
import type { Device } from '../types/device/Device'

export default (got: Got) => {
  return {
    async list() {
      return await got.get(`rooms`).json<Room[]>()
    },

    async get({ id }: { id: string }) {
      return await got.get(`rooms/${id}`).json<Room>()
    },

    async createRoom({
      name,
      icon,
      color,
    }: Pick<Room, 'name' | 'icon' | 'color'>) {
      return await got
        .post(`rooms`, {
          json: {
            name,
            icon,
            color,
          },
        })
        .json<Room>()
    },

    async deleteRoom({ id }: { id: string }) {
      await got.delete(`rooms/${id}`)
    },

    async updateRoom({ id, name, icon, color }: Room) {
      await got
        .put(`rooms/${id}`, {
          json: {
            name,
            icon,
            color,
          },
        })
        .json<Room>()
    },

    async moveRoomDevices({
      id,
      deviceIds,
    }: {
      id: string
      deviceIds: string[]
    }) {
      await got
        .patch(`rooms/${id}/devices`, {
          json: {
            deviceIds,
          },
        })
        .json()
    },

    async setIsOn({
      id,
      deviceType,
      isOn,
    }: {
      id: string
      deviceType: Device['deviceType']
      isOn: boolean
    }) {
      await got
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

    async setAttributes({
      id,
      deviceType,
      attributes,
      transitionTime,
    }: {
      id: string
      deviceType?: Device['deviceType']
      attributes: Partial<Device['attributes']>
      transitionTime?: number
    }) {
      await got
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
