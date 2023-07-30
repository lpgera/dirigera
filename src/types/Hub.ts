import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface HubAttributes {
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
  nextSunSet: string
  nextSunRise: string
  homestateValue: string
  homestateLastChanged: string
  countryCode: string
  coordinates: {
    latitude: number
    longitude: number
    accuracy: number
  }
  isOn: boolean
}

export interface Hub extends Device {
  relationId: string
  type: 'gateway'
  deviceType: 'gateway'
  attributes: CommonDeviceAttributes &
    IdentifiableDeviceAttributes &
    JoinableDeviceAttributes &
    OtaUpdatableDeviceAttributes &
    HubAttributes
}
