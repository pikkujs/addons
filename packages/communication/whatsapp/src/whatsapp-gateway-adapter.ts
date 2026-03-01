import type {
  GatewayAdapter,
  GatewayInboundMessage,
  GatewayOutboundMessage,
  WebhookVerificationResult,
} from '@pikku/core/gateway'
import type { PikkuHTTPRequest } from '@pikku/core/http'
import type { WhatsappService } from './whatsapp-api.service.js'

/**
 * WhatsApp Cloud API gateway adapter.
 *
 * Handles:
 * - Parsing Meta webhook payloads into normalized GatewayInboundMessage
 * - Sending messages back via the WhatsApp Cloud API
 * - GET webhook verification challenges
 */
export class WhatsAppGatewayAdapter implements GatewayAdapter {
  readonly name = 'whatsapp'

  constructor(
    private whatsapp: WhatsappService,
    private verifyToken: string
  ) {}

  async init(_onMessage: (data: unknown) => Promise<void>): Promise<void> {
    // Webhook adapters don't manage their own connection
  }

  async close(): Promise<void> {
    // Webhook adapters have no connection to close
  }

  /**
   * Parse a Meta webhook payload into a GatewayInboundMessage.
   * Returns null for non-message events (delivery receipts, status updates, etc.)
   */
  parse(data: unknown): GatewayInboundMessage | null {
    const payload = data as Record<string, any>

    if (payload?.object !== 'whatsapp_business_account') {
      return null
    }

    const entry = payload.entry?.[0]
    const change = entry?.changes?.[0]
    if (change?.field !== 'messages') {
      return null
    }

    const value = change.value
    const message = value?.messages?.[0]
    if (!message) {
      return null
    }

    const senderId = message.from
    const contact = value.contacts?.[0]

    // Extract text content based on message type
    let text = ''
    switch (message.type) {
      case 'text':
        text = message.text?.body ?? ''
        break
      case 'interactive':
        text =
          message.interactive?.button_reply?.title ??
          message.interactive?.list_reply?.title ??
          ''
        break
      case 'button':
        text = message.button?.text ?? ''
        break
      default:
        text = `[${message.type}]`
        break
    }

    return {
      senderId,
      text,
      raw: payload,
      metadata: {
        messageId: message.id,
        timestamp: message.timestamp,
        messageType: message.type,
        contactName: contact?.profile?.name,
        phoneNumberId: value.metadata?.phone_number_id,
      },
    }
  }

  /**
   * Send a message to a WhatsApp user via the Cloud API.
   */
  async send(
    senderId: string,
    message: GatewayOutboundMessage
  ): Promise<void> {
    if (message.text) {
      await this.whatsapp.request(
        'POST',
        `${this.whatsapp.phoneNumberId}/messages`,
        {
          body: {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: senderId,
            type: 'text',
            text: { body: message.text },
          },
        }
      )
    }

    if (message.richContent) {
      await this.whatsapp.request(
        'POST',
        `${this.whatsapp.phoneNumberId}/messages`,
        {
          body: {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: senderId,
            ...message.richContent,
          },
        }
      )
    }
  }

  /**
   * Handle WhatsApp webhook verification (GET challenge).
   *
   * Meta sends a GET with query params:
   *   hub.mode=subscribe
   *   hub.verify_token=<your_verify_token>
   *   hub.challenge=<challenge_string>
   *
   * We must echo back hub.challenge if the token matches.
   */
  verifyWebhook(
    data: unknown,
    request?: PikkuHTTPRequest
  ): WebhookVerificationResult {
    const query = (request?.query() ?? data ?? {}) as Record<string, any>
    const mode = query['hub.mode']
    const token = query['hub.verify_token']
    const challenge = query['hub.challenge']

    if (mode === 'subscribe' && token === this.verifyToken) {
      return { verified: true, response: challenge }
    }

    return { verified: false }
  }
}
