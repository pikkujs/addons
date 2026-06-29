import type { EmailService, SendEmailInput, SendEmailResult } from '@pikku/core'
import { OAuth2Client } from '@pikku/core/oauth2'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'

const GMAIL_BASE_URL = 'https://gmail.googleapis.com/gmail/v1'

export const GMAIL_OAUTH2_CONFIG = {
  tokenSecretId: 'GMAIL_TOKENS',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  scopes: [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.labels',
  ],
  additionalParams: {
    access_type: 'offline',
    prompt: 'consent',
  },
}

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

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

export class GmailService implements EmailService {
  private oauth: OAuth2Client

  constructor(
    secrets: TypedSecretService,
    private defaultFrom?: string
  ) {
    this.oauth = new OAuth2Client(
      GMAIL_OAUTH2_CONFIG,
      'GMAIL_APP_CREDENTIALS',
      secrets
    )
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const url = new URL(`${GMAIL_BASE_URL}${endpoint}`)

    if (options?.qs) {
      for (const [key, value] of Object.entries(options.qs)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value))
        }
      }
    }

    const response = await this.oauth.request(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Gmail API error (${response.status}): ${errorText}`)
    }

    const text = await response.text()
    if (!text) {
      return {} as T
    }
    return JSON.parse(text) as T
  }

  async getProfile(): Promise<{ emailAddress: string }> {
    return this.request<{ emailAddress: string }>('GET', '/users/me/profile')
  }

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

    const result = await this.request<{ id: string }>(
      'POST',
      '/users/me/messages/send',
      { body: { raw: base64Url(mime) } }
    )

    return { messageId: result.id }
  }
}
