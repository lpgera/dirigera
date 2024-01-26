import type { CommonEventProperties } from './Event'

export type RoomDeletedEvent = {
  type: 'roomDeleted'
  data: {
    id: string
  }
} & CommonEventProperties
