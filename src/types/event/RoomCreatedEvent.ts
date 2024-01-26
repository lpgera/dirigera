import type { CommonEventProperties } from './Event'
import type { Room } from '../Room'

export type RoomCreatedEvent = {
  type: 'roomCreated'
  data: Room
} & CommonEventProperties
