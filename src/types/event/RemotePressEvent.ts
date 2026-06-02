import type { CommonEventProperties } from './Event.ts'

export type RemotePressEvent = {
  type: 'remotePressEvent'
  data: {
    id: string
    clickPattern: 'singlePress' | 'doublePress' | 'longPress'
  }
} & CommonEventProperties
