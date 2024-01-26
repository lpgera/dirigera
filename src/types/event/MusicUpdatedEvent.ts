import type { CommonEventProperties } from './Event'
import type { Music } from '../Music'

export type MusicUpdatedEvent = {
  type: 'musicUpdated'
  data: Music
} & CommonEventProperties
