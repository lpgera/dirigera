import { LightSensor } from '../../src/types/device/LightSensor'

export const lightSensor: LightSensor = {
  id: '00000000-0000-0000-0000-000000000000',
  relationId: '00000000-0000-0000-0000-000000000000',
  type: 'unknown',
  deviceType: 'lightSensor',
  createdAt: '2000-01-01T00:00:00.000Z',
  isReachable: true,
  lastSeen: '2000-01-01T00:00:00.000Z',
  attributes: {
    customName: '',
    firmwareVersion: '1.0.64',
    hardwareVersion: '1',
    manufacturer: 'IKEA of Sweden',
    model: 'VALLHORN Wireless Motion Sensor',
    productCode: 'E2134',
    serialNumber: '00000000-0000-0000-0000-000000000000',
    illuminance: 1,
    identifyPeriod: 0,
    identifyStarted: '2000-01-01T00:00:00.000Z',
    permittingJoin: false,
  },
  capabilities: {
    canSend: [],
    canReceive: ['customName'],
  },
  deviceSet: [],
  remoteLinks: [],
  isHidden: false,
}
