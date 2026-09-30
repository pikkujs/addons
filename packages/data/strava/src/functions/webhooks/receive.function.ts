import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Strava webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Strava webhook source. Answers the subscription validation GET (`hub.verify_token`, `hub.challenge`). Strava signs no events, so a delivery is only a trigger to fetch the object from the API: it is named `<object_type>.<aspect_type>` (`activity.create`, `athlete.update`, ...).
 */
export const stravaWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Strava webhook and read it into trigger events',
  func: async ({ stravaWebhookSecret }, { body, method, query }) => {
    const signing = await stravaWebhookSecret.load()
    if (method.toLowerCase() === 'get') {
      signing.verifyToken(query['hub.verify_token'])
      return { respond: { status: 200, body: { 'hub.challenge': query['hub.challenge'] } } }
    }
    const data = parseJson(new TextDecoder().decode(body))
    return {
      events: [
        {
          name: `${data.object_type}.${data.aspect_type}`,
          id: `${data.object_type}:${data.object_id}:${data.aspect_type}:${data.event_time}`,
          data,
        },
      ],
    }
  },
})
