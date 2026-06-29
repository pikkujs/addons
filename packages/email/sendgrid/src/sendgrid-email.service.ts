import type {
  EmailService,
  SendEmailInput,
  SendEmailResult,
} from '@pikku/core'
import type { SendgridService } from './sendgrid-api.service.js'

const toList = (value?: string | string[]): string[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value]

const toRecipients = (value?: string | string[]) =>
  toList(value).map((email) => ({ email }))

/**
 * Adapter exposing SendGrid as a core `EmailService`.
 *
 * Wraps the raw `SendgridService` and maps the standard `send()` contract onto
 * SendGrid's `/mail/send` endpoint. A host application wires this into its
 * singleton services as `emailService`; the addon's own RPC functions keep
 * using the raw service directly.
 */
export class SendgridEmailService implements EmailService {
  constructor(
    private sendgrid: SendgridService,
    private defaultFrom?: string
  ) {}

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    const from = input.from ?? this.defaultFrom
    if (!from) {
      throw new Error('A "from" address is required to send email via SendGrid')
    }

    const personalization: Record<string, unknown> = {
      to: toRecipients(input.to),
    }
    if (input.cc) personalization.cc = toRecipients(input.cc)
    if (input.bcc) personalization.bcc = toRecipients(input.bcc)
    if (input.subject) personalization.subject = input.subject

    const body: Record<string, unknown> = {
      personalizations: [personalization],
      from: { email: from },
    }
    if (input.subject) body.subject = input.subject
    if (input.replyTo) {
      const [replyTo] = toList(input.replyTo)
      if (replyTo) body.reply_to = { email: replyTo }
    }
    if (input.headers) body.headers = input.headers

    if ('template' in input && input.template) {
      body.template_id = input.template.name
      if (input.template.data) {
        personalization.dynamic_template_data = input.template.data
      }
    } else {
      const content: Array<{ type: string; value: string }> = []
      const text = 'text' in input ? (input.text as string | undefined) : undefined
      const html = 'html' in input ? (input.html as string | undefined) : undefined
      if (text) content.push({ type: 'text/plain', value: text })
      if (html) content.push({ type: 'text/html', value: html })
      body.content = content
    }

    await this.sendgrid.request('POST', '/mail/send', { body })

    // SendGrid returns the message id in the X-Message-Id response header, which
    // the raw `request` helper does not surface; the 202 body is empty.
    return {}
  }
}
