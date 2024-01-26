import type { CommonEventProperties } from './Event'
import type { Device } from '../device/Device'
import type { MotionSensorAttributes } from '../device/MotionSensor'

export type DeviceConfigurationChangedEvent = {
  type: 'deviceConfigurationChanged'
  data: Pick<
    Device,
    | 'id'
    | 'lastSeen'
    | 'createdAt'
    | 'isReachable'
    | 'remoteLinks'
    | 'deviceSet'
  > &
    Partial<
      Pick<
        Device,
        'attributes' | 'capabilities' | 'customIcon' | 'room' | 'isHidden'
      >
    > &
    Partial<Pick<MotionSensorAttributes, 'sensorConfig'>>
} & CommonEventProperties
