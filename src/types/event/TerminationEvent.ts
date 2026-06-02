import type { CommonEventProperties } from './Event.ts'

export type TerminationEvent = {
  type: 'termination'
  data: {
    signal: string
  }
} & CommonEventProperties
