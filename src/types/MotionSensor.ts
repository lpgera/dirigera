import type {
  CommonDeviceAttributes,
  Device,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface MotionSensorAttributes {
  batteryPercentage: number
  isOn: boolean
  sensorConfig: {
    scheduleOn: boolean
    onDuration: number
    schedule: {
      onCondition: {
        time: string
      }
      offCondition: {
        time: string
      }
    }
  }
}

export interface MotionSensor extends Device {
  type: 'sensor'
  deviceType: 'motionSensor'
  attributes: CommonDeviceAttributes &
    JoinableDeviceAttributes &
    OtaUpdatableDeviceAttributes &
    MotionSensorAttributes
}
