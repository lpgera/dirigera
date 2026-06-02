import type { CommonEventProperties } from './Event.ts'
import type { DeviceSet } from '../DeviceSet.ts'

export type DeviceSetUpdatedEvent = {
  type: 'deviceSetUpdated'
  data: DeviceSet
} & CommonEventProperties
