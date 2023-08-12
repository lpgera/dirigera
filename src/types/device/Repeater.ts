import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'
import type { Room } from '../Room'

export interface RepeaterAttributes
  extends CommonDeviceAttributes,
    IdentifiableDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes {}

export interface Repeater extends Device {
  type: 'repeater'
  deviceType: 'repeater'
  attributes: RepeaterAttributes
  room: Room
  isHidden: boolean
}
