import type {
  GatewayAdapter,
  GatewayInboundMessage,
  GatewayOutboundMessage,
} from '@pikku/core/gateway'
import type { BaileysAdapterOptions } from './baileys.types.js'
import { useMultiFileAuthState } from '@whiskeysockets/baileys'
import makeWASocket from '@whiskeysockets/baileys'
import qrcode from 'qrcode-terminal'

/**
 * Baileys-based WhatsApp gateway adapter (listener type).
 *
 * Uses the unofficial @whiskeysockets/baileys library to connect
 * as a linked device — authenticate by scanning a QR code with
 * your personal WhatsApp account.
 *
 * Usage:
 * ```ts
 * import { BaileysGatewayAdapter } from '@pikku/addon-whatsapp'
 * import { LocalGatewayService } from '@pikku/core/services'
 *
 * const adapter = new BaileysGatewayAdapter({ auth: '.baileys-auth' })
 * wireGateway({ name: 'baileys', type: 'listener', adapter, func: handler })
 *
 * const gatewayService = new LocalGatewayService()
 * await gatewayService.start()
 * ```
 */
export class BaileysGatewayAdapter implements GatewayAdapter {
  readonly name = 'baileys'

  private sock: any = null
  private sentMessageIds = new Set<string>()
  private options: BaileysAdapterOptions

  constructor(options: BaileysAdapterOptions = {}) {
    this.options = options
  }

  /**
   * Parse a Baileys messages.upsert event item into a GatewayInboundMessage.
   * Returns null for messages that should be ignored (bot's own replies, status broadcasts, empty).
   */
  parse(data: unknown): GatewayInboundMessage | null {
    const msg = data as Record<string, any>
    if (!msg?.key || !msg.message) {
      return null
    }

    // Skip our own messages (prevents echo loops and self-processing)
    if (msg.key.fromMe) {
      return null
    }

    // Skip status broadcast messages
    if (msg.key.remoteJid === 'status@broadcast') {
      return null
    }

    const senderId = msg.key.remoteJid as string
    const message = msg.message

    // Skip protocol/system messages (key exchange, history sync, etc.)
    if (message.protocolMessage || message.senderKeyDistributionMessage) {
      return null
    }

    // Extract text content from various message types
    let text: string
    if (message.conversation) {
      text = message.conversation
    } else if (message.extendedTextMessage?.text) {
      text = message.extendedTextMessage.text
    } else if (message.imageMessage?.caption) {
      text = message.imageMessage.caption
    } else if (message.videoMessage?.caption) {
      text = message.videoMessage.caption
    } else if (message.documentMessage?.caption) {
      text = message.documentMessage.caption
    } else {
      // Determine message type for non-text messages
      const typeKey = Object.keys(message).find(
        (k) => k !== 'messageContextInfo' && k.endsWith('Message')
      )
      text = typeKey ? `[${typeKey}]` : '[unknown]'
    }

    return {
      senderId,
      text,
      raw: msg,
      metadata: {
        messageId: msg.key.id,
        participant: msg.key.participant,
        pushName: msg.pushName,
      },
    }
  }

  /**
   * Send a message to a WhatsApp user via Baileys.
   */
  async send(
    senderId: string,
    message: GatewayOutboundMessage
  ): Promise<void> {
    if (!this.sock) {
      throw new Error('Baileys adapter is not connected')
    }

    if (message.text) {
      const result = await this.sock.sendMessage(senderId, { text: message.text })
      if (result?.key?.id) this.sentMessageIds.add(result.key.id)
    }

    if (message.richContent) {
      const result = await this.sock.sendMessage(senderId, message.richContent)
      if (result?.key?.id) this.sentMessageIds.add(result.key.id)
    }

    if (message.attachments) {
      for (const attachment of message.attachments) {
        const media: Record<string, unknown> = {}

        if (attachment.url) {
          media.url = attachment.url
        } else if (attachment.data) {
          media.stream = attachment.data
        }

        if (attachment.filename) {
          media.fileName = attachment.filename
        }
        if (attachment.mimeType) {
          media.mimetype = attachment.mimeType
        }

        // Map attachment type to Baileys message type
        const type = attachment.type ?? 'document'
        const result = await this.sock.sendMessage(senderId, { [type]: media })
        if (result?.key?.id) this.sentMessageIds.add(result.key.id)
      }
    }
  }

  /**
   * Initialize the adapter: resolve auth state and start the Baileys socket.
   * Called by the framework via `GatewayService.start()`.
   */
  async init(onMessage: (data: unknown) => Promise<void>): Promise<void> {
    const { auth: authOption, onQR, ...rest } = this.options

    // Resolve auth state
    let auth: { state: any; saveCreds: () => Promise<void> }
    if (!authOption || typeof authOption === 'string') {
      auth = await useMultiFileAuthState(authOption || '.baileys-auth')
    } else {
      auth = authOption
    }

    this.startSocket(auth, onQR, onMessage, rest)
  }

  /**
   * Disconnect the Baileys socket.
   */
  async close(): Promise<void> {
    if (this.sock) {
      this.sock.end(undefined)
      this.sock = null
    }
  }

  /** Whether the adapter currently has an active connection. */
  get connected(): boolean {
    return this.sock !== null
  }

  private startSocket(
    auth: { state: any; saveCreds: () => Promise<void> },
    onQR: ((qr: string) => void) | undefined,
    onMessage: (data: unknown) => Promise<void>,
    extraConfig: Record<string, unknown>
  ): void {
    const sock = makeWASocket({
      auth: auth.state,
      printQRInTerminal: false,
      version: [2, 3000, 1033893291],
      ...(extraConfig as any),
    })

    sock.ev.on('creds.update', auth.saveCreds)

    sock.ev.on(
      'messages.upsert',
      async (upsert: { messages: unknown[]; type: string }) => {
        if (upsert.type !== 'notify') return
        for (const msg of upsert.messages) {
          await onMessage(msg)
        }
      }
    )

    sock.ev.on(
      'connection.update',
      (update: {
        connection?: string
        qr?: string
        lastDisconnect?: { error?: any }
      }) => {
        if (update.qr) {
          if (onQR) {
            onQR(update.qr)
          } else {
            qrcode.generate(update.qr, { small: true })
          }
        }

        if (update.connection === 'close') {
          const statusCode =
            update.lastDisconnect?.error?.output?.statusCode
          // DisconnectReason.loggedOut === 401
          if (statusCode !== 401) {
            // Reconnect
            this.sock = null
            this.startSocket(auth, onQR, onMessage, extraConfig)
          } else {
            this.sock = null
          }
        } else if (update.connection === 'open') {
          this.sock = sock
        }
      }
    )

    this.sock = sock
  }
}
