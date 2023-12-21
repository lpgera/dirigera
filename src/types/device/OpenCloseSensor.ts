import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
} from './Device'
import type { Room } from '../Room'

export interface OpenCloseSensorAttributes
  extends CommonDeviceAttributes,
    IdentifiableDeviceAttributes,
    JoinableDeviceAttributes {
  isOpen: boolean
  batteryPercentage: number
}

export interface OpenCloseSensor extends Device {
  type: 'sensor'
  deviceType: 'openCloseSensor'
  attributes: OpenCloseSensorAttributes
  room: Room
  isHidden: boolean
}
