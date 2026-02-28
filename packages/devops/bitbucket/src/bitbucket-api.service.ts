import type { BitbucketSecrets } from './bitbucket.secret.js'

const BASE_URL = 'https://api.bitbucket.org/2.0/'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

export class BitbucketService {
  constructor(private creds: BitbucketSecrets) {}

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

    const auth = Buffer.from(`${this.creds.username}:${this.creds.appPassword}`).toString('base64')

    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Bitbucket API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }
}
