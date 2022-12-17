# Dirigera

A TypeScript client library for IKEA's DIRIGERA smart home hub.

> 🚧 This project is in an early phase with a limited feature set and a very unstable API.

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

### Create a client instance

```typescript
const client = await createDirigeraClient({
  accessToken: 'YOUR_ACCESS_TOKEN',
})
```

Or by explicitly setting the gateway IP address:

```typescript
const client = await createDirigeraClient({
  gatewayIP: 'YOUR_GATEWAY_IP',
  accessToken: 'YOUR_ACCESS_TOKEN',
})
```

### Listen for update events

The gateway publishes events via a WebSocket. You can listen for these events with the following method:

```typescript
client.startListeningForUpdates(async (updateEvent) => {
  console.log(JSON.stringify(updateEvent))
})
```

### Lights

```typescript
const lights = await client.lights.list()

const light = await client.lights.get({ id: 'YOUR_DEVICE_ID' })

await client.lights.setIsOn({
  id: 'YOUR_DEVICE_ID',
  isOn: false,
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

### Outlets

```typescript
const outlets = await client.outlets.list()

const outlet = await client.outlets.get({ id: 'YOUR_DEVICE_ID' })

await client.outlets.setIsOn({
  id: 'YOUR_DEVICE_ID',
  isOn: false,
})
```

---

More coming soon!
