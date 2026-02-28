import type { SlackSecrets } from './slack.secret.js'

const BASE_URL = 'https://slack.com/api/'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

export class SlackService {
  constructor(private creds: SlackSecrets) {}

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
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
        'Authorization': `Bearer ${this.creds.accessToken}`,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Slack API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }
}
