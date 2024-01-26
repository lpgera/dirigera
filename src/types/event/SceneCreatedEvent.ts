import type { CommonEventProperties } from './Event'
import type { Scene } from '../Scene'

export type SceneCreatedEvent = {
  type: 'sceneCreated'
  data: Scene
} & CommonEventProperties
