import type { CloudflareSecrets } from './cloudflare.secret.js'

const BASE_URL = 'https://api.cloudflare.com/client/v4'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

export class CloudflareService {
  constructor(private creds: CloudflareSecrets) {}

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
        // Choose auth pattern:
        // Bearer: 'Authorization': `Bearer ${this.creds.apiKey}`
        // API Key header: 'X-API-Key': this.creds.apiKey
        // Basic: 'Authorization': `Basic ${Buffer.from(`${this.creds.user}:${this.creds.password}`).toString('base64')}`
        'Authorization': `Bearer ${this.creds.apiKey}`,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Cloudflare API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }

  // Add methods for each API operation
  // async getResource(id: string): Promise<Resource> {
  //   return this.request<Resource>('GET', `/resources/${id}`)
  // }
}
