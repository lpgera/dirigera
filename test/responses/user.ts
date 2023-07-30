import type { User } from '../../src'

export const memberUser: User = {
  uid: '00000000-0000-0000-0000-000000000000',
  name: 'name',
  audience: 'homesmart.local',
  email: '',
  createdTimestamp: '2000-01-01T00:00:00.000Z',
  verifiedUid: '',
  role: 'home_member',
  remoteUser: 0,
}

export const hostUser: User = {
  uid: '00000000-0000-0000-0000-000000000000',
  name: 'name',
  audience: 'homesmart.global',
  email: 'email',
  createdTimestamp: '2000-01-01T00:00:00.000Z',
  verifiedUid: '',
  role: 'host',
  remoteUser: 0,
}
