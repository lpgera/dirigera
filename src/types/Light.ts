import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface LightAttributes {
  isOn: boolean
  startupOnOff: 'startOn' | 'startPrevious'
  lightLevel: number
  colorHue?: number
  colorSaturation?: number
  colorTemperature?: number
  colorTemperatureMin?: number
  colorTemperatureMax?: number
  startupTemperature?: number
  colorMode?: 'temperature' | 'color'
  identifyStarted: string
  identifyPeriod: number
  circadianRhythmMode?: string
}

export interface Light extends Device {
  type: 'light'
  deviceType: 'light'
  attributes: CommonDeviceAttributes &
    IdentifiableDeviceAttributes &
    JoinableDeviceAttributes &
    OtaUpdatableDeviceAttributes &
    LightAttributes
}
