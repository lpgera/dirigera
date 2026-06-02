import type { CommonEventProperties } from './Event.ts'
import type { Device } from '../device/Device.ts'

export type DeviceStateChangedEvent = {
  type: 'deviceStateChanged'
  data: Pick<
    Device,
    'id' | 'type' | 'deviceType' | 'lastSeen' | 'remoteLinks'
  > &
    Partial<
      Pick<
        Device,
        | 'createdAt'
        | 'isReachable'
        | 'capabilities'
        | 'customIcon'
        | 'room'
        | 'isHidden'
        | 'deviceSet'
      >
    > & {
      attributes?: Partial<Device['attributes']>
    }
} & CommonEventProperties
