import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { Device } from '../types/device/Device'
import type { Outlet } from '../types/device/Outlet'

export default (got: Got) => {
  return {
    async list() {
      const devices = await got.get(`devices`).json<Device[]>()
      return devices.filter((d): d is Outlet => d.type === 'outlet')
    },

    async get({ id }: { id: string }) {
      const device = await got.get(`devices/${id}`).json<Device>()
      if (device.type !== 'outlet') {
        throw new Error('The requested device is not an outlet')
      }
      return device as Outlet
    },

    async setIsOn({ id, isOn }: { id: string; isOn: boolean }) {
      await got
        .patch(`devices/${id}`, {
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

    async setStartupOnOff({
      id,
      startupOnOff,
    }: {
      id: string
      startupOnOff: Outlet['attributes']['startupOnOff']
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                startupOnOff,
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
      statusLight: Outlet['attributes']['statusLight']
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

    async setChildLock({
      id,
      childLock,
    }: {
      id: string
      childLock: Outlet['attributes']['childLock']
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
  }
}
