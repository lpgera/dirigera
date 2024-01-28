import type { Got } from 'got' with { 'resolution-mode': 'require' }
import type { Hub } from '../types/device/Hub'

export default (got: Got) => {
  return {
    async status() {
      return await got.get(`hub/status`).json<Hub>()
    },

    async checkFirmwareUpdate() {
      await got.put(`hub/ota/check`).json()
    },

    async installFirmwareUpdate() {
      await got.put(`hub/ota/update`).json()
    },
  }
}
