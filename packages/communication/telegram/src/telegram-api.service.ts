export interface RequestOptions {
  body?: Record<string, unknown>
}

interface TelegramResponse<T> {
  ok: boolean
  result: T
  description?: string
}

export class TelegramService {
  private baseUrl: string

  constructor(botToken: string, baseUrl?: string) {
    this.baseUrl = baseUrl ?? `https://api.telegram.org/bot${botToken}`
  }

  async request<T>(method: string, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${method}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    const data = await response.json() as TelegramResponse<T>

    if (!data.ok) {
      throw new Error(`Telegram API error: ${data.description || 'Unknown error'}`)
    }

    return data.result
  }
}
