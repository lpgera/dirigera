// @ts-expect-error https://github.com/microsoft/TypeScript/issues/49721
import type { Got } from 'got'
import type { Device } from '../types/Device'
import type { Home } from '../types/Home'

export default (got: Got) => {
  return {
    async list() {
      const home = await got.get(`home`).json<Home>()
      return home.deviceSets
    },

    // TODO add device-set management APIs
    //  * createDeviceSet
    //  * deleteDeviceSet
    //  * updateDeviceSet
    //  * updateDeviceSetConfig

    async setIsOn({ id, isOn }: { id: string; isOn: boolean }) {
      await got
        .patch(`devices/set/${id}`, {
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
      attributes,
      transitionTime,
    }: {
      id: string
      attributes: Partial<Device['attributes']>
      transitionTime?: number
    }) {
      await got
        .patch(`devices/set/${id}`, {
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
