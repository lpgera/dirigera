import type { CommonEventProperties } from './Event.ts'

export type SceneTriggeredEvent = {
  type: 'sceneTriggered'
  data: {
    id: string
  }
} & CommonEventProperties
