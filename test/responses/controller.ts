import type { Controller } from '../../src'

export const lightController: Controller = {
  id: '00000000-0000-0000-0000-000000000000',
  type: 'controller',
  deviceType: 'lightController',
  createdAt: '2000-01-01T00:00:00.000Z',
  isReachable: true,
  lastSeen: '2000-01-01T00:00:00.000Z',
  attributes: {
    customName: 'Custom name',
    model: 'TRADFRI remote control',
    manufacturer: 'IKEA of Sweden',
    firmwareVersion: '24.4.5',
    hardwareVersion: '1',
    serialNumber: '00000000-0000-0000-0000-000000000000',
    productCode: 'E1810',
    batteryPercentage: 20,
    isOn: false,
    lightLevel: 1,
    permittingJoin: false,
    otaStatus: 'upToDate',
    otaState: 'readyToCheck',
    otaProgress: 0,
    otaPolicy: 'autoUpdate',
    otaScheduleStart: '00:00',
    otaScheduleEnd: '00:00',
    circadianPresets: [],
  },
  capabilities: {
    canSend: ['isOn', 'lightLevel'],
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

export const shortcutController: Controller = {
  id: '00000000-0000-0000-0000-000000000000',
  type: 'controller',
  deviceType: 'shortcutController',
  createdAt: '2000-01-01T00:00:00.000Z',
  isReachable: false,
  lastSeen: '2000-01-01T00:00:00.000Z',
  attributes: {
    customName: 'Custom name',
    model: 'TRADFRI SHORTCUT Button',
    manufacturer: 'IKEA of Sweden',
    firmwareVersion: '24.4.5',
    hardwareVersion: '1',
    serialNumber: '00000000-0000-0000-0000-000000000000',
    productCode: 'E1812',
    batteryPercentage: 1,
    isOn: false,
    lightLevel: 1,
    permittingJoin: false,
    otaStatus: 'updateAvailable',
    otaState: 'updateFailed',
    otaProgress: 0,
    otaPolicy: 'autoUpdate',
    otaScheduleStart: '00:00',
    otaScheduleEnd: '00:00',
  },
  capabilities: {
    canSend: ['singlePress', 'doublePress', 'longPress'],
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
