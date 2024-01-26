import type { CommonEventProperties } from './Event'
import type { DeviceSet } from '../DeviceSet'

export type DeviceSetUpdatedEvent = {
  type: 'deviceSetUpdated'
  data: DeviceSet
} & CommonEventProperties
