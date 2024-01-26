import type { CommonEventProperties } from './Event'

export type SceneTriggeredEvent = {
  type: 'sceneTriggered'
  data: {
    id: string
  }
} & CommonEventProperties
