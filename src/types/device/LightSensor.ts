import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device.ts'

export interface LightSensorAttributes
  extends
    CommonDeviceAttributes,
    JoinableDeviceAttributes,
    Partial<IdentifiableDeviceAttributes>,
    Partial<OtaUpdatableDeviceAttributes> {
  illuminance: number
  maxIlluminance?: number
  minIlluminance?: number
  batteryPercentage?: number
}

export interface LightSensor extends Device {
  type: 'unknown'
  deviceType: 'lightSensor'
  attributes: LightSensorAttributes
  isHidden: boolean
}
