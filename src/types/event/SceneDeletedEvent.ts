import type { CommonEventProperties } from './Event'

export type SceneDeletedEvent = {
  type: 'sceneDeleted'
  data: {
    id: string
  }
} & CommonEventProperties
