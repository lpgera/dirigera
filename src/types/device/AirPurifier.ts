import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'
import type { Room } from '../Room'

export interface AirPurifierAttributes
  extends CommonDeviceAttributes,
    IdentifiableDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes {
  fanMode: 'auto' | 'manual' | 'off'
  fanModeSequence: 'lowMediumHighAuto'
  motorState: number
  motorRuntime: number
  filterElapsedTime: number
  filterAlarmStatus: boolean
  filterLifetime: number
  childLock: boolean
  statusLight: boolean
  currentPM25: number
}

export interface AirPurifier extends Device {
  type: 'airPurifier'
  deviceType: 'airPurifier'
  attributes: AirPurifierAttributes
  room: Room
  isHidden: boolean
}
