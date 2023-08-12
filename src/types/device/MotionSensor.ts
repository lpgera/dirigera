import type {
  CommonDeviceAttributes,
  Device,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'
import type { Room } from '../Room'

export interface MotionSensorAttributes
  extends CommonDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes {
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
  attributes: MotionSensorAttributes
  room: Room
  isHidden: boolean
}
