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
npx dirigera authenticate --access-token YOUR_ACCESS_TOKEN
```

## Library

Coming soon!
