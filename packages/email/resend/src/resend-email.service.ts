import type {
  EmailService,
  SendEmailInput,
  SendEmailResult,
} from '@pikku/core'
import type { ResendService } from './resend-api.service.js'

/**
 * Adapter exposing Resend as a core `EmailService`.
 *
 * Wraps the raw `ResendService` and maps the standard `send()` contract onto
 * Resend's `/emails` endpoint. A host application wires this into its singleton
 * services as `emailService`; the addon's own RPC functions keep using the raw
 * service directly.
 */
export class ResendEmailService implements EmailService {
  constructor(
    private resend: ResendService,
    private defaultFrom?: string
  ) {}

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    if ('template' in input && input.template) {
      throw new Error(
        'Resend does not support template references via this adapter; provide text or html instead'
      )
    }

    const from = input.from ?? this.defaultFrom
    if (!from) {
      throw new Error('A "from" address is required to send email via Resend')
    }

    const text = 'text' in input ? (input.text as string | undefined) : undefined
    const html = 'html' in input ? (input.html as string | undefined) : undefined

    const result = await this.resend.sendEmail({
      from,
      to: input.to,
      cc: input.cc,
      bcc: input.bcc,
      reply_to: input.replyTo,
      subject: input.subject ?? '',
      text,
      html,
      headers: input.headers,
    })

    return { messageId: result.id }
  }
}
