import type {
  EmailService,
  SendEmailInput,
  SendEmailResult,
} from '@pikku/core'
import type { MailgunService } from './mailgun-api.service.js'

const toCsv = (value?: string | string[]): string | undefined => {
  if (value === undefined) return undefined
  return Array.isArray(value) ? value.join(', ') : value
}

/**
 * Adapter exposing Mailgun as a core `EmailService`.
 *
 * Wraps the raw `MailgunService` and maps the standard `send()` contract onto
 * Mailgun's `/{domain}/messages` endpoint. A host application wires this into
 * its singleton services as `emailService`; the addon's own RPC functions keep
 * using the raw service directly.
 */
export class MailgunEmailService implements EmailService {
  constructor(
    private mailgun: MailgunService,
    private defaultFrom?: string
  ) {}

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    const from = input.from ?? this.defaultFrom
    if (!from) {
      throw new Error('A "from" address is required to send email via Mailgun')
    }

    const to = toCsv(input.to)
    if (!to) {
      throw new Error('At least one "to" address is required to send email via Mailgun')
    }

    const body: Record<string, string | string[]> = {
      from,
      to,
      subject: input.subject ?? '',
    }

    const cc = toCsv(input.cc)
    const bcc = toCsv(input.bcc)
    const replyTo = toCsv(input.replyTo)
    if (cc) body.cc = cc
    if (bcc) body.bcc = bcc
    if (replyTo) body['h:Reply-To'] = replyTo
    if (input.headers) {
      for (const [key, value] of Object.entries(input.headers)) {
        body[`h:${key}`] = value
      }
    }

    if ('template' in input && input.template) {
      body.template = input.template.name
      if (input.template.data) {
        body['h:X-Mailgun-Variables'] = JSON.stringify(input.template.data)
      }
    } else {
      const text = 'text' in input ? (input.text as string | undefined) : undefined
      const html = 'html' in input ? (input.html as string | undefined) : undefined
      if (text) body.text = text
      if (html) body.html = html
    }

    const result = await this.mailgun.request<{ id: string; message: string }>(
      'POST',
      `/${this.mailgun.sendingDomain}/messages`,
      { body }
    )

    return { messageId: result.id }
  }
}
