import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Trello webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Trello webhook source. Answers the HEAD request Trello checks the callback URL with, verifies `X-Trello-Webhook` over the body and the registered callback URL (the `TRELLO_WEBHOOK_URL` variable), and names the event after the action's `type` (`createCard`, `updateCard`, ...), keyed by the action's `id`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'trello',
 *     secret: 'TRELLO_WEBHOOK_SECRET',
 *     method: ['head',  'post'],
 *     receive: ref('trello:trelloWebhookReceive'),
 *   })
 */
export const trelloWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Trello webhook and read it into trigger events',
  func: async ({ trelloWebhookSecret, variables }, { body, headers, method }) => {
    if (method.toLowerCase() === 'head') {
      return { respond: { status: 200 } }
    }
    const raw = new TextDecoder().decode(body)
    const url = (await variables.get('TRELLO_WEBHOOK_URL')) ?? ''
    trelloWebhookSecret.verifyHmac(headers['x-trello-webhook'], 'sha1', raw + url, 'base64')
    const data = parseJson(raw)
    return { events: [{ name: data.action.type, id: data.action.id, data }] }
  },
})
