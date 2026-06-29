import type {
  EmailService,
  SendEmailInput,
  SendEmailResult,
} from '@pikku/core'
import type { MandrillService } from './mandrill-api.service.js'
import type {
  MandrillMessage,
  MandrillRecipient,
} from './mandrill.types.js'

const parseAddress = (addr: string): { email: string; name?: string } => {
  const match = addr.match(/^\s*(.*?)\s*<([^>]+)>\s*$/)
  if (match) {
    return { name: match[1] || undefined, email: match[2].trim() }
  }
  return { email: addr.trim() }
}

const toRecipients = (
  value: string | string[] | undefined,
  type: MandrillRecipient['type']
): MandrillRecipient[] => {
  if (value === undefined) return []
  const list = Array.isArray(value) ? value : [value]
  return list.map((addr) => {
    const { email, name } = parseAddress(addr)
    return { email, ...(name ? { name } : {}), type }
  })
}

/**
 * Adapter exposing Mandrill as a core `EmailService`.
 *
 * Wraps the raw `MandrillService` and maps the standard `send()` contract onto
 * Mandrill's `messages/send` (and `messages/send-template`) endpoints. A host
 * application wires this into its singleton services as `emailService`; the
 * addon's own RPC functions keep using the raw service directly.
 */
export class MandrillEmailService implements EmailService {
  constructor(
    private mandrill: MandrillService,
    private defaultFrom?: string
  ) {}

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    const from = input.from ?? this.defaultFrom
    if (!from) {
      throw new Error('A "from" address is required to send email via Mandrill')
    }
    const fromAddress = parseAddress(from)

    const to: MandrillRecipient[] = [
      ...toRecipients(input.to, 'to'),
      ...toRecipients(input.cc, 'cc'),
      ...toRecipients(input.bcc, 'bcc'),
    ]

    const message: MandrillMessage = {
      subject: input.subject ?? '',
      from_email: fromAddress.email,
      ...(fromAddress.name ? { from_name: fromAddress.name } : {}),
      to,
      ...(input.headers ? { headers: input.headers } : {}),
    }

    if ('template' in input && input.template) {
      const templateContent = input.template.data
        ? Object.entries(input.template.data).map(([name, content]) => ({
            name,
            content: String(content),
          }))
        : []
      const results = await this.mandrill.sendTemplate(
        input.template.name,
        templateContent,
        message
      )
      return { messageId: results[0]?._id }
    }

    const text = 'text' in input ? (input.text as string | undefined) : undefined
    const html = 'html' in input ? (input.html as string | undefined) : undefined
    if (text) message.text = text
    if (html) message.html = html

    const results = await this.mandrill.sendMessage(message)
    return { messageId: results[0]?._id }
  }
}
