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
 * The `receive` step of a WhatsApp webhook source. Answers Meta's verification GET (`hub.mode=subscribe`, `hub.verify_token`, `hub.challenge`), verifies `X-Hub-Signature-256` over the raw body, and turns each change into an event named after its `field` (`messages`, `message_template_status_update`, ...).
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'whatsapp',
 *     secret: 'WHATSAPP_APP_SECRET',
 *     method: ['get',  'post'],
 *     receive: ref('whatsapp:whatsappWebhookReceive'),
 *   })
 */
export const whatsappWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a WhatsApp webhook and read it into trigger events',
  func: async ({ whatsappWebhookSecret, variables }, { body, headers, method, query }) => {
    if (method.toLowerCase() === 'get') {
      const verifyToken = await variables.get('WHATSAPP_WEBHOOK_VERIFY_TOKEN')
      if (query['hub.mode'] !== 'subscribe' || !verifyToken || query['hub.verify_token'] !== verifyToken) {
        throw new UnauthorizedError('WhatsApp webhook verification failed')
      }
      return { respond: { status: 200, body: query['hub.challenge'] } }
    }
    const raw = new TextDecoder().decode(body)
    whatsappWebhookSecret.verifyHmac(
      headers['x-hub-signature-256']?.replace(/^sha256=/, ''),
      'sha256',
      raw,
      'hex'
    )
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
