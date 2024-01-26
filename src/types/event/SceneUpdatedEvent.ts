import type { CommonEventProperties } from './Event'
import type { Scene } from '../Scene'

export type SceneUpdatedEvent = {
  type: 'sceneUpdated'
  data: Scene
} & CommonEventProperties
