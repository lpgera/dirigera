# Dirigera

An unofficial TypeScript client library for IKEA's DIRIGERA smart home hub.

The library is based on reverse-engineering the communication with the DIRIGERA hub. Changes to the hub's firmware may
break functionality. Some of the type definitions are incomplete, and some of the methods are not tested. Feedback and
contributions are welcome!

- [Quick start](#quick-start)
- [CLI](#cli)
  - [Help](#help)
  - [Authentication](#authentication)
  - [Dump](#dump)
- [Library](#library)
  - [Client](#client)
  - [Hub](#hub)
  - [Devices](#devices)
    - [Air purifiers](#air-purifiers)
    - [Blinds](#blinds)
    - [Controllers](#controllers)
    - [Environment sensors](#environment-sensors)
    - [Lights](#lights)
    - [Light sensors](#light-sensors)
    - [Motion sensors](#motion-sensors)
    - [Outlets](#outlets)
    - [Open/close sensors](#openclose-sensors)
    - [Repeaters](#repeaters)
    - [Speakers](#speakers)
    - [Water sensors](#water-sensors)
  - [Device sets](#device-sets)
  - [Rooms](#rooms)
  - [Scenes](#scenes)
  - [Music](#music)
  - [Users](#users)
  - [Update events](#update-events)

## Quick start

1. Execute `npx dirigera authenticate` in your terminal and follow the instructions.
2. Save the obtained access token.
3. [Optional] To get your device IDs, dump your Dirigera system's information as a JSON:
   `npx dirigera dump --access-token <YOUR_ACCESS_TOKEN>`
4. Install the library as a dependency: `npm i dirigera`
5. Create a client instance in your code with the access token:

   ```typescript
   import { createDirigeraClient } from 'dirigera'

   const client = await createDirigeraClient({
     accessToken: 'YOUR_ACCESS_TOKEN',
   })
   ```

6. You are ready to control your devices!
   ```typescript
   await client.lights.setIsOn({
     id: 'YOUR_DEVICE_ID',
     isOn: true,
   })
   ```

## CLI

### Help

```bash
npx dirigera help [command]
```

### Authentication

To be able to communicate with your DIRIGERA hub, you have to obtain an access token by pairing with it.

Use the following command to do this via the CLI:

```bash
npx dirigera authenticate
```

You'll be prompted to press the action button on the bottom of the gateway within 60 seconds. If the pairing is
successful, an access token will be printed on your console.

Store the access token in a secure place, and never share it with anyone outside your household!

### Dump

Use the following command to dump a JSON from your gateway. This can be useful for adding support of new devices to the
library or to debug issues that may arise from device or gateway firmware changes.

```bash
npx dirigera dump --access-token YOUR_ACCESS_TOKEN
```

## Library

### Client

You can rely on mDNS discovery to connect to the gateway without specifying an IP address.

```typescript
const client = await createDirigeraClient({
  accessToken: 'YOUR_ACCESS_TOKEN',
})
```

Alternatively, if mDNS discovery fails, it's possible to explicitly set the IP address.

```typescript
const client = await createDirigeraClient({
  gatewayIP: 'YOUR_GATEWAY_IP',
  accessToken: 'YOUR_ACCESS_TOKEN',
})
```

If you want to authenticate without using the CLI, you can use the following method:

```typescript
const client = await createDirigeraClient()

const accessToken = await client.authenticate() // You have to press the action button on the gateway after this
```

To get every device, room, scene, etc. in a single object:

```typescript
const home = await client.home()
```

### [Hub](./src/api/hub.ts)

```typescript
const hubStatus = await client.hub.status()

await client.hub.checkFirmwareUpdate()

await client.hub.installFirmwareUpdate()
```

### [Devices](./src/api/devices.ts)

Generic device API.

```typescript
const devices = await client.devices.list()

const device = await client.devices.get({
  id: 'YOUR_DEVICE_ID',
})

await client.devices.setCustomName({
  id: 'YOUR_DEVICE_ID',
  customName: 'A_CUSTOM_NAME',
})

// low level method to set attributes, use device type specific apis if possible
await client.devices.setAttributes({
  id: 'YOUR_DEVICE_ID',
  attributes: {
    // ...
  },
  transitionTime: 5000, // optional, in milliseconds
})

await client.devices.startIdentifying({
  id: 'YOUR_DEVICE_ID',
})

await client.devices.stopIdentifying({
  id: 'YOUR_DEVICE_ID',
})
```

#### [Air purifiers](./src/api/airPurifiers.ts)

```typescript
const airPurifiers = await client.airPurifiers.list()

const airPurifier = await client.airPurifiers.get({
  id: 'YOUR_DEVICE_ID',
})

await client.airPurifiers.setFanMode({
  id: 'YOUR_DEVICE_ID',
  fanMode: 'auto', // 'auto' | 'low' | 'medium' | 'high' | 'off'
})

await client.airPurifiers.setMotorState({
  id: 'YOUR_DEVICE_ID',
  motorState: 0, // between 0 and 50
})

await client.airPurifiers.setChildLock({
  id: 'YOUR_DEVICE_ID',
  childLock: true,
})

await client.airPurifiers.setStatusLight({
  id: 'YOUR_DEVICE_ID',
  statusLight: true,
})
```

#### [Blinds](./src/api/blinds.ts)

Not tested, feedback required.

```typescript
const blinds = await client.blinds.list()

const blind = await client.blinds.get({
  id: 'YOUR_DEVICE_ID',
})

await client.blinds.setCurrentLevel({
  id: 'YOUR_DEVICE_ID',
  blindsCurrentLevel: 0,
})

await client.blinds.setTargetLevel({
  id: 'YOUR_DEVICE_ID',
  blindsTargetLevel: 60,
})

await client.blinds.setState({
  id: 'YOUR_DEVICE_ID',
  blindsState: 'stopped', // 'stopped' | 'up' | 'down'
})
```

#### [Controllers](./src/api/controllers.ts)

```typescript
const controllers = await client.controllers.list()

const controller = await client.controllers.get({
  id: 'YOUR_DEVICE_ID',
})
```

#### [Environment sensors](./src/api/environmentSensors.ts)

```typescript
const environmentSensors = await client.environmentSensors.list()

const environmentSensor = await client.environmentSensors.get({
  id: 'YOUR_DEVICE_ID',
})

const { currentTemperature, currentRH, currentPM25, vocIndex } =
  environmentSensor.attributes
```

#### [Lights](./src/api/lights.ts)

```typescript
const lights = await client.lights.list()

const light = await client.lights.get({ id: 'YOUR_DEVICE_ID' })

await client.lights.setIsOn({
  id: 'YOUR_DEVICE_ID',
  isOn: true,
})

await client.lights.setLightLevel({
  id: 'YOUR_DEVICE_ID',
  lightLevel: 50, // between 1 and 100
  transitionTime: 5000, // optional, in milliseconds
})

await client.lights.setLightColor({
  id: 'YOUR_DEVICE_ID',
  colorHue: 260, // between 0 and 359
  colorSaturation: 0.8, // between 0 and 1
})

await client.lights.setLightTemperature({
  id: 'YOUR_DEVICE_ID',
  colorTemperature: 2700, // between colorTemperatureMax and colorTemperatureMin
})

await client.lights.setStartupOnOff({
  id: 'YOUR_DEVICE_ID',
  startupOnOff: 'startOn', // 'startOn' | 'startPrevious' | 'startToggle'
})
```

#### [Light sensors](./src/api/lightSensors.ts)

The VALLHORN motion sensor has a light sensor built-in.

```typescript
const lightSensors = await client.lightSensors.list()

const lightSensor = await client.lightSensors.get({
  id: 'YOUR_DEVICE_ID',
})

const { illuminance } = lightSensor.attributes
```

#### [Motion sensors](./src/api/motionSensors.ts)

```typescript
const motionSensors = await client.motionSensors.list()

const motionSensor = await client.motionSensors.get({
  id: 'YOUR_DEVICE_ID',
})

await client.motionSensors.setOnDuration({
  id: 'YOUR_DEVICE_ID',
  onDuration: 300, // in seconds, between 60 and 86400
})

await client.motionSensors.setScheduleOn({
  id: 'YOUR_DEVICE_ID',
  scheduleOn: true,
})

await client.motionSensors.setSchedule({
  id: 'YOUR_DEVICE_ID',
  schedule: {
    onCondition: {
      time: '22:00',
    },
    offCondition: {
      time: '06:00',
    },
  },
})

await client.motionSensors.setSchedule({
  id: 'YOUR_DEVICE_ID',
  schedule: {
    onCondition: {
      time: 'sunset',
      offset: 60, // in minutes
    },
    offCondition: {
      time: 'sunrise',
      offset: -60, // in minutes
    },
  },
})
```

#### [Outlets](./src/api/outlets.ts)

```typescript
const outlets = await client.outlets.list()

const outlet = await client.outlets.get({ id: 'YOUR_DEVICE_ID' })

await client.outlets.setIsOn({
  id: 'YOUR_DEVICE_ID',
  isOn: true,
})

await client.outlets.setStartupOnOff({
  id: 'YOUR_DEVICE_ID',
  startupOnOff: 'startOn', // 'startOn' | 'startPrevious' | 'startToggle'
})

await client.outlet.setStatusLight({
  id: 'YOUR_DEVICE_ID',
  statusLight: true, // true disables the status light, false enables it ¯\_(ツ)_/¯
})

await client.outlet.setChildLock({
  id: 'YOUR_DEVICE_ID',
  childLock: true,
})

await client.outlet.resetEnergyConsumption({
  id: 'YOUR_DEVICE_ID',
})
```

#### [Open/close sensors](./src/api/openCloseSensors.ts)

```typescript
const openCloseSensors = await client.openCloseSensors.list()

const openCloseSensor = await client.openCloseSensors.get({
  id: 'YOUR_DEVICE_ID',
})

const { isOpen, batteryPercentage } = openCloseSensor.attributes
```

#### [Repeaters](./src/api/repeaters.ts)

```typescript
const repeaters = await client.repeaters.list()

const repeater = await client.repeaters.get({
  id: 'YOUR_DEVICE_ID',
})
```

#### [Speakers](./src/api/speakers.ts)

```typescript
const speakers = await client.speakers.list()

const speaker = await client.speakers.get({
  id: 'YOUR_DEVICE_ID',
})

await client.speakers.setVolume({
  id: 'YOUR_DEVICE_ID',
  volume: 20, // between 0 and 100
})

await client.speakers.setPlayback({
  id: 'YOUR_DEVICE_ID',
  playback: 'playbackPaused', // 'playbackPlaying' | 'playbackPaused' | 'playbackNext' | 'playbackPrevious'
})
```

#### [Water sensors](./src/api/waterSensors.ts)

```typescript
const waterSensors = await client.waterSensors.list()

const waterSensor = await client.waterSensors.get({
  id: 'YOUR_DEVICE_ID',
})

const { waterLeakDetected, batteryPercentage } = waterSensor.attributes
```

### [Device sets](./src/api/deviceSets.ts)

For a list of available icons check out [DeviceSet.ts](./src/types/DeviceSet.ts).

```typescript
const deviceSets = await client.deviceSets.list()

await client.deviceSets.setIsOn({
  id: 'YOUR_DEVICE_SET_ID',
  isOn: true,
})

const { id } = await client.deviceSets.create({
  name: 'A_CUSTOM_NAME',
  icon: 'lighting_chandelier',
})

await client.deviceSets.delete({
  id: 'YOUR_DEVICE_SET_ID',
})

await client.deviceSets.update({
  id: 'YOUR_DEVICE_SET_ID',
  name: 'A_NEW_CUSTOM_NAME',
  icon: 'lighting_cone_pendant',
})

await client.deviceSets.updateConfiguration({
  id: 'YOUR_DEVICE_SET_ID',
  deviceIds: ['YOUR_DEVICE_ID'],
  roomId: 'YOUR_ROOM_ID', // optional
  remoteLinkIds: ['YOUR_REMOTE_ID'], // optional
})

await client.deviceSets.setAttributes({
  id: 'YOUR_DEVICE_SET_ID',
  attributes: {
    // ...
  },
  transitionTime: 5000, // optional, in milliseconds
})
```

### [Rooms](./src/api/rooms.ts)

For a list of available colors and icons check out [Room.ts](./src/types/Room.ts).

```typescript
const rooms = await client.rooms.list()

const room = await client.rooms.get({
  id: 'YOUR_ROOM_ID',
})

const { id } = await client.rooms.create({
  name: 'A_CUSTOM_NAME',
  icon: 'rooms_arm_chair',
  color: 'ikea_green_no_65',
})

await client.rooms.delete({
  id: 'YOUR_ROOM_ID',
})

await client.rooms.update({
  id: 'YOUR_ROOM_ID',
  name: 'A_NEW_CUSTOM_NAME',
  icon: 'rooms_bathtub',
  color: 'ikea_yellow_no_24',
})

await client.rooms.moveDevices({
  id: 'YOUR_ROOM_ID',
  deviceIds: ['YOUR_DEVICE_ID'],
})

await client.rooms.setIsOn({
  id: 'YOUR_ROOM_ID',
  deviceType: 'outlet', // optional filter by device type
  isOn: true,
})

await client.rooms.setAttributes({
  id: 'YOUR_ROOM_ID',
  deviceType: 'light', // optional filter by device type
  attributes: {
    // ...
  },
  transitionTime: 5000, // optional
})
```

### [Scenes](./src/api/scenes.ts)

Scenes are a very powerful way to set up automations. Scenes can be triggered by using the application, at a scheduled
time, at sunset/sunrise, by a button press on a shortcut controller or by a device event, such as an open/close sensor
being triggered. Scenes can optionally also be ended at a scheduled time, a duration after they are triggered or at
sunrise/sunset. The actions can set the attributes of devices or device sets, such as turning on a light.

For a list of available icons check out [Scene.ts](./src/types/Scene.ts).

```typescript
const scenes = await client.scenes.list()

const scene = await client.scenes.get({
  id: 'YOUR_SCENE_ID',
})

await client.scenes.trigger({
  id: 'YOUR_SCENE_ID',
})

await client.scenes.undo({
  id: 'YOUR_SCENE_ID',
})

// simple scene, triggerable from app
const { id } = await client.scenes.create({
  info: {
    name: 'A_CUSTOM_NAME',
    icon: 'scenes_arrive_home',
  },
  type: 'userScene',
  actions: [
    {
      type: 'device',
      enabled: true,
      deviceId: 'YOUR_DEVICE_ID',
      attributes: {
        // ...
      },
    },
  ],
})

// triggered and ended by time schedule
const { id: timeTriggerSceneId } = await client.scenes.create({
  info: {
    name: 'A_CUSTOM_NAME',
    icon: 'scenes_arrive_home',
  },
  type: 'userScene',
  triggers: [
    {
      type: 'time',
      trigger: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // optional, defaults to every day
        time: '8:00',
      },
      // optional
      endTriggerEvent: {
        type: 'time',
        trigger: {
          time: '20:00',
        },
      },
    },
  ],
  actions: [
    {
      type: 'device',
      enabled: true,
      deviceId: 'YOUR_DEVICE_ID',
      attributes: {
        // ...
      },
    },
  ],
})

await client.scenese.delete({
  id: 'YOUR_SCENE_ID',
})

await client.scenes.update({
  id: 'YOUR_SCENE_ID',
  // ... all the fields from the create method
})
```

### [Music](./src/api/music.ts)

```typescript
const music = await client.music.get()
```

### [Users](./src/api/users.ts)

```typescript
const users = await client.users.list()

const currentUser = await client.users.getCurrentUser()

await client.users.setCurrentUserName({
  name: 'NEW_NAME',
})

await client.users.delete({
  id: 'YOUR_USER_ID',
})
```

### Update events

The gateway publishes events via a WebSocket. You can listen for these events with the following method:

```typescript
client.startListeningForUpdates(async (updateEvent) => {
  console.log(JSON.stringify(updateEvent))
})
```

For a list of available event types, check out [Event.ts](./src/types/event/Event.ts).
