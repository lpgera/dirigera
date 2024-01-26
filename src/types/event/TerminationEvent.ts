import type { CommonEventProperties } from './Event'

export type TerminationEvent = {
  type: 'termination'
  data: {
    signal: string
  }
} & CommonEventProperties
