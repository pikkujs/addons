import type { UnleashSecrets } from './unleash.secret.js'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

export class UnleashService {
  private baseUrl: string

  constructor(private creds: UnleashSecrets) {
    this.baseUrl = creds.url.replace(/\/+$/, '')
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const url = new URL(endpoint, `${this.baseUrl}/api/`)

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
        Authorization: this.creds.token,
        'UNLEASH-APPNAME': this.creds.appName ?? 'pikku',
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Unleash API error (${response.status}): ${errorText}. A 401 here is usually an admin token where a client token belongs.`
      )
    }

    return response.json() as Promise<T>
  }
}
