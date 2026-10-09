import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Jira webhook source. Names the event after `webhookEvent` (`jira:issue_created`, `comment_created`, ...), keyed by `X-Atlassian-Webhook-Identifier`.
 */
export const jiraWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Jira webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
    return {
      events: [
        {
          name: String(data.webhookEvent),
          id: headers['x-atlassian-webhook-identifier'],
          data,
        },
      ],
    }
  },
})
