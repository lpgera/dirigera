import type { Home } from '../../src'
import { hub } from './hub'
import { airPurifier } from './airPurifier'
import { blinds } from './blinds'
import {
  lightController,
  shortcutController,
  blindsController,
  scrollWheelController,
  dualButtonController,
} from './controller'
import {
  environmentSensor1,
  environmentSensor2,
  environmentSensor3,
  environmentSensor4,
} from './environmentSensor'
import { colorTemperatureLight, dimmableLight, rgbLight } from './light'
import { lightSensor1, lightSensor2 } from './lightSensor'
import { motionSensor1, motionSensor2 } from './motionSensor'
import { occupancySensor } from './occupancySensor'
import { outlet1, outlet2 } from './outlet'
import { repeater } from './repeater'
import { speaker } from './speaker'
import { waterSensor } from './waterSensor'
import { hostUser, memberUser } from './user'
import { scene } from './scene'
import { room } from './room'
import { deviceSet } from './deviceSet'

const home: Home = {
  hub,
  devices: [
    airPurifier,
    blinds,
    lightController,
    shortcutController,
    blindsController,
    scrollWheelController,
    dualButtonController,
    environmentSensor1,
    environmentSensor2,
    environmentSensor3,
    environmentSensor4,
    hub,
    rgbLight,
    colorTemperatureLight,
    dimmableLight,
    lightSensor1,
    lightSensor2,
    motionSensor1,
    motionSensor2,
    occupancySensor,
    outlet1,
    outlet2,
    repeater,
    speaker,
    waterSensor,
  ],
  users: [hostUser, memberUser],
  user: hostUser,
  scenes: [scene],
  rooms: [room],
  deviceSets: [deviceSet],
  music: {
    playlists: [],
    favorites: [],
  },
}

home
