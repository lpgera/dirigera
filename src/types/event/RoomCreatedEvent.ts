import type { CommonEventProperties } from './Event.ts'
import type { Room } from '../Room.ts'

export type RoomCreatedEvent = {
  type: 'roomCreated'
  data: Room
} & CommonEventProperties
