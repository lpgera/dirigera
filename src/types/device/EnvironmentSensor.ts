import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface EnvironmentSensorAttributes
  extends
    CommonDeviceAttributes,
    IdentifiableDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes {
  currentTemperature?: number
  currentRH?: number
  currentPM25?: number
  maxMeasuredPM25?: number
  minMeasuredPM25?: number
  vocIndex?: number
  isOn?: boolean
  currentCO2?: number
  maxMeasuredCO2?: number
  minMeasuredCO2?: number
  discriminator?: number
  qrCode?: string
  setupCode?: string
  windowOpen?: boolean
  batteryPercentage?: number
}

export interface EnvironmentSensor extends Device {
  type: 'sensor'
  deviceType: 'environmentSensor'
  attributes: EnvironmentSensorAttributes
  isHidden: boolean
}
