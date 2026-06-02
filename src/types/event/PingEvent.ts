import type { CommonEventProperties } from './Event.ts'

export type PingEvent = {
  type: 'ping'
} & CommonEventProperties
