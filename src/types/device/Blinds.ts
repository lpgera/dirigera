import type {
  CommonDeviceAttributes,
  Device,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface BlindsAttributes
  extends CommonDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes {
  batteryPercentage: number
  blindsTargetLevel: number
  blindsCurrentLevel: number
  blindsState: 'stopped' | 'up' | 'down'
}

export interface Blinds extends Device {
  type: 'blinds'
  deviceType: 'blinds'
  attributes: BlindsAttributes
  isHidden: boolean
}
