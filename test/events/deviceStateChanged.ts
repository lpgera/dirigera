import type { DeviceStateChangedEvent } from '../../src'

const event1: DeviceStateChangedEvent = {
  id: '00000000-0000-0000-0000-000000000000',
  time: '2000-01-01T00:00:00.000Z',
  specversion: '3.145.0',
  source: 'urn:com:ikea:homesmart:iotc:zigbee',
  type: 'deviceStateChanged',
  data: {
    id: '00000000-0000-0000-0000-000000000000',
    type: 'sensor',
    deviceType: 'environmentSensor',
    createdAt: '2000-01-01T00:00:00.000Z',
    isReachable: true,
    lastSeen: '2000-01-01T00:00:00.000Z',
    attributes: { currentPM25: 2 },
    remoteLinks: [],
  },
}

event1

const event2: DeviceStateChangedEvent = {
  id: '00000000-0000-0000-0000-000000000000',
  time: '2000-01-01T00:00:00.000Z',
  specversion: '3.145.0',
  source: 'urn:com:ikea:homesmart:iotc:iotcd',
  type: 'deviceStateChanged',
  data: {
    id: '00000000-0000-0000-0000-000000000000',
    type: 'light',
    deviceType: 'light',
    lastSeen: '2000-01-01T00:00:00.000Z',
    customIcon: 'lighting_cone_pendant',
    remoteLinks: ['00000000-0000-0000-0000-000000000000'],
    isHidden: false,
  },
}

event2

const event3: DeviceStateChangedEvent = {
  id: '00000000-0000-0000-0000-000000000000',
  time: '2000-01-01T00:00:00.000Z',
  specversion: '3.145.0',
  source: 'urn:com:ikea:homesmart:iotc:tagmanager',
  type: 'deviceStateChanged',
  data: {
    id: '00000000-0000-0000-0000-000000000000',
    type: 'gateway',
    deviceType: 'gateway',
    lastSeen: '2000-01-01T00:00:00.000Z',
    deviceSet: [],
    remoteLinks: [],
  },
}

event3
