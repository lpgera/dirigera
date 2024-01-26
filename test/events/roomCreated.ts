import type { RoomCreatedEvent } from '../../src'

const event: RoomCreatedEvent = {
  id: '00000000-0000-0000-0000-000000000000',
  source: 'hub',
  time: '2000-01-01T00:00:00.000Z',
  specversion: '1.1.0',
  type: 'roomCreated',
  data: {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Room',
    icon: 'rooms_arm_chair',
    color: 'ikea_green_no_65',
  },
}

event
