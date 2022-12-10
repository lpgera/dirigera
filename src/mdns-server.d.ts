declare module 'mdns-server' {
  export default function createMdnsServer(
    options: {
      reuseAddr?: boolean
      interfaces?: string | string[]
      ttl?: number
      loopback?: boolean
      noInit?: boolean
    } = {}
  ): MdnsServer

  interface MdnsServer {
    on(event: 'ready', handler: () => void): MdnsServer
    on(event: 'response', handler: (response: Response) => void): MdnsServer
    on(event: 'error', handler: (e: Error) => void): MdnsServer

    initServer(): void
    query(options: Question[]): void
    destroy(): void
  }

  type Type = 'A' | 'AAAA' | 'PTR'

  interface Question {
    name: string
    type: Type
    class?: 'IN'
  }

  interface Response {
    id: number
    type: string
    flags: number
    opcode: string
    rcode: string
    questions: Question[]
    answers?: {
      name: string
      type: Type
      ttl: number
      class: string
      flush: boolean
      data: any
    }[]
  }
}
