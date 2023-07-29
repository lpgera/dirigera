import type { Device } from './Device'

export interface EnvironmentSensor extends Device {
  type: 'sensor'
  deviceType: 'environmentSensor'
  attributes: Device['attributes'] & {
    currentTemperature: number
    currentRH: number
    currentPM25: number
    maxMeasuredPM25: number
    minMeasuredPM25: number
    vocIndex: number
    identifyPeriod: number
    identifyStarted: string
  }
}
