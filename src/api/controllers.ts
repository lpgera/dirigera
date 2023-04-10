// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Controller } from '../types/Controller'

export default (got: Got) => {
  return {
    async list() {
      const devices = (await got.get(`devices`).json()) as any[]
      return devices.filter((d) => d.type === 'controller') as Controller[]
    },

    async get({ id }: { id: string }) {
      const device = (await got.get(`devices/${id}`).json()) as any
      if (device.type !== 'controller') {
        throw new Error('The requested device is not a controller')
      }
      return device as Controller
    },
  }
}
