import type { CommonEventProperties } from './Event'

export type PongEvent = {
  type: 'pong'
  data: {
    lastModified: string
  }
} & CommonEventProperties
