import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Taiga webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Taiga webhook source. Verifies `X-TAIGA-WEBHOOK-SIGNATURE` over the raw body and names the event `<type>.<action>` (`userstory.create`, `issue.change`, ...).
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'taiga',
 *     receive: ref('taiga:taigaWebhookReceive'),
 *   })
 */
export const taigaWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Taiga webhook and read it into trigger events',
  func: async ({ taigaWebhookSecret }, { body, headers }) => {
    const signing = await taigaWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(headers['x-taiga-webhook-signature'], 'sha1', raw, 'hex')
    const data = parseJson(raw)
    return { events: [{ name: `${data.type}.${data.action}`, data }] }
  },
})
