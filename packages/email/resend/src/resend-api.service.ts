import type { EmailService, SendEmailInput, SendEmailResult } from '@pikku/core'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'

const BASE_URL = 'https://api.resend.com'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

export interface ResendSendEmail {
  from: string
  to: string | string[]
  subject: string
  html?: string
  text?: string
  cc?: string | string[]
  bcc?: string | string[]
  reply_to?: string | string[]
  headers?: Record<string, string>
}

export interface ResendSendResult {
  id: string
}

export class ResendService implements EmailService {
  constructor(
    private secretsOrApiKey: TypedSecretService | string,
    private defaultFrom?: string
  ) {}

  private async getApiKey(): Promise<string> {
    if (typeof this.secretsOrApiKey === 'string') return this.secretsOrApiKey
    return (await this.secretsOrApiKey.getSecret('RESEND_CREDENTIALS')).apiKey
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
      throw new Error(`Resend API error (${response.status}): ${errorText}`)
    }

    const text = await response.text()
    if (!text) {
      return {} as T
    }
    return JSON.parse(text) as T
  }

  async sendEmail(data: ResendSendEmail): Promise<ResendSendResult> {
    return this.request<ResendSendResult>('POST', '/emails', { body: data })
  }

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

    const result = await this.sendEmail({
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
