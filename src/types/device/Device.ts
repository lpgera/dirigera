import type { Capabilities } from '../Capabilities.ts'
import type { Room } from '../Room.ts'
import type { DeviceSet } from '../DeviceSet.ts'
import type { AirPurifierAttributes } from './AirPurifier.ts'
import type { BlindsAttributes } from './Blinds.ts'
import type { Controller } from './Controller.ts'
import type { EnvironmentSensorAttributes } from './EnvironmentSensor.ts'
import type { HubAttributes } from './Hub.ts'
import type { LightAttributes } from './Light.ts'
import type { LightSensorAttributes } from './LightSensor.ts'
import type { MotionSensorAttributes } from './MotionSensor.ts'
import type { OpenCloseSensorAttributes } from './OpenCloseSensor.ts'
import type { OutletAttributes } from './Outlet.ts'
import type { RepeaterAttributes } from './Repeater.ts'
import type { SpeakerAttributes } from './Speaker.ts'

export interface CommonDeviceAttributes {
  customName: string
  firmwareVersion: string
  hardwareVersion: string
  manufacturer: string
  model: string
  productCode?: string
  serialNumber: string
  discriminator?: number
  qrCode?: string
  setupCode?: string
  windowOpen?: boolean
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
    | 'genericSwitch'
    | 'gateway'
    | 'light'
    | 'lightSensor'
    | 'motionSensor'
    | 'occupancySensor'
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
  adaptiveProfile?: {}
  dynamicFeatures?: {
    type: string
    enabled: boolean
    featureVersion: string
  }[]
}
