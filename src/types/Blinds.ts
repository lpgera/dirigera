import type {
  CommonDeviceAttributes,
  Device,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface BlindsAttributes {
  batteryPercentage: number
  blindsTargetLevel: number
  blindsCurrentLevel: number
  blindsState: 'stopped' | 'up' | 'down'
}

export interface Blinds extends Device {
  type: 'blinds'
  deviceType: 'blinds'
  attributes: CommonDeviceAttributes &
    JoinableDeviceAttributes &
    OtaUpdatableDeviceAttributes &
    BlindsAttributes
}
