import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Mandrill webhook body is not valid JSON')
  }
}
const parseForm = (raw: string): Record<string, string> =>
  Object.fromEntries(new URLSearchParams(raw))

/**
 * The `receive` step of a Mandrill webhook source. Verifies `X-Mandrill-Signature` over the registered URL (the `MANDRILL_WEBHOOK_URL` variable) and the posted `mandrill_events`. Mandrill batches events, so each becomes its own event, named after `event` (`send`, `open`, `hard_bounce`, ...). Mandrill checks the URL with a HEAD request when it is added, so wire the source with `method: ['head', 'post']` if your runtime routes HEAD, or add it while the endpoint is up.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'mandrill',
 *     secret: 'MANDRILL_WEBHOOK_KEY',
 *     receive: ref('mandrill:mandrillWebhookReceive'),
 *   })
 */
export const mandrillWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Mandrill webhook and read it into trigger events',
  func: async ({ mandrillWebhookSecret, variables }, { body, headers }) => {
    const form = parseForm(new TextDecoder().decode(body))
    const url = (await variables.get('MANDRILL_WEBHOOK_URL')) ?? ''
    const signed = Object.keys(form)
      .sort()
      .reduce((payload, key) => payload + key + form[key], url)
    mandrillWebhookSecret.verifyHmac(headers['x-mandrill-signature'], 'sha1', signed, 'base64')
    return {
      events: parseJson(form.mandrill_events ?? '[]').map((event: any) => ({
        name: event.event ?? event.type,
        id: event._id ? `${event._id}:${event.event}:${event.ts}` : undefined,
        data: event,
      })),
    }
  },
})
