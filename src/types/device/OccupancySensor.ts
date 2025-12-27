import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface OccupancySensorAttributes
  extends
    CommonDeviceAttributes,
    JoinableDeviceAttributes,
    Partial<OtaUpdatableDeviceAttributes>,
    Partial<IdentifiableDeviceAttributes> {
  batteryPercentage: number
  isDetected: boolean
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

export interface OccupancySensor extends Device {
  type: 'sensor'
  deviceType: 'occupancySensor'
  attributes: OccupancySensorAttributes
  isHidden: boolean
}
