import type {
  CommonDeviceAttributes,
  Device,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'
import type { Room } from '../Room'

// TODO specific attributes for each controller type
export interface ControllerAttributes
  extends CommonDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes {
  batteryPercentage: number
  isOn: boolean
  lightLevel: number
  circadianPresets: any[]
}

export interface Controller extends Device {
  type: 'controller'
  deviceType:
    | 'shortcutController'
    | 'lightController'
    | 'soundController'
    | 'blindsController'
  attributes: ControllerAttributes
  room: Room
  isHidden: boolean
}
