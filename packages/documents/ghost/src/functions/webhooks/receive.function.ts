import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Ghost webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Ghost webhook source. Verifies `X-Ghost-Signature` (`sha256=..., t=...`) over `body + t`. Ghost leaves the event out of the payload, so the webhook URL names it (`/webhooks/ghost?event=post.published`).
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'ghost',
 *     secret: 'GHOST_WEBHOOK_SECRET',
 *     receive: ref('ghost:ghostWebhookReceive'),
 *   })
 */
export const ghostWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Ghost webhook and read it into trigger events',
  func: async ({ ghostWebhookSecret }, { body, headers, query }) => {
    const raw = new TextDecoder().decode(body)
    const fields = Object.fromEntries(
      (headers['x-ghost-signature'] ?? '')
        .split(', ')
        .map((field) => field.split('='))
    )
    ghostWebhookSecret.verifyHmac(fields.sha256, 'sha256', `${raw}${fields.t}`, 'hex')
    return { events: [{ name: query.event ?? '', data: parseJson(raw) }] }
  },
})
