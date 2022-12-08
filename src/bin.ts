#!/usr/bin/env node

import { program } from 'commander'
import Dirigera from './index'
import { version } from '../package.json'

program
  .version(version)
  .description(
    'CLI utility to help get started with the dirigera library and to debug issues'
  )

program
  .command('authenticate')
  .description('Get an authentication token from your gateway')
  .requiredOption('--gateway-IP <string>')
  .action((options: { gatewayIP: string }) => {
    const client = new Dirigera(options)

    client.authenticate().catch((err) => console.error(err))
  })

program
  .command('dump')
  .description('Dump a JSON of all device data from your gateway')
  .requiredOption('--gateway-IP <string>')
  .requiredOption(
    '--access-token <string>',
    `Get an access token by running 'dirigera authenticate' first!`
  )
  .action(async (options: { gatewayIP: string; token: string }) => {
    const client = new Dirigera(options)

    const dump = await client.home()

    console.log(JSON.stringify(dump, null, 2))
  })

program.parse()
