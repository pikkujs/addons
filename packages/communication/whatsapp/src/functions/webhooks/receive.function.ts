import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('WhatsApp webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a WhatsApp webhook source. Answers Meta's verification GET (`hub.mode=subscribe`, `hub.verify_token`, `hub.challenge`) and turns each change into an event named after its `field` (`messages`, `message_template_status_update`, ...).
 */
export const whatsappWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a WhatsApp webhook into trigger events',
  func: async ({ variables }, { body, headers, method, query }) => {
    if (method.toLowerCase() === 'get') {
      const verifyToken = await variables.get('WHATSAPP_WEBHOOK_VERIFY_TOKEN')
      if (query['hub.mode'] !== 'subscribe' || !verifyToken || query['hub.verify_token'] !== verifyToken) {
        throw new UnauthorizedError('WhatsApp webhook verification failed')
      }
      return { respond: { status: 200, body: query['hub.challenge'] } }
    }
    const raw = new TextDecoder().decode(body)
    return {
      events: (parseJson(raw).entry ?? []).flatMap((entry: any) =>
        (entry.changes ?? []).map((change: any) => ({
          name: change.field,
          data: { businessAccountId: entry.id, ...change.value },
        }))
      ),
    }
  },
})
