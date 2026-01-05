import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface HubAttributes
  extends
    CommonDeviceAttributes,
    IdentifiableDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes {
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
  homestate: string
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
  attributes: HubAttributes
  dynamicFeatures: {
    type: string
    enabled: boolean
    featureVersion: string
  }[]
  environment: string
}
