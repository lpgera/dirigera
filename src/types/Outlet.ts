import type { Device } from './Device'

export interface Outlet extends Device {
  type: 'outlet'
  deviceType: 'outlet'
  attributes: Device['attributes'] & {
    isOn: boolean
    startupOnOff: 'startOn' | 'startPrevious'
    lightLevel: number
    identifyStarted: string
    identifyPeriod: number
  }
}
