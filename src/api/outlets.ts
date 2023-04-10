// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Outlet } from '../types/Outlet'

export default (got: Got) => {
  return {
    async list() {
      const devices = (await got.get(`devices`).json()) as any[]
      return devices.filter((d) => d.type === 'outlet') as Outlet[]
    },

    async get({ id }: { id: string }) {
      const device = (await got.get(`devices/${id}`).json()) as any
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
  }
}
