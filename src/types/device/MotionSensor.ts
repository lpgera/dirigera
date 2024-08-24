import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface MotionSensorAttributes
  extends CommonDeviceAttributes,
    JoinableDeviceAttributes,
    Partial<OtaUpdatableDeviceAttributes>,
    Partial<IdentifiableDeviceAttributes> {
  batteryPercentage: number
  isOn: boolean
  isDetected?: boolean
  motionDetectedDelay?: number
  sensorConfig: {
    scheduleOn: boolean
    onDuration: number
    schedule?: {
      onCondition: {
        time: string
        offset?: number
      }
      offCondition: {
        time: string
        offset?: number
      }
    }
  }
  circadianPresets?: any[]
}

export interface MotionSensor extends Device {
  type: 'sensor'
  deviceType: 'motionSensor'
  attributes: MotionSensorAttributes
  isHidden: boolean
}
