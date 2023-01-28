import type { Room } from './Room'
import type { Capabilities } from './Capabilities'
import type { DeviceSet } from './DeviceSet'

export interface Device {
  id: string
  type:
    | 'airPurifier'
    | 'blinds'
    | 'controller'
    | 'gateway'
    | 'light'
    | 'sensor'
    | 'outlet'
    | 'repeater'
    | 'speaker'
  deviceType:
    | 'airPurifier'
    | 'blinds'
    | 'shortcutController'
    | 'lightController'
    | 'soundController'
    | 'blindsController'
    | 'gateway'
    | 'light'
    | 'motionSensor'
    | 'outlet'
    | 'repeater'
    | 'speaker'
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
    permittingJoin: boolean
    otaStatus: 'upToDate' | 'updateAvailable'
    otaState:
      | 'batteryCheckFailed'
      | 'checkFailed'
      | 'checkInProgress'
      | 'downloadFailed'
      | 'downloadInProgress'
      | 'readyToCheck'
      | 'readyToDownload'
      | 'readyToUpdate'
      | 'updateComplete'
      | 'updateFailed'
      | 'updateInProgress'
    otaProgress: number
    otaPolicy: 'autoUpdate' | 'autoDownload'
    otaScheduleStart: string
    otaScheduleEnd: string
    [key: string]: any
  }
  room: Room
  capabilities: Capabilities
  deviceSet: DeviceSet[]
  remoteLinks: string[]
  isHidden: boolean
}
