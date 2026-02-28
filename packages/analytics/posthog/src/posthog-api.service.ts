import type { PosthogSecrets } from './posthog.secret.js'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

export class PosthogService {
  private baseUrl: string
  public readonly apiKey: string

  constructor(private creds: PosthogSecrets) {
    this.baseUrl = creds.host || 'https://app.posthog.com'
    this.apiKey = creds.apiKey
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const url = new URL(endpoint, this.baseUrl + '/api/')

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
        'Authorization': `Bearer ${this.creds.apiKey}`,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`PostHog API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }
}
