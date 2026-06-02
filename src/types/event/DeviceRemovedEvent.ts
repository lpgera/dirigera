import type { CommonEventProperties } from './Event.ts'

export type DeviceRemovedEvent = {
  type: 'deviceRemoved'
  removedDeviceId: {
    id: string
    type: string
  }
} & CommonEventProperties
