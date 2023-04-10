# Dirigera

A TypeScript client library for IKEA's DIRIGERA smart home hub.

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
    - [Lights](#lights)
    - [Motion sensors](#motion-sensors)
    - [Outlets](#outlets)
    - [Repeaters](#repeaters)
    - [Speakers](#speakers)
  - [Device sets](#device-sets)
  - [Rooms](#rooms)
  - [Scenes](#scenes)
  - [Music](#music)
  - [Users](#users)
  - [Update events](#update-events)

## Quick start

1. Execute `npx dirigera authenticate` in your terminal and follow the instructions.
2. Save the obtained access token.
3. Dump your Dirigera system's information as a JSON to identify device IDs:
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
   client.lights.setIsOn({
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

You'll be prompted to press the action button on the bottom of the gateway, then to press the Enter key. An access token
will be printed on your console afterwards.

Store the access token in a secure place, and never share it with anyone outside your household!

### Dump

Use the following command to dump a JSON from your gateway. This can be useful for adding support of new devices to the
library or to debug issues that may arise from device or gateway firmware changes.

```bash
npx dirigera dump --access-token YOUR_ACCESS_TOKEN
```

## Library

### Client

You can rely on mDNS discovery to connect to the gateway. This is convenient, however the initialization can take a
couple of seconds.

```typescript
const client = await createDirigeraClient({
  accessToken: 'YOUR_ACCESS_TOKEN',
})
```

Alternatively it's possible to explicitly set the gateway IP address.

```typescript
const client = await createDirigeraClient({
  gatewayIP: 'YOUR_GATEWAY_IP',
  accessToken: 'YOUR_ACCESS_TOKEN',
})
```

### [Hub](./src/api/hub.ts)

```typescript
const hubStatus = await client.hub.status()

await client.hub.checkFirmwareUpdate()

await client.hub.installFirmwareUpdate()
```

### [Devices](./src/api/devices.ts)

Generic device API which includes all subtypes. It's recommended to use the type-specific APIs instead.

```typescript
const devices = await client.devices.list()

await client.devices.setCustomName({
  id: 'YOUR_DEVICE_ID',
  customName: 'A_CUSTOM_NAME',
})

// Low level API
await client.devices.setAttributes({
  id: 'YOUR_DEVICE_ID',
  attributes: {
    // ...
  },
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
  fanMode: 'auto',
})

await client.airPurifiers.setFanMode({
  id: 'YOUR_DEVICE_ID',
  fanMode: 'off',
})
```

#### [Blinds](./src/api/blinds.ts)

```typescript
const blinds = await client.blinds.list()

const blind = await client.blinds.get({
  id: 'YOUR_DEVICE_ID',
})

await client.blinds.setTargetLevel({
  id: 'YOUR_DEVICE_ID',
  blindsTargetLevel: 60,
})

await client.blinds.setState({
  id: 'YOUR_DEVICE_ID',
  blindsState: 'stopped',
})
```

#### [Controllers](./src/api/controllers.ts)

```typescript
const controls = await client.controllers.list()

await client.controllers.setCustomName({
  id: 'YOUR_DEVICE_ID',
  customName: 'A_CUSTOM_NAME',
})
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
  lightLevel: 50,
  transition: 5000,
})

await client.lights.setLightColor({
  id: 'YOUR_DEVICE_ID',
  colorHue: 260,
  colorSaturation: 0.8,
})

await client.lights.setLightTemperature({
  id: 'YOUR_DEVICE_ID',
  colorTemperature: 2700,
})
```

#### [Motion sensors](./src/api/motionSensors.ts)

```typescript
const motionSensors = await client.motionSensors.list()

const motionSensor = await client.motionSensors.get({
  id: 'YOUR_DEVICE_ID',
})

await client.motionSensors.setOnDuration({
  id: 'YOUR_DEVICE_ID',
  onDuration: 300,
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
  volume: 20,
})

await client.speakers.setPlayback({
  id: 'YOUR_DEVICE_ID',
  playback: 'playbackPaused',
})
```

### [Device sets](./src/api/deviceSets.ts)

```typescript
const deviceSets = await client.deviceSets.list()

await client.deviceSets.setIsOn({
  id: 'YOUR_DEVICE_SET_ID',
  isOn: true,
})
```

### [Rooms](./src/api/rooms.ts)

```typescript
const rooms = await client.rooms.list()

const room = await client.rooms.get({
  id: 'YOUR_ROOM_ID',
})

await client.rooms.setIsOn({
  id: 'YOUR_ROOM_ID',
  isOn: false,
})

await client.rooms.setIsOn({
  id: 'YOUR_ROOM_ID',
  deviceType: 'outlet',
  isOn: true,
})
```

### [Scenes](./src/api/scenes.ts)

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

---

More coming soon!
