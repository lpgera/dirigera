import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface OutletAttributes {
  isOn: boolean
  startupOnOff: 'startOn' | 'startPrevious'
  lightLevel: number
}

export interface Outlet extends Device {
  type: 'outlet'
  deviceType: 'outlet'
  attributes: CommonDeviceAttributes &
    IdentifiableDeviceAttributes &
    JoinableDeviceAttributes &
    OtaUpdatableDeviceAttributes &
    OutletAttributes
}
