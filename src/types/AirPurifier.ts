import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface AirPurifierAttributes {
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
  attributes: CommonDeviceAttributes &
    IdentifiableDeviceAttributes &
    JoinableDeviceAttributes &
    OtaUpdatableDeviceAttributes &
    AirPurifierAttributes
}
