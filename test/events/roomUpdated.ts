import type { RoomUpdatedEvent } from '../../src'

const event: RoomUpdatedEvent = {
  id: '00000000-0000-0000-0000-000000000000',
  source: 'hub',
  time: '2000-01-01T00:00:00.000Z',
  specversion: '1.1.0',
  type: 'roomUpdated',
  data: {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Room',
    icon: 'rooms_bedside_table',
    color: 'ikea_green_no_65',
  },
}

event
