import type { Home } from '../../src'
import { hub } from './hub'
import { airPurifier } from './airPurifier'
import { blinds } from './blinds'
import {
  lightController,
  shortcutController,
  blindsController,
  scrollWheelController,
} from './controller'
import {
  environmentSensor1,
  environmentSensor2,
  environmentSensor3,
  environmentSensor4,
} from './environmentSensor'
import { colorTemperatureLight, dimmableLight, rgbLight } from './light'
import { lightSensor } from './lightSensor'
import { motionSensor1, motionSensor2 } from './motionSensor'
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
    environmentSensor1,
    environmentSensor2,
    environmentSensor3,
    environmentSensor4,
    hub,
    rgbLight,
    colorTemperatureLight,
    dimmableLight,
    lightSensor,
    motionSensor1,
    motionSensor2,
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
