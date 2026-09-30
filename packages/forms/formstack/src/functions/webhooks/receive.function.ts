import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Formstack webhook body is not valid JSON')
  }
}
const parseForm = (raw: string): Record<string, string> =>
  Object.fromEntries(new URLSearchParams(raw))

/**
 * The `receive` step of a Formstack webhook source. Compares the payload's `HandshakeKey` with the configured key. Each submission, sent as JSON or form fields, becomes a `submission` event keyed by its `UniqueID`.
 */
export const formstackWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Formstack webhook and read it into trigger events',
  func: async ({ formstackWebhookSecret }, { body, headers }) => {
    const signing = await formstackWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    const { HandshakeKey, ...data } = headers['content-type']?.includes('json')
      ? parseJson(raw)
      : parseForm(raw)
    signing.verifyToken(HandshakeKey)
    return { events: [{ name: 'submission', id: data.UniqueID, data }] }
  },
})
