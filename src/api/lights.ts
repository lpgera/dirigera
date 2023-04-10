// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Light } from '../types/Light'

export default (got: Got) => {
  return {
    async list() {
      const devices = (await got.get(`devices`).json()) as any[]
      return devices.filter((d) => d.type === 'light') as Light[]
    },

    async get({ id }: { id: string }) {
      const device = (await got.get(`devices/${id}`).json()) as any
      if (device.type !== 'light') {
        throw new Error('The requested device is not a light')
      }
      return device as Light
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

    async setLightLevel({
      id,
      lightLevel,
      transitionTime,
    }: {
      id: string
      lightLevel: number
      transitionTime?: number
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                lightLevel,
              },
              transitionTime,
            },
          ],
        })
        .json()
    },

    async setLightTemperature({
      id,
      colorTemperature,
      transitionTime,
    }: {
      id: string
      colorTemperature: number
      transitionTime?: number
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                colorTemperature,
              },
              transitionTime,
            },
          ],
        })
        .json()
    },

    async setLightColor({
      id,
      colorHue,
      colorSaturation,
      transitionTime,
    }: {
      id: string
      colorHue: number
      colorSaturation: number
      transitionTime?: number
    }) {
      await got
        .patch(`devices/${id}`, {
          json: [
            {
              attributes: {
                colorHue,
                colorSaturation,
              },
              transitionTime,
            },
          ],
        })
        .json()
    },
  }
}
