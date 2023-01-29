import type { Device } from './Device'
import type { MusicPlayItem } from './Music'

export interface Speaker extends Device {
  type: 'speaker'
  deviceType: 'speaker'
  attributes: Device['attributes'] & {
    identifyStarted: string
    identifyPeriod: number
    playback:
      | 'playbackIdle'
      | 'playbackPlaying'
      | 'playbackPaused'
      | 'playbackNext'
      | 'playbackPrevious'
      | 'playbackBuffering'
    playbackLastChangedTimestamp: string
    playbackAudio: {
      serviceType: string
      providerType: string
      playItem: MusicPlayItem
      nextPlayItem: MusicPlayItem
      playList: {
        id: string
        playItems: MusicPlayItem[]
        title: string
      }
    }
    playbackPosition: {
      position: number
      timestamp: string
    }
    volume: number
    isMuted: boolean
    audioGroup: string
  }
}
