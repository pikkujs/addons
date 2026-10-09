import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'
import { BadRequestError } from '@pikku/core/errors'

/**
 * The `receive` step of a GitHub webhook source. Names the event after `X-GitHub-Event` (`push`, `issues`, `pull_request`, ...), keyed by `X-GitHub-Delivery`.
 */
export const githubWebhookReceive = pikkuWebhookReceive({
  description: 'Read a GitHub webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const name = headers['x-github-event']
    if (!name) {
      throw new BadRequestError('Missing X-GitHub-Event header')
    }
    return {
      events: [{ name, id: headers['x-github-delivery'], data: parseJson(body) }],
    }
  },
})
