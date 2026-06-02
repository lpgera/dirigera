import type { CommonEventProperties } from './Event.ts'

export type RoomDeletedEvent = {
  type: 'roomDeleted'
  data: {
    id: string
  }
} & CommonEventProperties
