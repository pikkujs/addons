import type { DeeplSecrets } from './deepl.secret.js'

export interface RequestOptions {
  body?: Record<string, unknown>
  qs?: Record<string, string | number | boolean | undefined>
}

export class DeeplService {
  private baseUrl: string

  constructor(private creds: DeeplSecrets) {
    this.baseUrl = creds.useFreeApi
      ? 'https://api-free.deepl.com/v2/'
      : 'https://api.deepl.com/v2/'
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const url = new URL(endpoint, this.baseUrl)
    url.searchParams.set('auth_key', this.creds.apiKey)

    if (options?.qs) {
      for (const [key, value] of Object.entries(options.qs)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value))
        }
      }
    }

    const headers: Record<string, string> = {}
    let body: string | undefined

    if (options?.body) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
      body = new URLSearchParams(
        Object.entries(options.body).map(([k, v]) => [k, String(v)])
      ).toString()
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`DeepL API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }
}
