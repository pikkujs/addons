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
 * The `receive` step of a Jira webhook source. Verifies `X-Hub-Signature` over the raw body and names the event after `webhookEvent` (`jira:issue_created`, `comment_created`, ...), keyed by `X-Atlassian-Webhook-Identifier`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'jira',
 *     receive: ref('jira:jiraWebhookReceive'),
 *   })
 */
export const jiraWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Jira webhook and read it into trigger events',
  func: async ({ jiraWebhookSecret }, { body, headers }) => {
    const signing = await jiraWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(
      headers['x-hub-signature']?.replace(/^sha256=/, ''),
      'sha256',
      raw,
      'hex'
    )
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
