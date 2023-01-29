import type { Device } from './Device'

export interface AirPurifier extends Device {
  type: 'airPurifier'
  deviceType: 'airPurifier'
  attributes: Device['attributes'] & {
    fanMode: 'auto' | 'manual' | 'off'
    fanModeSequence: 'lowMediumHighAuto'
    motorState: number
    motorRuntime: number
    filterElapsedTime: number
    filterAlarmStatus: boolean
    filterLifetime: number
    childLock: boolean
    statusLight: boolean
    currentPM25: number
    identifyStarted: string
    identifyPeriod: number
  }
}
