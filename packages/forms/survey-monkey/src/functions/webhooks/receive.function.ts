import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('SurveyMonkey webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a SurveyMonkey webhook source. Answers the HEAD request SurveyMonkey checks the URL with, then verifies `Sm-Signature` over the raw body and names the event after `event_type` (`response_completed`, `collector_created`, ...), keyed by `event_id`.
 */
export const surveyMonkeyWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a SurveyMonkey webhook and read it into trigger events',
  func: async ({ surveyMonkeyWebhookSecret }, { body, headers, method }) => {
    const signing = await surveyMonkeyWebhookSecret.load()
    if (method.toLowerCase() === 'head') {
      return { respond: { status: 200 } }
    }
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(headers['sm-signature'], 'sha1', raw, 'base64')
    const data = parseJson(raw)
    return { events: [{ name: data.event_type, id: data.event_id, data }] }
  },
})
