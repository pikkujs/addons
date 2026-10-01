import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('GitLab webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a GitLab webhook source. Compares `X-Gitlab-Token` with the configured token and names the event after the payload's `object_kind` (`push`, `merge_request`, `issue`, `note`, `pipeline`, ...), keyed by `X-Gitlab-Event-UUID`.
 */
export const gitlabWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a GitLab webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(new TextDecoder().decode(body))
    if (typeof data.object_kind !== 'string') {
      throw new BadRequestError("GitLab webhook is missing 'object_kind'")
    }
    return {
      events: [{ name: data.object_kind, id: headers['x-gitlab-event-uuid'], data }],
    }
  },
})
