import type {
  CommonDeviceAttributes,
  Device,
  IdentifiableDeviceAttributes,
} from './Device'
import type { MusicPlayItem } from './Music'

export interface SpeakerAttributes {
  playback:
    | 'playbackIdle'
    | 'playbackPlaying'
    | 'playbackPaused'
    | 'playbackNext'
    | 'playbackPrevious'
    | 'playbackBuffering'
  playbackLastChangedTimestamp: string
  playbackAudio: {
    serviceType?: string
    providerType?: string
    playItem?: MusicPlayItem
    nextPlayItem?: {
      title: string
      artist: string
      album: string
    }
    playList?: {
      id: string
      playItems: MusicPlayItem[]
      title: string
    }
  }
  playbackPosition: {
    position: number
    timestamp: string
  }
  playbackAvailableActions: {
    crossfade: boolean
    pause: boolean
    repeat: string[]
    seek: boolean
    shuffle: boolean
    playbackNext: boolean
    playbackPrev: boolean
  }
  playbackModes: {
    crossfade: boolean
    repeat: string
    shuffle: boolean
  }
  volume: number
  isMuted: boolean
  audioGroup: string
}

export interface Speaker extends Device {
  type: 'speaker'
  deviceType: 'speaker'
  attributes: CommonDeviceAttributes &
    IdentifiableDeviceAttributes &
    SpeakerAttributes
}
