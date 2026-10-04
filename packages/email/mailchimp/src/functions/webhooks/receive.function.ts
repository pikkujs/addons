import { pikkuWebhookReceive } from '#pikku/addon/trigger'

const parseForm = (raw: string): Record<string, string> =>
  Object.fromEntries(new URLSearchParams(raw))

/**
 * The `receive` step of a Mailchimp webhook source. Answers the GET Mailchimp checks the URL with. Mailchimp signs nothing, so the webhook URL carries a token of your choosing (`/webhooks/mailchimp?token=...`). The event is named after `type` (`subscribe`, `unsubscribe`, `profile`, `upemail`, `cleaned`, `campaign`), with the form's `data[...]` fields in the data.
 */
export const mailchimpWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Mailchimp webhook into trigger events',
  func: async (_services, { body, method }, { http }) => {
    if (method.toLowerCase() === 'get') {
      http.response.status(200)
      return
    }
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
