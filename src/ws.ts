import ReconnectingWebSocket from 'reconnecting-websocket'
import WebSocket from 'ws'
import crypto from 'crypto'

let ws: ReconnectingWebSocket | null = null
let timer: NodeJS.Timer | null = null

export function initializeWebSocket({
  ip,
  accessToken,
  callback,
}: {
  ip: string
  accessToken: string
  callback: (o: Object) => void | Promise<void>
}) {
  ws = new ReconnectingWebSocket(`wss://${ip}:8443/v1`, [], {
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

  timer = setInterval(() => {
    ws?.send(
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
}

export function closeWebSocket() {
  ws?.close()
  if (timer) {
    clearInterval(timer)
  }
}
