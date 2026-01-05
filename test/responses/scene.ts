import type { Scene } from '../../src'

export const scene1: Scene = {
  id: '00000000-0000-0000-0000-000000000000',
  info: {
    name: 'All off',
    icon: 'scenes_moon',
  },
  type: 'userScene',
  triggers: [
    {
      id: '00000000-0000-0000-0000-000000000000',
      type: 'app',
      triggeredAt: '2000-01-01T00:00:00.000Z',
      disabled: false,
    },
    {
      id: '00000000-0000-0000-0000-000000000000',
      type: 'controller',
      triggeredAt: '2000-01-01T00:00:00.000Z',
      disabled: false,
      trigger: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        controllerType: 'shortcutController',
        clickPattern: 'singlePress',
        buttonIndex: 0,
        deviceId: '00000000-0000-0000-0000-000000000000',
      },
    },
    {
      id: '00000000-0000-0000-0000-000000000000',
      type: 'controller',
      triggeredAt: '2000-01-01T00:00:00.000Z',
      disabled: false,
      trigger: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        controllerType: 'shortcutController',
        clickPattern: 'longPress',
        buttonIndex: 0,
        deviceId: '00000000-0000-0000-0000-000000000000',
      },
      endTriggerEvent: {
        type: 'time',
        trigger: {
          time: '00:00',
        },
      },
    },
    {
      id: '00000000-0000-0000-0000-000000000000',
      type: 'time',
      disabled: false,
      trigger: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        time: '00:00',
      },
      endTrigger: {
        type: 'duration',
        trigger: {
          duration: 1800,
        },
      },
      endTriggerEvent: {
        type: 'duration',
        trigger: {
          duration: 1800,
        },
      },
      nextTriggerAt: '2000-01-01T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0000-0000-000000000000',
      type: 'sunriseSunset',
      disabled: false,
      trigger: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        type: 'sunrise',
        offset: 15,
      },
      nextTriggerAt: '2000-01-01T00:00:00.000Z',
      endTriggerEvent: {
        type: 'sunriseSunset',
        trigger: {
          type: 'sunrise',
          offset: 0,
        },
        nextTriggerAt: null,
      },
    },
  ],
  actions: [
    {
      id: '00000000-0000-0000-0000-000000000000',
      type: 'device',
      deviceId: '00000000-0000-0000-0000-000000000000',
      attributes: {
        volume: 20,
        playback: 'playbackIdle',
        playbackAudio: {
          playItem: {
            title: '',
          },
        },
      },
    },
    {
      id: '00000000-0000-0000-0000-000000000000',
      type: 'device',
      deviceId: '00000000-0000-0000-0000-000000000000',
      attributes: {
        isOn: false,
      },
    },
    {
      id: '00000000-0000-0000-0000-000000000000',
      type: 'deviceSet',
      attributes: {
        isOn: false,
      },
    },
  ],
  commands: [],
  createdAt: '2000-01-01T00:00:00.000Z',
  lastCompleted: '2000-01-01T00:00:00.000Z',
  lastTriggered: '2000-01-01T00:00:00.000Z',
  undoAllowedDuration: 30,
}

export const scene2: Scene = {
  id: '00000000-0000-0000-0000-000000000000',
  info: {
    name: 'Rise and shine',
    icon: 'scenes_sun_horizon',
  },
  type: 'wakeUpScene',
  triggers: [
    {
      id: '00000000-0000-0000-0000-000000000000',
      type: 'time',
      triggeredAt: '2000-01-01T00:00:00.000Z',
      disabled: false,
      trigger: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        time: '00:00',
      },
      nextTriggerAt: '2000-01-01T00:00:00.000Z',
    },
    {
      id: '00000000-0000-0000-0000-000000000000',
      type: 'app',
      disabled: false,
    },
  ],
  actions: [],
  commands: [
    {
      type: 'device',
      id: '00000000-0000-0000-0000-000000000000',
      enabled: true,
      commands: [
        {
          type: 'transitionLight',
          duration: 2400,
          startState: {
            lightLevel: 1,
            colorTemperature: 1000,
            isOn: true,
          },
          endState: {
            lightLevel: 100,
            colorTemperature: 3000,
            isOn: true,
          },
        },
      ],
    },
  ],
  createdAt: '2000-01-01T00:00:00.000Z',
  lastCompleted: '2000-01-01T00:00:00.000Z',
  lastTriggered: '2000-01-01T00:00:00.000Z',
  undoAllowedDuration: 30,
}
