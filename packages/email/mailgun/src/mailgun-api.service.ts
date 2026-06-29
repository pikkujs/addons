import type { EmailService, SendEmailInput, SendEmailResult } from '@pikku/core'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'
import type { MailgunSecrets } from './mailgun.secret.js'

export interface RequestOptions {
  body?: Record<string, string | string[]>
  qs?: Record<string, string | number | boolean | undefined>
}

const toCsv = (value?: string | string[]): string | undefined => {
  if (value === undefined) return undefined
  return Array.isArray(value) ? value.join(', ') : value
}

export class MailgunService implements EmailService {
  private baseUrl?: string
  private sendingDomain_?: string

  constructor(
    private secretsOrCreds: TypedSecretService | MailgunSecrets,
    private defaultFrom?: string
  ) {
    if (!('getSecret' in secretsOrCreds)) {
      this.baseUrl = `https://${secretsOrCreds.apiDomain}/v3/`
      this.sendingDomain_ = secretsOrCreds.emailDomain
    }
  }

  private async getCreds(): Promise<MailgunSecrets> {
    if ('getSecret' in this.secretsOrCreds) {
      return this.secretsOrCreds.getSecret('MAILGUN_CREDENTIALS')
    }
    return this.secretsOrCreds
  }

  private async getBaseUrl(): Promise<string> {
    return this.baseUrl ?? `https://${(await this.getCreds()).apiDomain}/v3/`
  }

  private async getSendingDomain(): Promise<string> {
    return this.sendingDomain_ ?? (await this.getCreds()).emailDomain
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const creds = await this.getCreds()
    const baseUrl = await this.getBaseUrl()
    const url = new URL(endpoint, baseUrl)

    if (options?.qs) {
      for (const [key, value] of Object.entries(options.qs)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value))
        }
      }
    }

    const headers: Record<string, string> = {
      'Authorization': `Basic ${Buffer.from(`api:${creds.apiKey}`).toString('base64')}`,
    }

    let body: BodyInit | undefined
    if (options?.body && method !== 'GET') {
      const formData = new URLSearchParams()
      for (const [key, value] of Object.entries(options.body)) {
        if (Array.isArray(value)) {
          for (const v of value) {
            formData.append(key, v)
          }
        } else {
          formData.append(key, value)
        }
      }
      body = formData
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Mailgun API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }

  async sendEmail(data: {
    from: string
    to: string
    subject: string
    text?: string
    html?: string
    cc?: string
    bcc?: string
  }): Promise<{ id: string; message: string }> {
    const body: Record<string, string> = {
      from: data.from,
      to: data.to,
      subject: data.subject,
    }
    if (data.text) body.text = data.text
    if (data.html) body.html = data.html
    if (data.cc) body.cc = data.cc
    if (data.bcc) body.bcc = data.bcc

    const sendingDomain = await this.getSendingDomain()
    return this.request<{ id: string; message: string }>(
      'POST',
      `/${sendingDomain}/messages`,
      { body }
    )
  }

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

    const sendingDomain = await this.getSendingDomain()
    const result = await this.request<{ id: string; message: string }>(
      'POST',
      `/${sendingDomain}/messages`,
      { body }
    )

    return { messageId: result.id }
  }
}
