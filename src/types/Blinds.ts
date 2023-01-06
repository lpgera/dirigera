import type { Device } from './Device'

export interface Blinds extends Device {
  type: 'blinds'
  deviceType: 'blinds'
  attributes: Device['attributes'] & {
    batteryPercentage: number
    blindsTargetLevel: number
    blindsCurrentLevel: number
    blindsState: 'stopped' | 'up' | 'down'
  }
}
