import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Jira webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Jira webhook source. Names the event after `webhookEvent` (`jira:issue_created`, `comment_created`, ...), keyed by `X-Atlassian-Webhook-Identifier`.
 */
export const jiraWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Jira webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
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
