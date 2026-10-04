import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a ElevenLabs webhook source. Names the event after `type` (`post_call_transcription`, ...).
 */
export const elevenlabsWebhookReceive = pikkuWebhookReceive({
  description: 'Read a ElevenLabs webhook into trigger events',
  func: async (_services, { body }) => {
    const data = parseJson(body)
    return { events: [{ name: data.type, data: data.data ?? data }] }
  },
})
