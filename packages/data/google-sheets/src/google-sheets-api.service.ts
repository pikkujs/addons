import { OAuth2Client } from '@pikku/core/oauth2'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'
import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const GOOGLE_SHEETS_OAUTH2_CONFIG = {
  tokenSecretId: 'GOOGLE_SHEETS_TOKENS',
  authorizationUrl: "https://accounts.google.com/o/oauth2/auth",
  tokenUrl: "https://example.com/oauth2/token",
  scopes: ["https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive.readonly","https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/spreadsheets.readonly"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "POST /v4/spreadsheets": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "headers": []
  },
  "GET /v4/spreadsheets/{spreadsheetId}": {
    "path": [
      "spreadsheetId"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "includeGridData",
      "ranges"
    ],
    "headers": []
  },
  "GET /v4/spreadsheets/{spreadsheetId}/developerMetadata/{metadataId}": {
    "path": [
      "spreadsheetId",
      "metadataId"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "headers": []
  },
  "POST /v4/spreadsheets/{spreadsheetId}/developerMetadata:search": {
    "path": [
      "spreadsheetId"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "headers": []
  },
  "POST /v4/spreadsheets/{spreadsheetId}/sheets/{sheetId}:copyTo": {
    "path": [
      "spreadsheetId",
      "sheetId"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "headers": []
  },
  "GET /v4/spreadsheets/{spreadsheetId}/values/{range}": {
    "path": [
      "spreadsheetId",
      "range"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "dateTimeRenderOption",
      "majorDimension",
      "valueRenderOption"
    ],
    "headers": []
  },
  "PUT /v4/spreadsheets/{spreadsheetId}/values/{range}": {
    "path": [
      "spreadsheetId",
      "range"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "includeValuesInResponse",
      "responseDateTimeRenderOption",
      "responseValueRenderOption",
      "valueInputOption"
    ],
    "headers": []
  },
  "POST /v4/spreadsheets/{spreadsheetId}/values/{range}:append": {
    "path": [
      "spreadsheetId",
      "range"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "includeValuesInResponse",
      "insertDataOption",
      "responseDateTimeRenderOption",
      "responseValueRenderOption",
      "valueInputOption"
    ],
    "headers": []
  },
  "POST /v4/spreadsheets/{spreadsheetId}/values/{range}:clear": {
    "path": [
      "spreadsheetId",
      "range"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "headers": []
  },
  "POST /v4/spreadsheets/{spreadsheetId}/values:batchClear": {
    "path": [
      "spreadsheetId"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "headers": []
  },
  "POST /v4/spreadsheets/{spreadsheetId}/values:batchClearByDataFilter": {
    "path": [
      "spreadsheetId"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "headers": []
  },
  "GET /v4/spreadsheets/{spreadsheetId}/values:batchGet": {
    "path": [
      "spreadsheetId"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "dateTimeRenderOption",
      "majorDimension",
      "ranges",
      "valueRenderOption"
    ],
    "headers": []
  },
  "POST /v4/spreadsheets/{spreadsheetId}/values:batchGetByDataFilter": {
    "path": [
      "spreadsheetId"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "headers": []
  },
  "POST /v4/spreadsheets/{spreadsheetId}/values:batchUpdate": {
    "path": [
      "spreadsheetId"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "headers": []
  },
  "POST /v4/spreadsheets/{spreadsheetId}/values:batchUpdateByDataFilter": {
    "path": [
      "spreadsheetId"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "headers": []
  },
  "POST /v4/spreadsheets/{spreadsheetId}:batchUpdate": {
    "path": [
      "spreadsheetId"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "headers": []
  },
  "POST /v4/spreadsheets/{spreadsheetId}:getByDataFilter": {
    "path": [
      "spreadsheetId"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "headers": []
  }
}

export class GoogleSheetsService {
  private baseUrl: string
  private oauth: OAuth2Client

  constructor(secrets: TypedSecretService, variables: TypedVariablesService) {
    this.baseUrl = variables.get('GOOGLE_SHEETS_BASE_URL') as string
    this.oauth = new OAuth2Client(
      GOOGLE_SHEETS_OAUTH2_CONFIG,
      'GOOGLE_SHEETS_APP_CREDENTIALS',
      secrets
    )
  }

  async call<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    data?: Record<string, unknown>
  ): Promise<T> {
    const route = ROUTES[`${method} ${path}`]
    let endpoint = path
    let body: Record<string, unknown> | undefined
    const query: Record<string, string> = {}
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (data && route) {
      // Interpolate path params
      for (const param of route.path) {
        if (data[param] !== undefined) {
          endpoint = endpoint.replace(`{${param}}`, String(data[param]))
        }
      }
      // Extract query params
      for (const param of route.query) {
        if (data[param] !== undefined) {
          query[param] = String(data[param])
        }
      }
      // Extract header params
      for (const param of route.headers) {
        if (data[param] !== undefined) {
          headers[param] = String(data[param])
        }
      }
      // Everything else goes into body
      const pathQueryHeaders = new Set([...route.path, ...route.query, ...route.headers])
      const remaining = Object.fromEntries(
        Object.entries(data).filter(([k]) => !pathQueryHeaders.has(k))
      )
      if (Object.keys(remaining).length > 0) {
        body = remaining
      }
    }

    const url = new URL(`${this.baseUrl}${endpoint}`)
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value)
    }

    const response = await this.oauth.request(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      const errorMessage = route?.errors?.[response.status] ?? errorText
      switch (response.status) {
        case 400: throw new BadRequestError(errorMessage)
        case 401: throw new UnauthorizedError(errorMessage)
        case 403: throw new ForbiddenError(errorMessage)
        case 404: throw new NotFoundError(errorMessage)
        case 405: throw new MethodNotAllowedError(errorMessage)
        case 409: throw new ConflictError(errorMessage)
        case 422: throw new UnprocessableContentError(errorMessage)
        case 429: throw new TooManyRequestsError(errorMessage)
        case 500: throw new InternalServerError(errorMessage)
        default: throw new Error(`Google Sheets API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
