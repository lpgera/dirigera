import type { Capabilities } from '../Capabilities'
import type { Room } from '../Room'
import type { DeviceSet } from '../DeviceSet'
import type { AirPurifierAttributes } from './AirPurifier'
import type { BlindsAttributes } from './Blinds'
import type { Controller } from './Controller'
import type { EnvironmentSensorAttributes } from './EnvironmentSensor'
import type { HubAttributes } from './Hub'
import type { LightAttributes } from './Light'
import type { LightSensorAttributes } from './LightSensor'
import type { MotionSensorAttributes } from './MotionSensor'
import type { OpenCloseSensorAttributes } from './OpenCloseSensor'
import type { OutletAttributes } from './Outlet'
import type { RepeaterAttributes } from './Repeater'
import type { SpeakerAttributes } from './Speaker'

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
    | 'outlet'
    | 'repeater'
    | 'sensor'
    | 'speaker'
    | 'unknown'
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
    | 'lightSensor'
    | 'motionSensor'
    | 'openCloseSensor'
    | 'outlet'
    | 'repeater'
    | 'speaker'
    | 'waterSensor'
  createdAt: string
  isReachable: boolean
  lastSeen: string
  attributes: CommonDeviceAttributes &
    Partial<IdentifiableDeviceAttributes> &
    Partial<JoinableDeviceAttributes> &
    Partial<OtaUpdatableDeviceAttributes> &
    Partial<AirPurifierAttributes> &
    Partial<BlindsAttributes> &
    Partial<Controller['attributes']> &
    Partial<EnvironmentSensorAttributes> &
    Partial<HubAttributes> &
    Partial<LightAttributes> &
    Partial<LightSensorAttributes> &
    Partial<MotionSensorAttributes> &
    Partial<OpenCloseSensorAttributes> &
    Partial<OutletAttributes> &
    Partial<RepeaterAttributes> &
    Partial<SpeakerAttributes>
  capabilities: Capabilities
  room?: Room
  deviceSet: DeviceSet[]
  remoteLinks: string[]
  isHidden?: boolean
  customIcon?: string
}
