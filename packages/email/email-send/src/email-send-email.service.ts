import type {
  EmailService,
  SendEmailInput,
  SendEmailResult,
} from '@pikku/core'
import type { Transporter } from 'nodemailer'

/**
 * Adapter exposing the SMTP transport as a core `EmailService`.
 *
 * Wraps a nodemailer `Transporter` so a host application can wire it into its
 * singleton services as `emailService` and send mail through the standard
 * `send()` contract. The addon's own RPC functions continue to use the raw
 * `emailTransport` directly.
 */
export class SmtpEmailService implements EmailService {
  constructor(
    private transport: Transporter,
    private defaultFrom?: string
  ) {}

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    if ('template' in input && input.template) {
      throw new Error(
        'SMTP transport does not support template-based sending; provide text or html instead'
      )
    }

    const from = input.from ?? this.defaultFrom
    if (!from) {
      throw new Error('A "from" address is required to send email via SMTP')
    }

    const text = 'text' in input ? (input.text as string | undefined) : undefined
    const html = 'html' in input ? (input.html as string | undefined) : undefined

    const result = await this.transport.sendMail({
      from,
      to: input.to,
      cc: input.cc,
      bcc: input.bcc,
      replyTo: input.replyTo,
      subject: input.subject,
      text,
      html,
      headers: input.headers,
    })

    return { messageId: result.messageId }
  }
}
