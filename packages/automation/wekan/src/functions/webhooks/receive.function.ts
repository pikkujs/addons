import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Wekan webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Wekan webhook source. Wekan signs nothing, so the outgoing webhook URL carries a token of your choosing (`/webhooks/wekan?token=...`). The event is named after the activity's `description` (`act-createCard`, `act-moveCard`, ...).
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'wekan',
 *     secret: 'WEKAN_WEBHOOK_TOKEN',
 *     receive: ref('wekan:wekanWebhookReceive'),
 *   })
 */
export const wekanWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Wekan webhook and read it into trigger events',
  func: async ({ wekanWebhookSecret }, { body, query }) => {
    wekanWebhookSecret.verifyToken(query.token)
    const data = parseJson(new TextDecoder().decode(body))
    return { events: [{ name: data.description ?? '', data }] }
  },
})
