import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Jotform webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Jotform webhook source. Jotform signs nothing, so the webhook URL carries a token of your choosing (`/webhooks/jotform?token=...`), compared here. Each submission becomes a `submission` event keyed by its `submissionID`, with the answers parsed from `rawRequest`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'jotform',
 *     secret: 'JOTFORM_WEBHOOK_TOKEN',
 *     receive: ref('jotform:jotformWebhookReceive'),
 *   })
 */
export const jotformWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Jotform webhook and read it into trigger events',
  func: async ({ jotformWebhookSecret }, { body, headers, query }) => {
    jotformWebhookSecret.verifyToken(query.token)
    const form = await new Response(body.slice(), {
      headers: { 'content-type': headers['content-type'] ?? '' },
    }).formData()
    const submissionId = form.get('submissionID')?.toString()
    return {
      events: [
        {
          name: 'submission',
          id: submissionId,
          data: {
            formId: form.get('formID')?.toString(),
            submissionId,
            answers: parseJson(form.get('rawRequest')?.toString() ?? '{}'),
          },
        },
      ],
    }
  },
})
