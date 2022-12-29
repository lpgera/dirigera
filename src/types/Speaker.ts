import type { Device } from './Device'

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
    playbackAudio: Object // TODO
    playbackPosition: {
      position: number
      timestamp: string
    }
    volume: number
    isMuted: boolean
    audioGroup: string
  }
}
