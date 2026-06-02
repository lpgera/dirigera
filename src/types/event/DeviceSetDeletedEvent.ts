import type { CommonEventProperties } from './Event.ts'

export type DeviceSetDeletedEvent = {
  type: 'deviceSetDeleted'
  data: {
    id: string
  }
} & CommonEventProperties
