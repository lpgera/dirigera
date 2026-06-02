import type { Home } from '../../src/index.ts'
import { hub } from './hub.ts'
import { airPurifier } from './airPurifier.ts'
import { blinds } from './blinds.ts'
import {
  lightController,
  shortcutController,
  blindsController,
  scrollWheelController,
  dualButtonController,
} from './controller.ts'
import {
  environmentSensor1,
  environmentSensor2,
  environmentSensor3,
  environmentSensor4,
} from './environmentSensor.ts'
import { colorTemperatureLight, dimmableLight, rgbLight } from './light.ts'
import { lightSensor1, lightSensor2 } from './lightSensor.ts'
import { motionSensor1, motionSensor2 } from './motionSensor.ts'
import { occupancySensor } from './occupancySensor.ts'
import { outlet1, outlet2 } from './outlet.ts'
import { openCloseSensor } from './openCloseSensor.ts'
import { repeater } from './repeater.ts'
import { speaker } from './speaker.ts'
import { waterSensor } from './waterSensor.ts'
import { hostUser, memberUser } from './user.ts'
import { scene1, scene2 } from './scene.ts'
import { room } from './room.ts'
import { deviceSet } from './deviceSet.ts'

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
    openCloseSensor,
    repeater,
    speaker,
    waterSensor,
  ],
  users: [hostUser, memberUser],
  user: hostUser,
  scenes: [scene1, scene2],
  rooms: [room],
  deviceSets: [deviceSet],
  music: {
    playlists: [],
    favorites: [],
    authorized: true,
  },
}

home
