import type { Got } from 'got-cjs'
import type { Hub } from '../types/Hub'

export default (got: Got) => {
  return {
    async status() {
      return (await got.get(`hub/status`).json()) as Hub
    },

    async checkFirmwareUpdate() {
      await got.put(`hub/ota/check`).json()
    },

    async installFirmwareUpdate() {
      await got.put(`hub/ota/update`).json()
    },

    // TODO setFirmwareEnvironment, setPersistentMode
  }
}
