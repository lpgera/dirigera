import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
} from './Device.ts'

export interface OpenCloseSensorAttributes
  extends
    CommonDeviceAttributes,
    IdentifiableDeviceAttributes,
    JoinableDeviceAttributes {
  isOpen: boolean
  batteryPercentage: number
}

export interface OpenCloseSensor extends Device {
  type: 'sensor'
  deviceType: 'openCloseSensor'
  attributes: OpenCloseSensorAttributes
  isHidden: boolean
}
