import type { PaddleSecrets } from './paddle.secret.js'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

export class PaddleService {
  private baseUrl: string

  constructor(private creds: PaddleSecrets) {
    this.baseUrl = creds.sandbox
      ? 'https://sandbox-api.paddle.com/'
      : 'https://api.paddle.com/'
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
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
      throw new Error(`Paddle API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }
}
