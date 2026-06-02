import type { CommonEventProperties } from './Event.ts'

export type DeviceDiscoveredEvent = {
  type: 'deviceDiscovered'
  data: {
    id: string
  }
} & CommonEventProperties
