import crypto from 'node:crypto'
import ReconnectingWebSocket from 'reconnecting-websocket'
import WebSocket from 'ws'
import certificate from './certificate.ts'
import type { Event } from './types/event/Event.ts'

export function createWebSocketConnection({
  ip,
  accessToken,
  rejectUnauthorized,
  callback,
}: {
  ip: string
  accessToken: string
  rejectUnauthorized: boolean
  callback: (o: Event) => void | Promise<void>
}) {
  let pingInterval: NodeJS.Timeout | null = null

  const stopPinging = () => {
    if (pingInterval) {
      clearInterval(pingInterval)
      pingInterval = null
    }
  }

  // https://github.com/pladaria/reconnecting-websocket/issues/196
  const ws = new (ReconnectingWebSocket as any)(`wss://${ip}:8443/v1`, [], {
    minReconnectionDelay: 10,
    maxReconnectionDelay: 10000,
    maxRetries: Number.MAX_SAFE_INTEGER,
    WebSocket: class extends WebSocket {
      constructor(url: string, protocols: string | string[]) {
        super(url, protocols, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          ...(rejectUnauthorized
            ? {
                ca: [certificate],
                checkServerIdentity: () => undefined,
              }
            : { rejectUnauthorized: false }),
        })
      }
    },
    debug: process.env['NODE_ENV'] === 'development',
  }) as ReconnectingWebSocket.default

  ws.addEventListener('open', () => {
    stopPinging()
    pingInterval = setInterval(() => {
      ws.send(
        JSON.stringify({
          id: crypto.randomUUID(),
          specversion: '1.1.0',
          source: `urn:lpgera:dirigera`,
          time: new Date().toISOString(),
          type: 'ping',
          data: null,
        })
      )
    }, 30000)
  })

  ws.addEventListener('close', () => {
    stopPinging()
  })

  ws.addEventListener('error', (error) => {
    console.error('Dirigera websocket error:', error.message)
  })

  ws.addEventListener('message', (message) => {
    let event: Event
    try {
      event = JSON.parse(String(message.data))
    } catch (error) {
      console.error(
        'Dirigera websocket received an unparseable message:',
        error
      )
      return
    }

    try {
      void Promise.resolve(callback(event)).catch((error: unknown) => {
        console.error('Dirigera update callback failed:', error)
      })
    } catch (error) {
      console.error('Dirigera update callback failed:', error)
    }
  })

  return {
    close() {
      stopPinging()
      ws.close()
    },
  }
}
