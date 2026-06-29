import type {
  EmailService,
  SendEmailInput,
  SendEmailResult,
} from '@pikku/core'
import type { GmailService } from './gmail-api.service.js'

const toHeader = (value?: string | string[]): string | undefined => {
  if (value === undefined) return undefined
  return Array.isArray(value) ? value.join(', ') : value
}

const base64Url = (value: string): string =>
  Buffer.from(value, 'utf-8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

/**
 * Adapter exposing Gmail as a core `EmailService`.
 *
 * Wraps the raw `GmailService` and maps the standard `send()` contract by
 * building an RFC822 MIME message and posting it to the Gmail
 * `users/me/messages/send` endpoint. A host application wires this into its
 * singleton services as `emailService`; the addon's own RPC functions keep
 * using the raw service directly.
 */
export class GmailEmailService implements EmailService {
  constructor(
    private gmail: GmailService,
    private defaultFrom?: string
  ) {}

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    if ('template' in input && input.template) {
      throw new Error(
        'Gmail does not support template-based sending; provide text or html instead'
      )
    }

    const from = input.from ?? this.defaultFrom

    const text = 'text' in input ? (input.text as string | undefined) : undefined
    const html = 'html' in input ? (input.html as string | undefined) : undefined

    const headers: string[] = []
    if (from) headers.push(`From: ${from}`)
    const to = toHeader(input.to)
    if (to) headers.push(`To: ${to}`)
    const cc = toHeader(input.cc)
    if (cc) headers.push(`Cc: ${cc}`)
    const bcc = toHeader(input.bcc)
    if (bcc) headers.push(`Bcc: ${bcc}`)
    const replyTo = toHeader(input.replyTo)
    if (replyTo) headers.push(`Reply-To: ${replyTo}`)
    headers.push(`Subject: ${input.subject ?? ''}`)
    headers.push('MIME-Version: 1.0')
    if (input.headers) {
      for (const [key, value] of Object.entries(input.headers)) {
        headers.push(`${key}: ${value}`)
      }
    }

    let mime: string
    if (html && text) {
      const boundary = 'pikku-boundary-0000'
      headers.push(`Content-Type: multipart/alternative; boundary="${boundary}"`)
      mime =
        `${headers.join('\r\n')}\r\n\r\n` +
        `--${boundary}\r\n` +
        `Content-Type: text/plain; charset="UTF-8"\r\n\r\n${text}\r\n` +
        `--${boundary}\r\n` +
        `Content-Type: text/html; charset="UTF-8"\r\n\r\n${html}\r\n` +
        `--${boundary}--`
    } else if (html) {
      headers.push('Content-Type: text/html; charset="UTF-8"')
      mime = `${headers.join('\r\n')}\r\n\r\n${html}`
    } else {
      headers.push('Content-Type: text/plain; charset="UTF-8"')
      mime = `${headers.join('\r\n')}\r\n\r\n${text ?? ''}`
    }

    const result = await this.gmail.request<{ id: string }>(
      'POST',
      '/users/me/messages/send',
      { body: { raw: base64Url(mime) } }
    )

    return { messageId: result.id }
  }
}
