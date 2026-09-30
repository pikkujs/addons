import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Storyblok webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Storyblok webhook source. Verifies `Webhook-Signature` over the raw body and names the event `<action>` (`published`, `unpublished`, `deleted`, ...), as Storyblok sends it.
 */
export const storyblokWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Storyblok webhook and read it into trigger events',
  func: async ({ storyblokWebhookSecret }, { body, headers }) => {
    const signing = await storyblokWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(headers['webhook-signature'], 'sha1', raw, 'hex')
    const data = parseJson(raw)
    return { events: [{ name: data.action, data }] }
  },
})
