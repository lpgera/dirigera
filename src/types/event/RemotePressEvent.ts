import type { CommonEventProperties } from './Event'

export type RemotePressEvent = {
  type: 'remotePressEvent'
  data: {
    id: string
    clickPattern: 'singlePress' | 'doublePress' | 'longPress'
  }
} & CommonEventProperties
