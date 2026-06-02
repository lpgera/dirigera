import type { CommonEventProperties } from './Event.ts'

export type SceneDeletedEvent = {
  type: 'sceneDeleted'
  data: {
    id: string
  }
} & CommonEventProperties
