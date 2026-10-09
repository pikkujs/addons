import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

const parseForm = (raw: string): Record<string, string> =>
  Object.fromEntries(new URLSearchParams(raw))

/**
 * The `receive` step of a Formstack webhook source. Compares the payload's `HandshakeKey` with the configured key. Each submission, sent as JSON or form fields, becomes a `submission` event keyed by its `UniqueID`.
 */
export const formstackWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Formstack webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    const { HandshakeKey: _, ...data } = headers['content-type']?.includes('json')
      ? parseJson(body)
      : parseForm(raw)
    return { events: [{ name: 'submission', id: data.UniqueID, data }] }
  },
})
