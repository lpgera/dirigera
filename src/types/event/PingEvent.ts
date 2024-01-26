import type { CommonEventProperties } from './Event'

export type PingEvent = {
  type: 'ping'
} & CommonEventProperties
