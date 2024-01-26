import type { CommonEventProperties } from './Event'

export type DeviceSetDeletedEvent = {
  type: 'deviceSetDeleted'
  data: {
    id: string
  }
} & CommonEventProperties
