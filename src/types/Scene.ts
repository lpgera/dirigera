export interface Scene {
  id: string
  info: {
    name: string
    icon: string
  }
  type: 'userScene'
  triggers: {
    id: string
    type: 'app' | 'controller'
    triggeredAt?: string
    disabled: boolean
    trigger?: {
      days: string[]
      controllerType: 'shortcutController'
      clickPattern: 'singlePress' | 'doublePress' | 'longPress'
      buttonIndex: 0
      deviceId: string
    }
  }[]
  actions: {
    id: string
    type: 'device' | 'deviceSet'
    deviceId?: string
    attributes: Record<string, any>
  }[]
  commands: any[]
  createdAt: string
  lastCompleted: string
  lastTriggered: string
  undoAllowedDuration: number
  lastUndo?: string
}
