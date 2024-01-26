import type { Device } from './device/Device'

export interface Scene {
  id: string
  info: {
    name: string
    icon: string
  }
  type: 'userScene' | 'customScene'
  triggers: {
    id: string
    type: 'app' | 'controller' | 'event' | 'sunriseSunset' | 'timer'
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
        }
  }[]
  actions: {
    id: string
    type: 'device' | 'deviceSet'
    enabled?: boolean
    deviceId?: string
    attributes: Record<string, any>
  }[]
  commands: any[]
  createdAt: string
  lastCompleted?: string
  lastTriggered?: string
  undoAllowedDuration: number
  lastUndo?: string
}
