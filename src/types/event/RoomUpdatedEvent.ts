import type { CommonEventProperties } from './Event'
import type { Room } from '../Room'

export type RoomUpdatedEvent = {
  type: 'roomUpdated'
  data: Room
} & CommonEventProperties
