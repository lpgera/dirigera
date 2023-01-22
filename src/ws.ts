import ReconnectingWebSocket from 'reconnecting-websocket'
import WebSocket from 'ws'

export function initializeWebSocket({
  ip,
  accessToken,
  callback,
}: {
  ip: string
  accessToken: string
  callback: (o: Object) => void | Promise<void>
}) {
  const ws = new ReconnectingWebSocket(`wss://${ip}:8443/v1`, [], {
    minReconnectionDelay: 10,
    maxReconnectionDelay: 10000,
    maxRetries: Number.MAX_SAFE_INTEGER,
    WebSocket: class extends WebSocket {
      constructor(url: string, protocols: string | string[]) {
        super(url, protocols, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          rejectUnauthorized: false,
        })
      }
    },
    debug: process.env['NODE_ENV'] === 'development',
  })

  ws.addEventListener('message', (message) => {
    callback(JSON.parse(String(message.data)))
  })
}
