import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface LightAttributes
  extends
    CommonDeviceAttributes,
    IdentifiableDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes,
    IdentifiableDeviceAttributes {
  isOn: boolean
  startupOnOff: 'startOn' | 'startPrevious' | 'startToggle'
  lightLevel: number
  colorHue?: number
  colorSaturation?: number
  colorTemperature?: number
  colorTemperatureMin?: number
  colorTemperatureMax?: number
  startupTemperature?: number
  colorMode?: 'temperature' | 'color'
  deviceOnBehavior?: {
    behavior: 'lastValue' | 'adaptiveProfile'
    profileId: string
  }
}

export interface Light extends Device {
  type: 'light'
  deviceType: 'light'
  attributes: LightAttributes
  isHidden: boolean
  adaptiveProfile: {}
}
