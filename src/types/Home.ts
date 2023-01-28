import type { User } from './User'
import type { Room } from './Room'
import type { Music } from './Music'
import type { Hub } from './Hub'
import type { DeviceSet } from './DeviceSet'
import type { Scene } from './Scene'
import type { Device } from './Device'

export interface Home {
  hub: Hub
  devices: Device[]
  users: User[]
  user: User
  scenes: Scene[]
  rooms: Room[]
  deviceSets: DeviceSet[]
  music: Music
}
