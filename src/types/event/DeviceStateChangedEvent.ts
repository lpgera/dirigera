import type { CommonEventProperties } from './Event'
import type { Device } from '../device/Device'

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
