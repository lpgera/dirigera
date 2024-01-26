import type { CommonEventProperties } from './Event'

export type DeviceDiscoveredEvent = {
  type: 'deviceDiscovered'
  data: {
    id: string
  }
} & CommonEventProperties
