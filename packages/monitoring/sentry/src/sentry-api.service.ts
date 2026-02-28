import type { SentrySecrets } from './sentry.secret.js'

const DEFAULT_BASE_URL = 'https://sentry.io'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

function buildUrl(
  baseUrl: string,
  endpoint: string,
  qs?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(endpoint, baseUrl)
  if (qs) {
    for (const [key, value] of Object.entries(qs)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    }
  }
  return url.toString()
}

function getNextPageUrl(linkHeader: string | null): string | undefined {
  if (!linkHeader) return undefined

  const links = linkHeader.split(',')
  for (const link of links) {
    if (link.includes('rel="next"') && link.includes('results="true"')) {
      const match = link.match(/<([^>]+)>/)
      if (match) {
        return match[1]
      }
    }
  }
  return undefined
}

export class SentryService {
  constructor(private creds: SentrySecrets) {}

  async request<T>(
    method: string,
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const baseUrl = this.creds.baseUrl || DEFAULT_BASE_URL
    const url = buildUrl(baseUrl, endpoint, options?.qs)

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${this.creds.token}`,
        'Content-Type': 'application/json',
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Sentry API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }

  async requestAllPages<T>(
    method: string,
    endpoint: string,
    options?: RequestOptions & { limit?: number }
  ): Promise<T[]> {
    const baseUrl = this.creds.baseUrl || DEFAULT_BASE_URL
    const results: T[] = []
    let url: string | undefined = buildUrl(baseUrl, endpoint, options?.qs)
    const limit = options?.limit

    while (url) {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${this.creds.token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Sentry API error (${response.status}): ${errorText}`)
      }

      const data = (await response.json()) as T[]
      results.push(...data)

      // Check if we've reached the limit
      if (limit && results.length >= limit) {
        return results.slice(0, limit)
      }

      // Get next page URL from Link header
      const linkHeader = response.headers.get('Link')
      url = getNextPageUrl(linkHeader)
    }

    return results
  }
}
