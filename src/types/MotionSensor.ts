import type { Device } from './Device'

export interface MotionSensor extends Device {
  type: 'sensor'
  deviceType: 'motionSensor'
  attributes: Device['attributes'] & {
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
}
