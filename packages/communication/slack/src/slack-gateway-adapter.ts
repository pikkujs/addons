import type {
  GatewayAdapter,
  GatewayInboundMessage,
  GatewayOutboundMessage,
  WebhookVerificationResult,
} from '@pikku/core/gateway'
import type { SlackService } from './slack-api.service.js'

/**
 * Slack Events API gateway adapter.
 *
 * Handles:
 * - Parsing Slack event payloads into normalized GatewayInboundMessage
 * - Sending messages back via the Slack Web API
 * - POST-based url_verification challenges
 */
export class SlackGatewayAdapter implements GatewayAdapter {
  readonly name = 'slack'

  constructor(private slack: SlackService) {}

  /**
   * Parse a Slack Events API payload into a GatewayInboundMessage.
   * Returns null for non-message events (channel_join, reaction_added, etc.)
   */
  parse(data: unknown): GatewayInboundMessage | null {
    const payload = data as Record<string, any>

    // Skip url_verification events (handled by verifyWebhook)
    if (payload?.type === 'url_verification') {
      return null
    }

    // Only handle event_callback type
    if (payload?.type !== 'event_callback') {
      return null
    }

    const event = payload.event
    if (!event) {
      return null
    }

    // Only handle message events (not subtypes like message_changed, bot_message, etc.)
    if (event.type !== 'message' || event.subtype) {
      return null
    }

    // Skip bot messages to avoid loops
    if (event.bot_id) {
      return null
    }

    return {
      senderId: event.user,
      text: event.text ?? '',
      raw: payload,
      metadata: {
        channel: event.channel,
        ts: event.ts,
        threadTs: event.thread_ts,
        teamId: payload.team_id,
        eventId: payload.event_id,
      },
    }
  }

  /**
   * Send a message to a Slack channel.
   * Uses the channel from the original message metadata.
   */
  async send(
    senderId: string,
    message: GatewayOutboundMessage
  ): Promise<void> {
    const body: Record<string, any> = {
      channel: senderId,
    }

    if (message.text) {
      body.text = message.text
    }

    if (message.richContent) {
      // Slack-specific: blocks, attachments, etc.
      if (message.richContent.blocks) {
        body.blocks = message.richContent.blocks
      }
      if (message.richContent.thread_ts) {
        body.thread_ts = message.richContent.thread_ts
      }
      if (message.richContent.attachments) {
        body.attachments = message.richContent.attachments
      }
    }

    await this.slack.request('POST', 'chat.postMessage', { body })
  }

  /**
   * Handle Slack url_verification POST.
   *
   * Slack sends a POST with:
   *   { "type": "url_verification", "challenge": "abc123", "token": "..." }
   *
   * We must respond with: { "challenge": "abc123" }
   */
  verifyWebhook(data: unknown): WebhookVerificationResult {
    const payload = data as Record<string, any>

    if (payload?.type === 'url_verification' && payload.challenge) {
      return {
        verified: true,
        response: { challenge: payload.challenge },
      }
    }

    return { verified: false }
  }
}
