import type { PosthogSecrets } from './posthog.secret.js'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

export class PosthogService {
  private baseUrl: string
  public readonly apiKey: string
  public readonly projectApiKey: string | undefined

  constructor(private creds: PosthogSecrets) {
    this.baseUrl = creds.host || 'https://app.posthog.com'
    this.apiKey = creds.apiKey
    this.projectApiKey = creds.projectApiKey
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

  /**
   * Ingestion, which is not the management API: it sits outside `/api/` and
   * authenticates with the project key carried in the body, so it takes neither
   * the base path nor the Authorization header `request()` applies.
   */
  async ingest(endpoint: 'batch' | 'capture', body: unknown): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${endpoint}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `PostHog ingest error (${response.status}): ${errorText}`
      )
    }
  }
}
