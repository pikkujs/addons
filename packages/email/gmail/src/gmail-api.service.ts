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

export class GmailService {
  private oauth: OAuth2Client

  constructor(secrets: TypedSecretService) {
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

    // Handle empty responses
    const text = await response.text()
    if (!text) {
      return {} as T
    }
    return JSON.parse(text) as T
  }

  async getProfile(): Promise<{ emailAddress: string }> {
    return this.request<{ emailAddress: string }>('GET', '/users/me/profile')
  }
}
