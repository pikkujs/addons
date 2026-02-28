import type { GoogleAnalyticsSecrets } from './google-analytics.secret.js'

const BASE_URL = 'https://www.google-analytics.com'

export interface GA4Event {
  name: string
  params?: Record<string, string | number | boolean | undefined>
}

export interface GA4Payload {
  client_id: string
  user_id?: string
  timestamp_micros?: string
  user_properties?: Record<string, { value: string | number }>
  non_personalized_ads?: boolean
  events: GA4Event[]
}

export interface GA4ValidationResult {
  validationMessages: Array<{
    fieldPath: string
    description: string
    validationCode: string
  }>
}

export class GoogleAnalyticsService {
  private measurementId: string
  private apiSecret: string

  constructor(secrets: GoogleAnalyticsSecrets) {
    this.measurementId = secrets.measurementId
    this.apiSecret = secrets.apiSecret
  }

  private buildUrl(endpoint: string): string {
    const url = new URL(endpoint, BASE_URL)
    url.searchParams.set('measurement_id', this.measurementId)
    url.searchParams.set('api_secret', this.apiSecret)
    return url.toString()
  }

  async sendEvents(payload: GA4Payload): Promise<void> {
    const response = await fetch(this.buildUrl('/mp/collect'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Google Analytics API error (${response.status}): ${errorText}`)
    }
    // Measurement Protocol returns 204 No Content on success
  }

  async validateEvents(payload: GA4Payload): Promise<GA4ValidationResult> {
    const response = await fetch(this.buildUrl('/debug/mp/collect'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Google Analytics API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<GA4ValidationResult>
  }
}
