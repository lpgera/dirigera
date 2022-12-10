import WebSocket from 'ws'

const PING_INTERVAL = 30000
const PONG_TIMEOUT = 1000

export function initializeWebSocket(ip: string, accessToken: string) {
  const ws = new WebSocket(`wss://${ip}:8443/v1`, {
    rejectUnauthorized: false,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  ws.on('open', () => {
    ws.ping()
  })

  let pongTimeout: NodeJS.Timeout | undefined

  ws.on('pong', () => {
    clearTimeout(pongTimeout)
    setTimeout(() => ws.ping(), PING_INTERVAL)
    pongTimeout = setTimeout(() => {
      ws.terminate()
    }, PING_INTERVAL + PONG_TIMEOUT)
  })

  ws.on('close', () => {
    throw new Error('WebSocket connection closed')
  })

  return ws
}
