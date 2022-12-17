import type { Room } from './Room'
import type { Capabilities } from './Capabilities'
import type { DeviceSet } from './DeviceSet'

export interface Outlet {
  id: string
  type: 'outlet'
  deviceType: 'outlet'
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
    startupOnOff: 'startOn' | 'startPrevious'
    lightLevel: number
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
