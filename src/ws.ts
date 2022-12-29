import WebSocket from 'ws'

export function initializeWebSocket({
  ip,
  accessToken,
  pingInterval = 30000,
  pongTimeout = 5000,
}: {
  ip: string
  accessToken: string
  pingInterval?: number
  pongTimeout?: number
}) {
  const ws = new WebSocket(`wss://${ip}:8443/v1`, {
    rejectUnauthorized: false,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  ws.on('open', () => {
    ws.ping()
  })

  let pongTimeoutObject: NodeJS.Timeout | undefined

  ws.on('pong', () => {
    clearTimeout(pongTimeoutObject)
    setTimeout(() => ws.ping(), pingInterval)
    pongTimeoutObject = setTimeout(() => {
      ws.terminate()
    }, pingInterval + pongTimeout)
  })

  ws.on('close', () => {
    throw new Error('WebSocket connection closed')
  })

  return ws
}
