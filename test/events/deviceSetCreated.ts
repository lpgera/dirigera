import type { DeviceSetCreatedEvent } from '../../src'

const event: DeviceSetCreatedEvent = {
  id: '00000000-0000-0000-0000-000000000000',
  source: 'hub',
  time: '2000-01-01T00:00:00.000Z',
  specversion: '1.1.0',
  type: 'deviceSetCreated',
  data: {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Device set',
    icon: 'lighting_chandelier',
  },
}

event
