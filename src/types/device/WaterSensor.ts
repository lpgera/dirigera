import {
  type CommonDeviceAttributes,
  type Device,
  type JoinableDeviceAttributes,
  type OtaUpdatableDeviceAttributes,
} from './Device.ts'

export interface WaterSensorAttributes
  extends
    CommonDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes {
  batteryPercentage: number
  waterLeakDetected: boolean
}

export interface WaterSensor extends Device {
  type: 'sensor'
  deviceType: 'waterSensor'
  attributes: WaterSensorAttributes
  isHidden: boolean
}
