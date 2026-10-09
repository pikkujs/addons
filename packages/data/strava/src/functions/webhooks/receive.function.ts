import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'
import { UnauthorizedError } from '@pikku/core/errors'
import { timingSafeStringEqual } from '@pikku/core/hmac'

/**
 * The `receive` step of a Strava webhook source. Answers the subscription validation GET (`hub.verify_token`, `hub.challenge`). Strava signs no events, so a delivery is only a trigger to fetch the object from the API: it is named `<object_type>.<aspect_type>` (`activity.create`, `athlete.update`, ...).
 */
export const stravaWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Strava webhook into trigger events',
  func: async ({ credentialService }, { body, method, query }, { http }) => {
    if (method.toLowerCase() === 'get') {
      const secret = await credentialService?.get<string>('stravaWebhookSecret')
      const token = query['hub.verify_token']
      if (typeof secret !== 'string' || !secret || !token || !timingSafeStringEqual(token, secret)) {
        throw new UnauthorizedError('Invalid Strava webhook verify token')
      }
      http.response.status(200).json({ 'hub.challenge': query['hub.challenge'] })
      return
    }
    const data = parseJson(body)
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
