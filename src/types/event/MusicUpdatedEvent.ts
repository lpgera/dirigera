import type { CommonEventProperties } from './Event.ts'
import type { Music } from '../Music.ts'

export type MusicUpdatedEvent = {
  type: 'musicUpdated'
  data: Music
} & CommonEventProperties
