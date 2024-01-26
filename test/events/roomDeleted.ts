import type { RoomDeletedEvent } from '../../src'

const event: RoomDeletedEvent = {
  id: '00000000-0000-0000-0000-000000000000',
  source: 'hub',
  time: '2000-01-01T00:00:00.000Z',
  specversion: '1.1.0',
  type: 'roomDeleted',
  data: { id: '00000000-0000-0000-0000-000000000000' },
}

event
