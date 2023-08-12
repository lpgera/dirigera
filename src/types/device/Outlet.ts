import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'
import type { Room } from '../Room'

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
  room: Room
  isHidden: boolean
}
