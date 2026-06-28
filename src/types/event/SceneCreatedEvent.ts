import type { CommonEventProperties } from './Event.ts'
import type { Scene } from '../Scene.ts'

export type SceneCreatedEvent = {
  type: 'sceneCreated'
  data: Scene
} & CommonEventProperties
