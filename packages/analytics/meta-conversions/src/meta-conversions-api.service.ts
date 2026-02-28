import type { MetaConversionsSecrets } from './meta-conversions.secret.js'

const BASE_URL = 'https://graph.facebook.com'
const API_VERSION = 'v21.0'

export interface MetaEvent {
  event_name: string
  event_time: number
  event_id?: string
  event_source_url?: string
  action_source: 'website' | 'email' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other'
  user_data: Record<string, string | string[] | undefined>
  custom_data?: Record<string, unknown>
  opt_out?: boolean
}

export interface MetaSendEventsResponse {
  events_received: number
  messages: string[]
  fbtrace_id: string
}

export class MetaConversionsService {
  private pixelId: string
  private accessToken: string

  constructor(secrets: MetaConversionsSecrets) {
    this.pixelId = secrets.pixelId
    this.accessToken = secrets.accessToken
  }

  async sendEvents(events: MetaEvent[], testEventCode?: string): Promise<MetaSendEventsResponse> {
    const url = `${BASE_URL}/${API_VERSION}/${this.pixelId}/events`

    const body: Record<string, unknown> = {
      data: events,
      access_token: this.accessToken,
    }
    if (testEventCode) {
      body.test_event_code = testEventCode
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Meta Conversions API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<MetaSendEventsResponse>
  }
}
