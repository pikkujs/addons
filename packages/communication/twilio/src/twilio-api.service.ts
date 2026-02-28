import type { TwilioSecrets } from './twilio.secret.js'

export interface RequestOptions {
  body?: Record<string, string | undefined>
}

export class TwilioService {
  private baseUrl: string
  private authHeader: string

  constructor(creds: TwilioSecrets) {
    this.baseUrl = `https://api.twilio.com/2010-04-01/Accounts/${creds.accountSid}`
    this.authHeader = `Basic ${Buffer.from(`${creds.accountSid}:${creds.authToken}`).toString('base64')}`
  }

  async request<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const body = new URLSearchParams()
    if (options?.body) {
      for (const [key, value] of Object.entries(options.body)) {
        if (value !== undefined) {
          body.append(key, value)
        }
      }
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.authHeader,
      },
      body: body.toString(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Twilio API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }
}
