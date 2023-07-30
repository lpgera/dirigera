import type { MotionSensor } from '../../src'

export const motionSensor: MotionSensor = {
  id: '00000000-0000-0000-0000-000000000000',
  type: 'sensor',
  deviceType: 'motionSensor',
  createdAt: '2000-01-01T00:00:00.000Z',
  isReachable: true,
  lastSeen: '2000-01-01T00:00:00.000Z',
  attributes: {
    customName: 'Custom name',
    model: 'TRADFRI motion sensor',
    manufacturer: 'IKEA of Sweden',
    firmwareVersion: '1.2.214',
    hardwareVersion: '1',
    serialNumber: '00000000-0000-0000-0000-000000000000',
    productCode: 'E1525',
    batteryPercentage: 52,
    isOn: false,
    permittingJoin: false,
    otaStatus: 'upToDate',
    otaState: 'updateComplete',
    otaProgress: 0,
    otaPolicy: 'autoUpdate',
    otaScheduleStart: '00:00',
    otaScheduleEnd: '00:00',
    sensorConfig: {
      scheduleOn: false,
      onDuration: 180,
      schedule: {
        onCondition: {
          time: '20:00',
        },
        offCondition: {
          time: '08:00',
        },
      },
    },
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
