import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const MICROSOFT_EXCEL_OAUTH2_CONFIG = {
  tokenSecretId: 'MICROSOFT_EXCEL_TOKENS',
  authorizationUrl: "https://example.com/oauth2/authorize",
  tokenUrl: "https://example.com/oauth2/token",
  scopes: ["read","write"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /me/drive/items/{workbookId}/workbook/worksheets": {
    "path": [
      "workbookId"
    ],
    "query": [],
    "headers": []
  },
  "POST /me/drive/items/{workbookId}/workbook/worksheets/add": {
    "path": [
      "workbookId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /me/drive/items/{workbookId}": {
    "path": [
      "workbookId"
    ],
    "query": [],
    "headers": []
  },
  "GET /me/drive/items/{workbookId}/workbook/worksheets/list": {
    "path": [
      "workbookId"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/append": {
    "path": [
      "workbookId",
      "worksheetId"
    ],
    "query": [],
    "headers": []
  },
  "POST /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/range/clear": {
    "path": [
      "workbookId",
      "worksheetId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}": {
    "path": [
      "workbookId",
      "worksheetId"
    ],
    "query": [],
    "headers": []
  },
  "GET /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/usedRange": {
    "path": [
      "workbookId",
      "worksheetId"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/range/update": {
    "path": [
      "workbookId",
      "worksheetId"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/range/upsert": {
    "path": [
      "workbookId",
      "worksheetId"
    ],
    "query": [],
    "headers": []
  },
  "POST /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/add": {
    "path": [
      "workbookId",
      "worksheetId"
    ],
    "query": [],
    "headers": []
  },
  "POST /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableId}/rows/add": {
    "path": [
      "workbookId",
      "worksheetId",
      "tableId"
    ],
    "query": [],
    "headers": []
  },
  "POST /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableId}/convertToRange": {
    "path": [
      "workbookId",
      "worksheetId",
      "tableId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableId}": {
    "path": [
      "workbookId",
      "worksheetId",
      "tableId"
    ],
    "query": [],
    "headers": []
  },
  "GET /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableId}/columns": {
    "path": [
      "workbookId",
      "worksheetId",
      "tableId"
    ],
    "query": [],
    "headers": []
  },
  "GET /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableId}/rows": {
    "path": [
      "workbookId",
      "worksheetId",
      "tableId"
    ],
    "query": [],
    "headers": []
  },
  "GET /me/drive/items/{workbookId}/workbook/worksheets/{worksheetId}/tables/{tableId}/lookup": {
    "path": [
      "workbookId",
      "worksheetId",
      "tableId"
    ],
    "query": [
      "lookupColumn",
      "lookupValue"
    ],
    "headers": []
  }
}

export class MicrosoftExcelService {
  private baseUrl: string

  constructor(private creds: { accessToken: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('MICROSOFT_EXCEL_BASE_URL') as string
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

    headers.Authorization = `Bearer ${this.creds.accessToken}`

    const response = await fetch(url.toString(), {
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
        default: throw new Error(`Microsoft Excel (OneDrive) API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
