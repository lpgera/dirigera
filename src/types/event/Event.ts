import type { DeviceAddedEvent } from './DeviceAddedEvent.ts'
import type { DeviceConfigurationChangedEvent } from './DeviceConfigurationChangedEvent.ts'
import type { DeviceDiscoveredEvent } from './DeviceDiscoveredEvent.ts'
import type { DeviceRemovedEvent } from './DeviceRemovedEvent.ts'
import type { DeviceSetCreatedEvent } from './DeviceSetCreatedEvent.ts'
import type { DeviceSetDeletedEvent } from './DeviceSetDeletedEvent.ts'
import type { DeviceSetUpdatedEvent } from './DeviceSetUpdatedEvent.ts'
import type { DeviceStateChangedEvent } from './DeviceStateChangedEvent.ts'
import type { MusicUpdatedEvent } from './MusicUpdatedEvent.ts'
import type { PingEvent } from './PingEvent.ts'
import type { PongEvent } from './PongEvent.ts'
import type { RemotePressEvent } from './RemotePressEvent.ts'
import type { RoomCreatedEvent } from './RoomCreatedEvent.ts'
import type { RoomDeletedEvent } from './RoomDeletedEvent.ts'
import type { RoomUpdatedEvent } from './RoomUpdatedEvent.ts'
import type { SceneCompletedEvent } from './SceneCompletedEvent.ts'
import type { SceneCreatedEvent } from './SceneCreatedEvent.ts'
import type { SceneDeletedEvent } from './SceneDeletedEvent.ts'
import type { SceneTriggeredEvent } from './SceneTriggeredEvent.ts'
import type { SceneUpdatedEvent } from './SceneUpdatedEvent.ts'
import type { TerminationEvent } from './TerminationEvent.ts'

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
  | RemotePressEvent
  | RoomCreatedEvent
  | RoomDeletedEvent
  | RoomUpdatedEvent
  | SceneCompletedEvent
  | SceneCreatedEvent
  | SceneDeletedEvent
  | SceneTriggeredEvent
  | SceneUpdatedEvent
  | TerminationEvent
