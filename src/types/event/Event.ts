import type { DeviceAddedEvent } from './DeviceAddedEvent'
import type { DeviceConfigurationChangedEvent } from './DeviceConfigurationChangedEvent'
import type { DeviceDiscoveredEvent } from './DeviceDiscoveredEvent'
import type { DeviceRemovedEvent } from './DeviceRemovedEvent'
import type { DeviceSetCreatedEvent } from './DeviceSetCreatedEvent'
import type { DeviceSetDeletedEvent } from './DeviceSetDeletedEvent'
import type { DeviceSetUpdatedEvent } from './DeviceSetUpdatedEvent'
import type { DeviceStateChangedEvent } from './DeviceStateChangedEvent'
import type { MusicUpdatedEvent } from './MusicUpdatedEvent'
import type { PingEvent } from './PingEvent'
import type { PongEvent } from './PongEvent'
import type { RoomCreatedEvent } from './RoomCreatedEvent'
import type { RoomDeletedEvent } from './RoomDeletedEvent'
import type { RoomUpdatedEvent } from './RoomUpdatedEvent'
import type { SceneCompletedEvent } from './SceneCompletedEvent'
import type { SceneCreatedEvent } from './SceneCreatedEvent'
import type { SceneDeletedEvent } from './SceneDeletedEvent'
import type { SceneTriggeredEvent } from './SceneTriggeredEvent'
import type { SceneUpdatedEvent } from './SceneUpdatedEvent'
import type { TerminationEvent } from './TerminationEvent'

export interface CommonEventProperties {
  id: string
  time: string
  specversion: string
  source: string
  type: string
}

export type Event =
  | DeviceAddedEvent
  | DeviceConfigurationChangedEvent
  | DeviceDiscoveredEvent
  | DeviceRemovedEvent
  | DeviceSetCreatedEvent
  | DeviceSetDeletedEvent
  | DeviceSetUpdatedEvent
  | DeviceStateChangedEvent
  | MusicUpdatedEvent
  | PingEvent
  | PongEvent
  | RoomCreatedEvent
  | RoomDeletedEvent
  | RoomUpdatedEvent
  | SceneCompletedEvent
  | SceneCreatedEvent
  | SceneDeletedEvent
  | SceneTriggeredEvent
  | SceneUpdatedEvent
  | TerminationEvent
