import type {
  GatewayAdapter,
  GatewayInboundMessage,
  GatewayOutboundMessage,
  WebhookVerificationResult,
} from '@pikku/core/gateway'
import type { PikkuHTTPRequest } from '@pikku/core/http'
import { UnauthorizedError } from '@pikku/core/errors'
import type { WhatsappService } from './whatsapp-api.service.js'
import { verifyWhatsAppSignature } from './whatsapp-signature.js'

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
    private verifyToken: string,
    private appSecret: string
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
  async send(senderId: string, message: GatewayOutboundMessage): Promise<void> {
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
  async verifyWebhook(
    data: unknown,
    request?: PikkuHTTPRequest
  ): Promise<WebhookVerificationResult> {
    const query = (request?.query() ?? data ?? {}) as Record<string, any>
    // Pikku's query() dot-nests params (hub.mode -> { hub: { mode } }); raw
    // adapters may pass the flat shape — accept both.
    const hub = (query.hub ?? {}) as Record<string, any>
    const mode = query['hub.mode'] ?? hub.mode
    const token = query['hub.verify_token'] ?? hub.verify_token
    const challenge = query['hub.challenge'] ?? hub.challenge

    // The GET subscription handshake is not signed by Meta — there is no body
    // to sign, and hub.verify_token is itself the shared secret. Only message
    // deliveries carry X-Hub-Signature-256.
    if (mode === 'subscribe') {
      if (token === this.verifyToken) {
        return { verified: true, response: challenge }
      }
      return { verified: false }
    }

    await this.assertValidSignature(request)

    return { verified: false }
  }

  /**
   * Fail-closed signature check for message deliveries: no request access, a
   * missing header, or an HMAC mismatch all reject the request.
   *
   * The HMAC must be computed over the exact bytes Meta sent, so this reads the
   * raw body rather than re-serializing the parsed payload — key order and
   * whitespace would otherwise change the digest.
   */
  private async assertValidSignature(
    request?: PikkuHTTPRequest
  ): Promise<void> {
    if (!request) {
      throw new UnauthorizedError(
        'WhatsApp signature cannot be verified without HTTP request access'
      )
    }
    const signature = request.header('x-hub-signature-256')
    if (!signature) {
      throw new UnauthorizedError('Missing WhatsApp X-Hub-Signature-256 header')
    }
    const rawBody = new TextDecoder().decode(await request.arrayBuffer())
    if (!verifyWhatsAppSignature(this.appSecret, signature, rawBody)) {
      throw new UnauthorizedError('Invalid WhatsApp request signature')
    }
  }
}
