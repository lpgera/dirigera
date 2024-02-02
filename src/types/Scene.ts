import type { Device } from './device/Device'

interface CommonSceneTriggerProperties {
  id?: string
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
  endTrigger?: SceneEndTrigger
  endTriggerEvent?: SceneEndTrigger
}

type SceneEndTrigger =
  | {
      type: 'duration'
      trigger: {
        duration: number
      }
    }
  | {
      type: 'time'
      trigger: {
        time: string
      }
    }
  | {
      type: 'sunriseSunset'
      trigger: {
        type: 'sunrise' | 'sunset'
        offset: number
      }
      nextTriggerAt?: string | null
    }

type TimeSceneTrigger = CommonSceneTriggerProperties & {
  type: 'time'
  trigger: {
    days: string[]
    time: string
  }
  nextTriggerAt: string
}

type SunriseSunsetSceneTrigger = CommonSceneTriggerProperties & {
  type: 'sunriseSunset'
  trigger: {
    days: string[]
    type: 'sunrise' | 'sunset'
    offset: number
  }
  nextTriggerAt: string
}

type ControllerSceneTrigger = CommonSceneTriggerProperties & {
  type: 'controller'
  trigger: {
    days: string[]
    controllerType: 'shortcutController'
    clickPattern: 'singlePress' | 'doublePress' | 'longPress'
    buttonIndex: 0
    deviceId: string
  }
}

type AppSceneTrigger = CommonSceneTriggerProperties & {
  type: 'app'
}

type EventSceneTrigger = CommonSceneTriggerProperties & {
  type: 'event'
  trigger: {
    days: string[]
    deviceId: string
    undo?: boolean
    filter: {
      attribute: Partial<Device['attributes']>
    }
    notifications?: {
      type: 'opened' | 'closed'
    }[]
  }
}

type SceneTrigger =
  | TimeSceneTrigger
  | SunriseSunsetSceneTrigger
  | ControllerSceneTrigger
  | AppSceneTrigger
  | EventSceneTrigger

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
  triggers: SceneTrigger[]
  actions: {
    id?: string
    type: 'device' | 'deviceSet'
    enabled?: boolean
    deviceId?: string
    attributes: Partial<Device['attributes']>
  }[]
  commands: any[]
  createdAt: string
  lastCompleted?: string
  lastTriggered?: string
  undoAllowedDuration: number
  lastUndo?: string
}
