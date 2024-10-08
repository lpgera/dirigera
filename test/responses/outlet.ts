import type { Outlet } from '../../src'

export const outlet1: Outlet = {
  id: '00000000-0000-0000-0000-000000000000',
  type: 'outlet',
  deviceType: 'outlet',
  createdAt: '2000-01-01T00:00:00.000Z',
  isReachable: true,
  lastSeen: '2000-01-01T00:00:00.000Z',
  attributes: {
    customName: 'Custom name',
    model: 'TRADFRI control outlet',
    manufacturer: 'IKEA of Sweden',
    firmwareVersion: '2.3.089',
    hardwareVersion: '1',
    serialNumber: '00000000-0000-0000-0000-000000000000',
    productCode: 'E1603',
    isOn: false,
    startupOnOff: 'startPrevious',
    lightLevel: 62,
    identifyStarted: '2000-01-01T00:00:00.000Z',
    identifyPeriod: 0,
    permittingJoin: false,
    otaStatus: 'upToDate',
    otaState: 'readyToCheck',
    otaProgress: 0,
    otaPolicy: 'autoUpdate',
    otaScheduleStart: '00:00',
    otaScheduleEnd: '00:00',
  },
  capabilities: {
    canSend: [],
    canReceive: ['customName', 'isOn', 'lightLevel'],
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

export const outlet2: Outlet = {
  id: '00000000-0000-0000-0000-000000000000',
  type: 'outlet',
  deviceType: 'outlet',
  createdAt: '2000-01-01T00:00:00.000Z',
  isReachable: true,
  lastSeen: '2000-01-01T00:00:00.000Z',
  attributes: {
    customName: 'Custom name',
    firmwareVersion: '2.4.45',
    hardwareVersion: '1',
    manufacturer: 'IKEA of Sweden',
    model: 'INSPELNING Smart plug',
    productCode: 'E2206',
    serialNumber: '00000000-0000-0000-0000-000000000000',
    isOn: false,
    startupOnOff: 'startPrevious',
    lightLevel: 41,
    startUpCurrentLevel: -1,
    currentActivePower: 0,
    energyConsumedAtLastReset: 0,
    currentAmps: 0.1,
    currentVoltage: 230,
    timeOfLastEnergyReset: '2000-01-01T00:00:00.000Z',
    totalEnergyConsumed: 0.5,
    totalEnergyConsumedLastUpdated: '2000-01-01T00:00:00.000Z',
    childLock: false,
    statusLight: false,
    identifyPeriod: 0,
    identifyStarted: '2000-01-01T00:00:00.000Z',
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
    canReceive: [
      'customName',
      'isOn',
      'lightLevel',
      'energyConsumedAtLastReset',
      'childLock',
      'statusLight',
    ],
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

const outletWithoutRoom: Outlet = {
  id: '00000000-0000-0000-0000-000000000000',
  type: 'outlet',
  deviceType: 'outlet',
  createdAt: '2000-01-01T00:00:00.000Z',
  isReachable: true,
  lastSeen: '2000-01-01T00:00:00.000Z',
  attributes: {
    customName: 'Custom name',
    model: 'TRADFRI control outlet',
    manufacturer: 'IKEA of Sweden',
    firmwareVersion: '2.3.089',
    hardwareVersion: '1',
    serialNumber: '00000000-0000-0000-0000-000000000000',
    productCode: 'E1603',
    isOn: false,
    startupOnOff: 'startPrevious',
    lightLevel: 62,
    identifyStarted: '2000-01-01T00:00:00.000Z',
    identifyPeriod: 0,
    permittingJoin: false,
    otaStatus: 'upToDate',
    otaState: 'readyToCheck',
    otaProgress: 0,
    otaPolicy: 'autoUpdate',
    otaScheduleStart: '00:00',
    otaScheduleEnd: '00:00',
  },
  capabilities: {
    canSend: [],
    canReceive: ['customName', 'isOn', 'lightLevel'],
  },
  deviceSet: [],
  remoteLinks: [],
  isHidden: false,
}

outletWithoutRoom
