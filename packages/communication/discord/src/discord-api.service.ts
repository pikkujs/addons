const BASE_URL = 'https://discord.com/api/v10'

export interface RequestOptions {
  body?: unknown
  qs?: Record<string, string | number | boolean | undefined>
}

export class DiscordService {
  constructor(private botToken: string) {}

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`)

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
        'Authorization': `Bot ${this.botToken}`,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Discord API error (${response.status}): ${errorText}`)
    }

    // Handle 204 No Content
    const text = await response.text()
    if (!text) {
      return {} as T
    }
    return JSON.parse(text) as T
  }
}
