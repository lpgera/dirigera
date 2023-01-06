import type { Device } from './Device'

export interface Repeater extends Device {
  type: 'repeater'
  deviceType: 'repeater'
  attributes: Device['attributes'] & {
    identifyPeriod: number
    identifyStarted: string
  }
}
