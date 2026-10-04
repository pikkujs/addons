import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a SurveyMonkey webhook source. Names the event after `event_type` (`response_completed`, `collector_created`, ...), keyed by `event_id`.
 */
export const surveyMonkeyWebhookReceive = pikkuWebhookReceive({
  description: 'Read a SurveyMonkey webhook into trigger events',
  func: async (_services, { body }) => {
    const data = parseJson(body)
    return { events: [{ name: data.event_type, id: data.event_id, data }] }
  },
})
