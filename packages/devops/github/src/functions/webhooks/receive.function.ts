import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('GitHub webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a GitHub webhook source. Verifies `X-Hub-Signature-256` over the raw body and names the event after `X-GitHub-Event` (`push`, `issues`, `pull_request`, ...), keyed by `X-GitHub-Delivery`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'github',
 *     secret: 'GITHUB_WEBHOOK_SECRET',
 *     receive: ref('github:githubWebhookReceive'),
 *   })
 */
export const githubWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a GitHub webhook and read it into trigger events',
  func: async ({ githubWebhookSecret }, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    githubWebhookSecret.verifyHmac(
      headers['x-hub-signature-256']?.replace(/^sha256=/, ''),
      'sha256',
      raw,
      'hex'
    )
    const name = headers['x-github-event']
    if (!name) {
      throw new BadRequestError('Missing X-GitHub-Event header')
    }
    return {
      events: [{ name, id: headers['x-github-delivery'], data: parseJson(raw) }],
    }
  },
})
