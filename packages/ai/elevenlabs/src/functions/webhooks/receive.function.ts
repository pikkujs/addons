import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('ElevenLabs webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a ElevenLabs webhook source. Verifies `ElevenLabs-Signature` (`t=...,v0=...`) over `t.body`, refuses deliveries more than thirty minutes old, and names the event after `type` (`post_call_transcription`, ...).
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'elevenlabs',
 *     receive: ref('elevenlabs:elevenlabsWebhookReceive'),
 *   })
 */
export const elevenlabsWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a ElevenLabs webhook and read it into trigger events',
  func: async ({ elevenlabsWebhookSecret }, { body, headers }) => {
    const signing = await elevenlabsWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    const fields = Object.fromEntries(
      (headers['elevenlabs-signature'] ?? '').split(',').map((field) => field.split('='))
    )
    if (!fields.t || Math.abs(Date.now() / 1000 - Number(fields.t)) > 1800) {
      throw new UnauthorizedError('Stale or unsigned ElevenLabs webhook')
    }
    signing.verifyHmac(fields.v0, 'sha256', `${fields.t}.${raw}`, 'hex')
    const data = parseJson(raw)
    return { events: [{ name: data.type, data: data.data ?? data }] }
  },
})
