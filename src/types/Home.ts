import type { User } from './User.ts'
import type { Room } from './Room.ts'
import type { Music } from './Music.ts'
import type { Hub } from './device/Hub.ts'
import type { DeviceSet } from './DeviceSet.ts'
import type { Scene } from './Scene.ts'
import type { Device } from './device/Device.ts'

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
