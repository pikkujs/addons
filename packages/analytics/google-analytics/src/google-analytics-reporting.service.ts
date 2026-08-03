import type { OAuth2CredentialConfig } from '@pikku/core/secret'
import { UnauthorizedError } from '@pikku/core/errors'

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

export interface GoogleAnalyticsCredentialResolver {
  get<T = unknown>(name: string): Promise<T | null>
}

export class GoogleAnalyticsReportingService {
  constructor(
    private propertyId: string,
    private credentials: GoogleAnalyticsCredentialResolver
  ) {}

  /**
   * The access token is owned and refreshed by the platform credential service,
   * so it is resolved per-request rather than cached on the service.
   */
  private async authorization(): Promise<string> {
    const cred = await this.credentials.get<{ accessToken: string }>(
      'googleAnalyticsOAuth'
    )
    if (!cred?.accessToken) {
      throw new UnauthorizedError(
        'No Google Analytics connection — connect Google Analytics first'
      )
    }
    return `Bearer ${cred.accessToken}`
  }

  private async request<T>(method: string, url: string, body?: unknown): Promise<T> {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: await this.authorization(),
      },
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
