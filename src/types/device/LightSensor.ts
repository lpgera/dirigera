import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
} from './Device'

export interface LightSensorAttributes
  extends CommonDeviceAttributes,
    JoinableDeviceAttributes,
    Partial<IdentifiableDeviceAttributes> {
  illuminance: number
}

export interface LightSensor extends Device {
  type: 'unknown'
  deviceType: 'lightSensor'
  attributes: LightSensorAttributes
  isHidden: boolean
}
