import type { Capabilities } from './Capabilities'
import type { DeviceSet } from './DeviceSet'

export interface Hub {
  id: string
  relationId: string
  type: 'gateway'
  deviceType: 'gateway'
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
    identifyStarted: string
    identifyPeriod: number
    otaStatus: string
    otaState: string
    otaProgress: number
    otaPolicy: string
    otaScheduleStart: string
    otaScheduleEnd: string
    permittingJoin: boolean
    backendConnected: boolean
    backendConnectionPersistent: boolean
    backendOnboardingComplete: boolean
    backendRegion: string
    backendCountryCode: string
    userConsents: {
      name: 'analytics' | 'diagnostics'
      value: 'enabled' | 'disabled'
    }[]
    logLevel: number
    coredump: boolean
    timezone: string
    countryCode: string
    coordinates: {
      latitude: number
      longitude: number
      accuracy: number
    }
    isOn: boolean
  }
  capabilities: Capabilities
  deviceSet: DeviceSet[]
  remoteLinks: string[]
  apiVersion?: string
}
