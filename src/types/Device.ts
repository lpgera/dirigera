import type { Capabilities } from './Capabilities'
import type { Room } from './Room'
import type { DeviceSet } from './DeviceSet'
import type { AirPurifierAttributes } from './AirPurifier'
import type { BlindsAttributes } from './Blinds'
import type { ControllerAttributes } from './Controller'
import type { EnvironmentSensorAttributes } from './EnvironmentSensor'
import type { HubAttributes } from './Hub'
import type { LightAttributes } from './Light'
import type { MotionSensorAttributes } from './MotionSensor'
import type { SpeakerAttributes } from './Speaker'
import type { OutletAttributes } from './Outlet'

export interface CommonDeviceAttributes {
  customName: string
  firmwareVersion: string
  hardwareVersion: string
  manufacturer: string
  model: string
  productCode?: string
  serialNumber: string
}

export interface IdentifiableDeviceAttributes {
  identifyStarted: string
  identifyPeriod: number
}

export interface JoinableDeviceAttributes {
  permittingJoin: boolean
}

export interface OtaUpdatableDeviceAttributes {
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
}

export interface Device {
  id: string
  relationId?: string
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
    | 'environmentSensor'
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
  attributes: CommonDeviceAttributes &
    Partial<IdentifiableDeviceAttributes> &
    Partial<JoinableDeviceAttributes> &
    Partial<OtaUpdatableDeviceAttributes> &
    Partial<AirPurifierAttributes> &
    Partial<BlindsAttributes> &
    Partial<ControllerAttributes> &
    Partial<EnvironmentSensorAttributes> &
    Partial<HubAttributes> &
    Partial<LightAttributes> &
    Partial<MotionSensorAttributes> &
    Partial<OutletAttributes> &
    Partial<SpeakerAttributes>
  capabilities: Capabilities
  room?: Room
  deviceSet: DeviceSet[]
  remoteLinks: string[]
  isHidden?: boolean
}
