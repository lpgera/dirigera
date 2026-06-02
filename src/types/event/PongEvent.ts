import type { CommonEventProperties } from './Event.ts'

export type PongEvent = {
  type: 'pong'
  data: {
    lastModified: string
  }
} & CommonEventProperties
