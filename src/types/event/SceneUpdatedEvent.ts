import type { CommonEventProperties } from './Event.ts'
import type { Scene } from '../Scene.ts'

export type SceneUpdatedEvent = {
  type: 'sceneUpdated'
  data: Scene
} & CommonEventProperties
