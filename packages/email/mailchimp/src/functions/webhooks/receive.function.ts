import { pikkuSessionlessFunc } from '#pikku/addon/function'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseForm = (raw: string): Record<string, string> =>
  Object.fromEntries(new URLSearchParams(raw))

/**
 * The `receive` step of a Mailchimp webhook source. Answers the GET Mailchimp checks the URL with. Mailchimp signs nothing, so the webhook URL carries a token of your choosing (`/webhooks/mailchimp?token=...`), compared here. The event is named after `type` (`subscribe`, `unsubscribe`, `profile`, `upemail`, `cleaned`, `campaign`), with the form's `data[...]` fields in the data.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'mailchimp',
 *     method: ['get',  'post'],
 *     receive: ref('mailchimp:mailchimpWebhookReceive'),
 *   })
 */
export const mailchimpWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Mailchimp webhook and read it into trigger events',
  func: async ({ mailchimpWebhookSecret }, { body, method, query }) => {
    const signing = await mailchimpWebhookSecret.load()
    if (method.toLowerCase() === 'get') {
      return { respond: { status: 200 } }
    }
    signing.verifyToken(query.token)
    const { type = '', fired_at, ...fields } = parseForm(new TextDecoder().decode(body))
    return {
      events: [
        {
          name: type,
          id: `${type}:${fields['data[id]'] ?? fields['data[email]']}:${fired_at}`,
          data: { type, fired_at, ...fields },
        },
      ],
    }
  },
})
