import { OAuth2Client } from '@pikku/core/oauth2'
import type { OAuth2CredentialConfig } from '@pikku/core/secret'
import type { SecretService } from '@pikku/core'

const DATA_API_URL = 'https://analyticsdata.googleapis.com'

export const GA4_OAUTH2_CONFIG: OAuth2CredentialConfig = {
  tokenSecretId: 'GOOGLE_ANALYTICS_TOKENS',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  scopes: [
    'https://www.googleapis.com/auth/analytics.readonly',
  ],
  additionalParams: {
    access_type: 'offline',
    prompt: 'consent',
  },
}

export interface ReportRequest {
  dateRanges: Array<{ startDate: string; endDate: string }>
  metrics: Array<{ name: string }>
  dimensions?: Array<{ name: string }>
  dimensionFilter?: FilterGroup
  metricFilter?: FilterGroup
  orderBys?: Array<{
    metric?: { metricName: string }
    dimension?: { dimensionName: string; orderType?: 'ALPHANUMERIC' | 'CASE_INSENSITIVE_ALPHANUMERIC' | 'NUMERIC' }
    desc?: boolean
  }>
  limit?: number
  offset?: number
  keepEmptyRows?: boolean
  currencyCode?: string
  metricAggregations?: string[]
  returnPropertyQuota?: boolean
}

export interface FilterGroup {
  andGroup?: { expressions: FilterExpression[] }
  orGroup?: { expressions: FilterExpression[] }
  filter?: {
    fieldName: string
    stringFilter?: { value: string; matchType: string; caseSensitive?: boolean }
    inListFilter?: { values: string[]; caseSensitive?: boolean }
    numericFilter?: { operation: string; value: { int64Value?: string; doubleValue?: number } }
    betweenFilter?: { fromValue: { int64Value?: string; doubleValue?: number }; toValue: { int64Value?: string; doubleValue?: number } }
  }
}

export interface FilterExpression {
  filter?: FilterGroup['filter']
  andGroup?: { expressions: FilterExpression[] }
  orGroup?: { expressions: FilterExpression[] }
  notExpression?: FilterExpression
}

export interface ReportRow {
  dimensionValues: Array<{ value: string }>
  metricValues: Array<{ value: string }>
}

export interface ReportResponse {
  dimensionHeaders: Array<{ name: string }>
  metricHeaders: Array<{ name: string; type: string }>
  rows?: ReportRow[]
  rowCount: number
  propertyQuota?: Record<string, unknown>
}

export interface MetadataEntry {
  apiName: string
  uiName: string
  description: string
  category: string
}

export interface MetadataResponse {
  dimensions: MetadataEntry[]
  metrics: Array<MetadataEntry & { type: string }>
}

export class GoogleAnalyticsReportingService {
  private oauth: OAuth2Client

  constructor(private propertyId: string, secrets: SecretService) {
    this.oauth = new OAuth2Client(
      GA4_OAUTH2_CONFIG,
      'GOOGLE_ANALYTICS_APP_CREDENTIALS',
      secrets
    )
  }

  private async request<T>(method: string, url: string, body?: unknown): Promise<T> {
    const response = await this.oauth.request(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`GA4 Data API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }

  async runReport(report: ReportRequest): Promise<ReportResponse> {
    return this.request<ReportResponse>(
      'POST',
      `${DATA_API_URL}/v1beta/properties/${this.propertyId}:runReport`,
      report,
    )
  }

  async getMetadata(): Promise<MetadataResponse> {
    return this.request<MetadataResponse>(
      'GET',
      `${DATA_API_URL}/v1beta/properties/${this.propertyId}/metadata`,
    )
  }
}
