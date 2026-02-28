import type { UptimerobotSecrets } from './uptimerobot.secret.js'

const BASE_URL = 'https://api.uptimerobot.com/v2/'

export interface RequestOptions {
  body?: Record<string, unknown>
}

export class UptimerobotService {
  constructor(private creds: UptimerobotSecrets) {}

  async request<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const url = new URL(endpoint, BASE_URL)

    // UptimeRobot uses POST requests with api_key in body
    const body = new URLSearchParams()
    body.append('api_key', this.creds.apiKey)
    body.append('format', 'json')

    if (options?.body) {
      for (const [key, value] of Object.entries(options.body)) {
        if (value !== undefined) {
          body.append(key, String(value))
        }
      }
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`UptimeRobot API error (${response.status}): ${errorText}`)
    }

    const result = await response.json() as { stat: string; error?: { message: string } } & T
    if (result.stat === 'fail') {
      throw new Error(`UptimeRobot API error: ${result.error?.message || 'Unknown error'}`)
    }

    return result as T
  }
}
