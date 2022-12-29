import type { Device } from './Device'

export interface Light extends Device {
  type: 'light'
  deviceType: 'light'
  attributes: Device['attributes'] & {
    isOn: boolean
    startupOnOff: 'startOn' | 'startPrevious'
    lightLevel: number
    colorHue?: number
    colorSaturation?: number
    colorTemperature?: number
    colorTemperatureMin?: number
    colorTemperatureMax?: number
    colorMode?: 'temperature' | 'color'
    identifyStarted: string
    identifyPeriod: number
  }
}
