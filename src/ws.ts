import WebSocket from 'ws'

function ping(ws: WebSocket) {
  console.debug(`${new Date().toISOString()} [ws] ping`)
  ws.ping()
}

function terminate(ws: WebSocket) {
  console.debug(`${new Date().toISOString()} [ws] terminating`)
  ws.terminate()
}

export function initializeWebSocket({
  ip,
  accessToken,
  pingInterval = 30000,
  pongTimeout = 120000,
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

  let pongTimeoutObject: NodeJS.Timeout | undefined

  ws.on('open', () => {
    console.debug(`${new Date().toISOString()} [ws] open`)
    ping(ws)
    setInterval(() => ping(ws), pingInterval)
    pongTimeoutObject = setTimeout(() => terminate(ws), pongTimeout)
  })

  ws.on('pong', () => {
    console.debug(`${new Date().toISOString()} [ws] pong`)
    clearTimeout(pongTimeoutObject)
    pongTimeoutObject = setTimeout(() => terminate(ws), pongTimeout)
  })

  ws.on('close', () => {
    throw new Error('WebSocket connection closed')
  })

  return ws
}
