import type { CommonEventProperties } from './Event'

export type SceneCompletedEvent = {
  type: 'sceneCompleted'
  data: {
    id: string
  }
} & CommonEventProperties
