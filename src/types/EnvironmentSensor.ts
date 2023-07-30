import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface EnvironmentSensorAttributes {
  currentTemperature: number
  currentRH: number
  currentPM25: number
  maxMeasuredPM25: number
  minMeasuredPM25: number
  vocIndex: number
}

export interface EnvironmentSensor extends Device {
  type: 'sensor'
  deviceType: 'environmentSensor'
  attributes: CommonDeviceAttributes &
    IdentifiableDeviceAttributes &
    JoinableDeviceAttributes &
    OtaUpdatableDeviceAttributes &
    EnvironmentSensorAttributes
}
