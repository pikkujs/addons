import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'
import { UnauthorizedError } from '@pikku/core/errors'

/**
 * The `receive` step of a WhatsApp webhook source. Answers Meta's verification GET (`hub.mode=subscribe`, `hub.verify_token`, `hub.challenge`) and turns each change into an event named after its `field` (`messages`, `message_template_status_update`, ...).
 */
export const whatsappWebhookReceive = pikkuWebhookReceive({
  description: 'Read a WhatsApp webhook into trigger events',
  func: async ({ variables }, { body, headers, method, query }, { http }) => {
    if (method.toLowerCase() === 'get') {
      const verifyToken = await variables.get('WHATSAPP_WEBHOOK_VERIFY_TOKEN')
      if (query['hub.mode'] !== 'subscribe' || !verifyToken || query['hub.verify_token'] !== verifyToken) {
        throw new UnauthorizedError('WhatsApp webhook verification failed')
      }
      http.response.status(200).arrayBuffer(query['hub.challenge'])
      return
    }
    return {
      events: (parseJson(body).entry ?? []).flatMap((entry: any) =>
        (entry.changes ?? []).map((change: any) => ({
          name: change.field,
          data: { businessAccountId: entry.id, ...change.value },
        }))
      ),
    }
  },
})
