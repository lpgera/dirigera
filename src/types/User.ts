export interface User {
  uid: string
  name: string
  audience: string
  email: string
  createdTimestamp: string
  verifiedUid: string
  role: 'home_member' | 'host'
  remoteUser: 0
}
