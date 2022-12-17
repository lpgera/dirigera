import type { Room } from './Room'
import type { Capabilities } from './Capabilities'
import type { DeviceSet } from './DeviceSet'

export interface Light {
  id: string
  type: 'light'
  deviceType: 'light'
  createdAt: string
  isReachable: boolean
  lastSeen: string
  attributes: {
    customName: string
    model: string
    manufacturer: string
    firmwareVersion: string
    hardwareVersion: string
    serialNumber: string
    productCode: string
    isOn: boolean
    startupOnOff: 'startOn' | string // TODO extend type union
    lightLevel: number
    colorHue?: number
    colorSaturation?: number
    colorTemperature?: number
    colorTemperatureMin?: number
    colorTemperatureMax?: number
    colorMode?: 'temperature' | 'color'
    identifyStarted: string
    identifyPeriod: number
    permittingJoin: boolean
    otaStatus: 'upToDate' | string // TODO extend type union
    otaState: 'readyToCheck' | string // TODO extend type union
    otaProgress: number
    otaPolicy: 'autoUpdate' | string // TODO extend type union
    otaScheduleStart: string
    otaScheduleEnd: string
  }
  room: Room
  capabilities: Capabilities
  deviceSet: DeviceSet
  remoteLinks: string[]
  isHidden: boolean
}
