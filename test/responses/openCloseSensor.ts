import type { OpenCloseSensor } from '../../src'

export const openCloseSensor: OpenCloseSensor = {
  id: '00000000-0000-0000-0000-000000000000',
  type: 'sensor',
  deviceType: 'openCloseSensor',
  createdAt: '2000-01-01T00:00:00.000Z',
  isReachable: true,
  lastSeen: '2000-01-01T00:00:00.000Z',
  customIcon: 'placement_door',
  attributes: {
    customName: 'Custom name',
    firmwareVersion: '1.0.19',
    hardwareVersion: '1',
    manufacturer: 'IKEA of Sweden',
    model: 'PARASOLL Door/Window Sensor',
    productCode: 'E2013',
    serialNumber: '00000000-0000-0000-0000-000000000000',
    batteryPercentage: 92,
    identifyPeriod: 0,
    identifyStarted: '2000-01-01T00:00:00.000Z',
    isOpen: false,
    permittingJoin: false,
  },
  capabilities: {
    canSend: [],
    canReceive: ['customName'],
  },
  room: {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Room',
    color: 'pantone_16_0940_tcx',
    icon: 'rooms_door',
  },
  deviceSet: [],
  remoteLinks: [],
  isHidden: false,
}
