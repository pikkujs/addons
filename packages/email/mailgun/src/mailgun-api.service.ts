import type { MailgunSecrets } from './mailgun.secret.js'

export interface RequestOptions {
  body?: Record<string, string | string[]>
  qs?: Record<string, string | number | boolean | undefined>
}

export class MailgunService {
  private baseUrl: string

  constructor(private creds: MailgunSecrets) {
    this.baseUrl = `https://${creds.apiDomain}/v3/`
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const url = new URL(endpoint, this.baseUrl)

    if (options?.qs) {
      for (const [key, value] of Object.entries(options.qs)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value))
        }
      }
    }

    const headers: Record<string, string> = {
      'Authorization': `Basic ${Buffer.from(`api:${this.creds.apiKey}`).toString('base64')}`,
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

    return this.request<{ id: string; message: string }>(
      'POST',
      `/${this.creds.emailDomain}/messages`,
      { body }
    )
  }
}
