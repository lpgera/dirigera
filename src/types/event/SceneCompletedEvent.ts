import type { CommonEventProperties } from './Event.ts'

export type SceneCompletedEvent = {
  type: 'sceneCompleted'
  data: {
    id: string
  }
} & CommonEventProperties
