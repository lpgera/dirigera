import createMdnsServer from 'mdns-server'

const name = '_ihsp._tcp.local.'

export const discoverGatewayIP = async (
  timeoutMilliseconds = 10000
): Promise<string> => {
  const mdnsServer = createMdnsServer({
    reuseAddr: true,
    loopback: false,
    noInit: true,
  })

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      rejectWithError(
        new Error(
          'Gateway discovery timed out. Try specifying the gateway IP address explicitly.'
        )
      )
    }, timeoutMilliseconds)

    const resolveWithValue = (value: string) => {
      clearTimeout(timeout)
      mdnsServer.destroy()
      resolve(value)
    }
    const rejectWithError = (error: Error) => {
      clearTimeout(timeout)
      mdnsServer.destroy()
      reject(error)
    }

    mdnsServer.on('response', (response) => {
      const ipv4 = response?.answers?.find((a) => a.type === 'A')?.data
      if (ipv4) {
        return resolveWithValue(ipv4)
      }

      const ipv6 = response?.answers?.find((a) => a.type === 'AAAA')?.data
      if (ipv6) {
        return resolveWithValue(`[${ipv6}]`)
      }
    })

    mdnsServer.on('ready', () => {
      mdnsServer.query([
        { name, type: 'A' },
        { name, type: 'AAAA' },
        { name, type: 'PTR' },
      ])
    })

    mdnsServer.on('error', rejectWithError)

    mdnsServer.initServer()
  })
}
