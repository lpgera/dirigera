import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface OutletAttributes
  extends CommonDeviceAttributes,
    IdentifiableDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes {
  isOn: boolean
  startupOnOff: 'startOn' | 'startPrevious'
  lightLevel: number
}

export interface Outlet extends Device {
  type: 'outlet'
  deviceType: 'outlet'
  attributes: OutletAttributes
  isHidden: boolean
}
