import type { SceneCreatedEvent } from '../../src'

const event: SceneCreatedEvent = {
  id: '00000000-0000-0000-0000-000000000000',
  time: '2000-01-01T00:00:00.000Z',
  specversion: '3.145.0',
  source: 'urn:com:ikea:homesmart:iotc:rulesengine',
  type: 'sceneCreated',
  data: {
    id: '00000000-0000-0000-0000-000000000000',
    info: {
      name: 'Scene',
      icon: 'scenes_brightness_up',
    },
    type: 'userScene',
    triggers: [
      {
        id: '00000000-0000-0000-0000-000000000000',
        type: 'app',
        disabled: false,
      },
    ],
    actions: [
      {
        id: '00000000-0000-0000-0000-000000000000',
        type: 'device',
        deviceId: '00000000-0000-0000-0000-000000000000',
        enabled: true,
        attributes: {
          isOn: true,
        },
      },
    ],
    commands: [],
    createdAt: '2000-01-01T00:00:00.000Z',
    undoAllowedDuration: 30,
  },
}

event
