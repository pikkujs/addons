import { pikkuWebhookReceive } from '#pikku/addon/trigger'

/**
 * The `receive` step of a Google Calendar webhook source. Google push channels send the change in headers with no body: it compares `X-Goog-Channel-Token` with the token given when the channel was opened and names the event after `X-Goog-Resource-State` (`sync` when the channel opens, then `exists`, `not_exists`, ...), keyed by channel and message number. The consumer lists changes to see what.
 */
export const googleCalendarWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Google Calendar webhook into trigger events',
  func: async (_services, { headers }) => {
    const channelId = headers['x-goog-channel-id']
    return {
      events: [
        {
          name: headers['x-goog-resource-state'] ?? '',
          id: `${channelId}:${headers['x-goog-message-number']}`,
          data: {
            channelId,
            resourceId: headers['x-goog-resource-id'],
            resourceUri: headers['x-goog-resource-uri'],
            changed: headers['x-goog-changed'],
            expiration: headers['x-goog-channel-expiration'],
          },
        },
      ],
    }
  },
})
