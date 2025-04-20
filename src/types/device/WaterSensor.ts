import {
  CommonDeviceAttributes,
  Device,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface WaterSensorAttributes
  extends CommonDeviceAttributes,
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
