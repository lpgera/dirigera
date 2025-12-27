import {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
  JoinableDeviceAttributes,
  OtaUpdatableDeviceAttributes,
} from './Device'

export interface CommonControllerAttributes
  extends
    CommonDeviceAttributes,
    JoinableDeviceAttributes,
    OtaUpdatableDeviceAttributes {
  batteryPercentage: number
  isOn: boolean
  lightLevel: number
  circadianPresets?: any[]
}

interface CommonControllerProperties extends Device {
  type: 'controller'
  isHidden: boolean
}

export interface ShortcutController extends CommonControllerProperties {
  deviceType: 'shortcutController'
  attributes: CommonControllerAttributes
}

export interface LightController extends CommonControllerProperties {
  deviceType: 'lightController'
  attributes: CommonControllerAttributes
}

export interface BlindsController extends CommonControllerProperties {
  deviceType: 'blindsController'
  attributes: CommonControllerAttributes & {
    blindsCurrentLevel: number
    blindsState: 'stopped' | 'up' | 'down'
  }
}

export interface SoundController extends CommonControllerProperties {
  deviceType: 'soundController'
  attributes: CommonControllerAttributes
}

export interface GenericSwitch extends CommonControllerProperties {
  deviceType: 'genericSwitch'
  attributes: CommonDeviceAttributes &
    OtaUpdatableDeviceAttributes &
    JoinableDeviceAttributes &
    IdentifiableDeviceAttributes & {
      switchGroup?: number
      switchLabel: string
      controlMode: 'light' | 'speaker' | 'blind' | 'shortcut'
      batteryPercentage: number
    }
}

export type Controller =
  | ShortcutController
  | LightController
  | SoundController
  | BlindsController
  | GenericSwitch
