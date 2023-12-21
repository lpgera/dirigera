import type { Home } from '../../src'
import { hub } from './hub'
import { airPurifier } from './airPurifier'
import { blinds } from './blinds'
import { lightController, shortcutController } from './controller'
import { environmentSensor } from './environmentSensor'
import { colorTemperatureLight, dimmableLight, rgbLight } from './light'
import { motionSensor } from './motionSensor'
import { outlet } from './outlet'
import { repeater } from './repeater'
import { speaker } from './speaker'
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
    environmentSensor,
    hub,
    rgbLight,
    colorTemperatureLight,
    dimmableLight,
    motionSensor,
    outlet,
    repeater,
    speaker,
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
