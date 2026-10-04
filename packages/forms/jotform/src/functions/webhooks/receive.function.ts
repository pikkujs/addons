import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Jotform webhook source. Jotform signs nothing, so the webhook URL carries a token of your choosing (`/webhooks/jotform?token=...`). Each submission becomes a `submission` event keyed by its `submissionID`, with the answers parsed from `rawRequest`.
 */
export const jotformWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Jotform webhook into trigger events',
  func: async (_services, { body, headers }) => {
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
