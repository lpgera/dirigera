import type {
  CommonDeviceAttributes,
  Device,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device.ts'

export interface ElectricalSensorAttributes
  extends
    CommonDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes {
  currentActivePower: number
  currentAmps: number
  currentVoltage: number
  currentAcFrequency: number
  energyConsumedAtLastReset: number
  timeOfLastEnergyReset: string
  totalEnergyConsumed: number
  totalEnergyConsumedLastUpdated: string
}

export interface ElectricalSensor extends Device {
  type: 'unknown'
  deviceType: 'electricalSensor'
  attributes: ElectricalSensorAttributes
  isHidden: boolean
}
