import type { WaterSensor } from '../../src'

export const waterSensor: WaterSensor = {
  id: '00000000-0000-0000-0000-000000000000',
  type: 'sensor',
  deviceType: 'waterSensor',
  createdAt: '2000-01-01T00:00:00.000Z',
  isReachable: true,
  lastSeen: '2000-01-01T00:00:00.000Z',
  attributes: {
    customName: 'Custom name',
    firmwareVersion: '1.0.7',
    hardwareVersion: '1',
    manufacturer: 'IKEA of Sweden',
    model: 'BADRING Water Leakage Sensor',
    productCode: 'E2202',
    serialNumber: '00000000-0000-0000-0000-000000000000',
    batteryPercentage: 100,
    waterLeakDetected: true,
    permittingJoin: false,
    otaPolicy: 'autoUpdate',
    otaProgress: 0,
    otaScheduleEnd: '00:00',
    otaScheduleStart: '00:00',
    otaState: 'readyToCheck',
    otaStatus: 'upToDate',
  },
  capabilities: {
    canSend: [],
    canReceive: ['customName'],
  },
  room: {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Room',
    color: 'ikea_green_no_65',
    icon: 'rooms_arm_chair',
  },
  deviceSet: [],
  remoteLinks: [],
  isHidden: false,
}
