#!/usr/bin/env node

import { program } from 'commander'
import { createDirigeraClient } from './index'
import { version } from '../package.json'

program
  .version(version)
  .description(
    'CLI utility to help get started with the dirigera library and to debug issues'
  )

program
  .command('authenticate')
  .description('Get an authentication token from your gateway')
  .option(
    '--gateway-IP [string]',
    'Optional. Use if mDNS discovery is not working.'
  )
  .action(async (options: { gatewayIP?: string }) => {
    const client = await createDirigeraClient(options)

    const accessToken = await client.authenticate()

    console.log(`🔑 Your access token: ${accessToken}`)
  })

program
  .command('dump')
  .description('Dump a JSON of all device data from your gateway')
  .option(
    '--gateway-IP [string]',
    'Optional. Use if mDNS discovery is not working.'
  )
  .requiredOption(
    '--access-token <string>',
    `Get an access token by running 'dirigera authenticate' first!`
  )
  .action(async (options: { gatewayIP?: string; accessToken: string }) => {
    const client = await createDirigeraClient(options)

    const dump = await client.home()

    console.log(JSON.stringify(dump, null, 2))
  })

program.parse()
