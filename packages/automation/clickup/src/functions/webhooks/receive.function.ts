import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('ClickUp webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a ClickUp webhook source. Verifies `X-Signature` over the raw body and names the event after `event` (`taskCreated`, `taskUpdated`, ...).
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'clickup',
 *     receive: ref('clickup:clickupWebhookReceive'),
 *   })
 */
export const clickupWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a ClickUp webhook and read it into trigger events',
  func: async ({ clickupWebhookSecret }, { body, headers }) => {
    const signing = await clickupWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(headers['x-signature'], 'sha256', raw, 'hex')
    const data = parseJson(raw)
    return {
      events: [
        {
          name: data.event,
          id: data.history_items?.[0]?.id,
          data,
        },
      ],
    }
  },
})
