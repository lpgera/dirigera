import type { CommonEventProperties } from './Event'
import type { DeviceSet } from '../DeviceSet'

export type DeviceSetCreatedEvent = {
  type: 'deviceSetCreated'
  data: DeviceSet
} & CommonEventProperties
