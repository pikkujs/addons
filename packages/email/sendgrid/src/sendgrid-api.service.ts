import type { EmailService, SendEmailInput, SendEmailResult } from '@pikku/core'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'

const BASE_URL = 'https://api.sendgrid.com/v3'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

const toList = (value?: string | string[]): string[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value]

const toRecipients = (value?: string | string[]) =>
  toList(value).map((email) => ({ email }))

export class SendgridService implements EmailService {
  constructor(
    private secretsOrApiKey: TypedSecretService | string,
    private defaultFrom?: string
  ) {}

  private async getApiKey(): Promise<string> {
    if (typeof this.secretsOrApiKey === 'string') return this.secretsOrApiKey
    return this.secretsOrApiKey.getSecret('SENDGRID_API_KEY')
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const apiKey = await this.getApiKey()
    const url = new URL(endpoint, BASE_URL)

    if (options?.qs) {
      for (const [key, value] of Object.entries(options.qs)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value))
        }
      }
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`SendGrid API error (${response.status}): ${errorText}`)
    }

    const text = await response.text()
    if (!text) {
      return {} as T
    }
    return JSON.parse(text) as T
  }

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

    await this.request('POST', '/mail/send', { body })
    return {}
  }
}
