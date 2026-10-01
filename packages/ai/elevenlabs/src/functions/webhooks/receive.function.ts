import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('ElevenLabs webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a ElevenLabs webhook source. Names the event after `type` (`post_call_transcription`, ...).
 */
export const elevenlabsWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a ElevenLabs webhook into trigger events',
  func: async (_services, { body }) => {
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    return { events: [{ name: data.type, data: data.data ?? data }] }
  },
})
