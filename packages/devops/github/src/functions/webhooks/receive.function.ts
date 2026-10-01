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
 * The `receive` step of a GitHub webhook source. Names the event after `X-GitHub-Event` (`push`, `issues`, `pull_request`, ...), keyed by `X-GitHub-Delivery`.
 */
export const githubWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a GitHub webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    const name = headers['x-github-event']
    if (!name) {
      throw new BadRequestError('Missing X-GitHub-Event header')
    }
    return {
      events: [{ name, id: headers['x-github-delivery'], data: parseJson(raw) }],
    }
  },
})
