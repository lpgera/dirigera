import type {
  CommonDeviceAttributes,
  Device,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

// TODO specific attributes for each controller type
export interface ControllerAttributes {
  batteryPercentage: number
  isOn: boolean
  lightLevel: number
}

export interface Controller extends Device {
  type: 'controller'
  deviceType:
    | 'shortcutController'
    | 'lightController'
    | 'soundController'
    | 'blindsController'
  attributes: CommonDeviceAttributes &
    JoinableDeviceAttributes &
    OtaUpdatableDeviceAttributes &
    ControllerAttributes
}
