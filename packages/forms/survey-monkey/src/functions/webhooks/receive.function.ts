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
 * The `receive` step of a SurveyMonkey webhook source. Verifies `Sm-Signature` over the raw body and names the event after `event_type` (`response_completed`, `collector_created`, ...), keyed by `event_id`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'survey-monkey',
 *     secret: 'SURVEY_MONKEY_WEBHOOK_KEY',
 *     receive: ref('survey-monkey:surveyMonkeyWebhookReceive'),
 *   })
 */
export const surveyMonkeyWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a SurveyMonkey webhook and read it into trigger events',
  func: async ({ surveyMonkeyWebhookSecret }, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    surveyMonkeyWebhookSecret.verifyHmac(headers['sm-signature'], 'sha1', raw, 'base64')
    const data = parseJson(raw)
    return { events: [{ name: data.event_type, id: data.event_id, data }] }
  },
})
