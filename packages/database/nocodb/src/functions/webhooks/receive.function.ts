import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('NocoDB webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a NocoDB webhook source. NocoDB signs nothing, so the webhook is given an `X-Webhook-Token` header, compared here. The event is named after `type` (`records.after.insert`, `records.after.update`, ...), keyed by `id`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'nocodb',
 *     receive: ref('nocodb:nocodbWebhookReceive'),
 *   })
 */
export const nocodbWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a NocoDB webhook and read it into trigger events',
  func: async ({ nocodbWebhookSecret }, { body, headers }) => {
    const signing = await nocodbWebhookSecret.load()
    signing.verifyToken(headers['x-webhook-token'])
    const data = parseJson(new TextDecoder().decode(body))
    return { events: [{ name: data.type, id: data.id, data }] }
  },
})
