import type { Device } from './device/Device'

export interface Scene {
  id: string
  info: {
    name: string
    icon:
      | 'scenes_arrive_home'
      | 'scenes_book'
      | 'scenes_briefcase'
      | 'scenes_brightness_up'
      | 'scenes_broom'
      | 'scenes_cake'
      | 'scenes_clapper'
      | 'scenes_clean_sparkles'
      | 'scenes_cutlery'
      | 'scenes_disco_ball'
      | 'scenes_game_pad'
      | 'scenes_gift_bag'
      | 'scenes_gift_box'
      | 'scenes_headphones'
      | 'scenes_heart'
      | 'scenes_home_filled'
      | 'scenes_hot_drink'
      | 'scenes_ladle'
      | 'scenes_leaf'
      | 'scenes_leave_home'
      | 'scenes_moon'
      | 'scenes_music_note'
      | 'scenes_painting'
      | 'scenes_popcorn'
      | 'scenes_pot_with_lid'
      | 'scenes_speaker_generic'
      | 'scenes_spray_bottle'
      | 'scenes_suitcase'
      | 'scenes_suitcase_2'
      | 'scenes_sun_horizon'
      | 'scenes_tree'
      | 'scenes_trophy'
      | 'scenes_wake_up'
      | 'scenes_weights'
      | 'scenes_yoga'
  }
  type: 'userScene' | 'customScene' | 'playlistScene'
  triggers: {
    id: string
    type:
      | 'time'
      | 'sunriseSunset'
      | 'motionSensor'
      | 'controller'
      | 'app'
      | 'duration'
      | 'event'
      | 'other'
    triggeredAt?: string
    disabled: boolean
    trigger?:
      | {
          days: string[]
          controllerType: 'shortcutController'
          clickPattern: 'singlePress' | 'doublePress' | 'longPress'
          buttonIndex: 0
          deviceId: string
        }
      | {
          days: string[]
          deviceId: string
          undo?: boolean
          filter: {
            attribute: Partial<Device['attributes']>
          }
          notifications?: {
            type: 'opened' | 'closed'
          }[]
        } // TODO app, event, other, sunriseSunset, motionSensor, remote, time
  }[]
  actions: {
    id?: string
    type: 'device' | 'deviceSet'
    enabled?: boolean
    deviceId?: string
    attributes: Record<string, any> // TODO
  }[]
  commands: {
    id: string
    type: 'device' | 'deviceSet'
    enabled?: boolean
    commands: any[] // TODO
  }[]
  createdAt: string
  lastCompleted?: string
  lastTriggered?: string
  undoAllowedDuration: number
  lastUndo?: string
}
