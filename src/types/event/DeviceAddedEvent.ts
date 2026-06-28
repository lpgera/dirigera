import type { CommonEventProperties } from './Event.ts'
import type { Device } from '../device/Device.ts'

export type DeviceAddedEvent = {
  type: 'deviceAdded'
  data: Device
} & CommonEventProperties
