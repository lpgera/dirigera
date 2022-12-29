import type { Device } from './Device'

export interface Controller extends Device {
  type: 'controller'
  deviceType:
    | 'shortcutController'
    | 'lightController'
    | 'soundController'
    | 'blindsController'
  attributes: Device['attributes'] & {
    batteryPercentage: number
    isOn: boolean
    lightLevel: number
  }
}
