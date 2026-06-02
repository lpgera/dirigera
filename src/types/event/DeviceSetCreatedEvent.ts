import type { CommonEventProperties } from './Event.ts'
import type { DeviceSet } from '../DeviceSet.ts'

export type DeviceSetCreatedEvent = {
  type: 'deviceSetCreated'
  data: DeviceSet
} & CommonEventProperties
