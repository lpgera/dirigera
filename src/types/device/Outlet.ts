import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface OutletAttributes
  extends CommonDeviceAttributes,
    IdentifiableDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes {
  isOn: boolean
  startupOnOff: 'startOn' | 'startPrevious'
  lightLevel: number
  startUpCurrentLevel?: number
  currentActivePower?: number
  energyConsumedAtLastReset?: number
  currentAmps?: number
  currentVoltage?: number
  timeOfLastEnergyReset?: string
  totalEnergyConsumed?: number
  totalEnergyConsumedLastUpdated?: string
  childLock?: boolean
  statusLight?: boolean
}

export interface Outlet extends Device {
  type: 'outlet'
  deviceType: 'outlet'
  attributes: OutletAttributes
  isHidden: boolean
}
