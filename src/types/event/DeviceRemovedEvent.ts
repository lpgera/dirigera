import type { CommonEventProperties } from './Event'

export type DeviceRemovedEvent = {
  type: 'deviceRemoved'
  removedDeviceId: {
    id: string
    type: string
  }
} & CommonEventProperties
