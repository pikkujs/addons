import type { EmailService, SendEmailInput, SendEmailResult } from '@pikku/core'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'
import type {
  MandrillMessage,
  MandrillSendResult,
  MandrillTemplateContent,
  MandrillSendOptions,
  MandrillRecipient,
} from './mandrill.types.js'

const BASE_URL = 'https://mandrillapp.com/api/1.0'

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

export class MandrillService implements EmailService {
  constructor(
    private secretsOrApiKey: TypedSecretService | string,
    private defaultFrom?: string
  ) {}

  private async getApiKey(): Promise<string> {
    if (typeof this.secretsOrApiKey === 'string') return this.secretsOrApiKey
    return this.secretsOrApiKey.getSecret('MANDRILL_API_KEY')
  }

  async request<T>(
    resource: string,
    action: string,
    body: Record<string, unknown> = {}
  ): Promise<T> {
    const apiKey = await this.getApiKey()
    const response = await fetch(`${BASE_URL}${resource}${action}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body, key: apiKey }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Mandrill API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }

  async sendMessage(
    message: MandrillMessage,
    options?: MandrillSendOptions
  ): Promise<MandrillSendResult[]> {
    return this.request<MandrillSendResult[]>('/messages', '/send', {
      message,
      ...options,
    })
  }

  async sendTemplate(
    templateName: string,
    templateContent: MandrillTemplateContent[],
    message: MandrillMessage,
    options?: MandrillSendOptions
  ): Promise<MandrillSendResult[]> {
    return this.request<MandrillSendResult[]>('/messages', '/send-template', {
      template_name: templateName,
      template_content: templateContent,
      message,
      ...options,
    })
  }

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
      const results = await this.sendTemplate(input.template.name, templateContent, message)
      return { messageId: results[0]?._id }
    }

    const text = 'text' in input ? (input.text as string | undefined) : undefined
    const html = 'html' in input ? (input.html as string | undefined) : undefined
    if (text) message.text = text
    if (html) message.html = html

    const results = await this.sendMessage(message)
    return { messageId: results[0]?._id }
  }
}
