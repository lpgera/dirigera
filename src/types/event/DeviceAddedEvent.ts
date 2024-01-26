import type { CommonEventProperties } from './Event'
import type { Device } from '../device/Device'

export type DeviceAddedEvent = {
  type: 'deviceAdded'
  data: Device
} & CommonEventProperties
