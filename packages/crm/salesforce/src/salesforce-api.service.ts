import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const SALESFORCE_OAUTH2_CONFIG = {
  tokenSecretId: 'SALESFORCE_TOKENS',
  authorizationUrl: "https://example.com/oauth2/authorize",
  tokenUrl: "https://example.com/oauth2/token",
  scopes: ["read","write"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "POST /sobjects/Account": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /sobjects/Account/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/Account/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /sobjects/Account/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/Account/{externalIdField}/{externalIdValue}": {
    "path": [
      "externalIdField",
      "externalIdValue"
    ],
    "query": [],
    "headers": []
  },
  "GET /query/Account": {
    "path": [],
    "query": [
      "q",
      "limit"
    ],
    "headers": []
  },
  "GET /query/Account/summary": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Account/notes": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Contact": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /sobjects/Contact/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/Contact/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /sobjects/Contact/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/Contact/{externalIdField}/{externalIdValue}": {
    "path": [
      "externalIdField",
      "externalIdValue"
    ],
    "query": [],
    "headers": []
  },
  "GET /query/Contact": {
    "path": [],
    "query": [
      "q",
      "limit"
    ],
    "headers": []
  },
  "GET /query/Contact/summary": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Contact/notes": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Contact/campaign-members": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Lead": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /sobjects/Lead/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/Lead/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /sobjects/Lead/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/Lead/{externalIdField}/{externalIdValue}": {
    "path": [
      "externalIdField",
      "externalIdValue"
    ],
    "query": [],
    "headers": []
  },
  "GET /query/Lead": {
    "path": [],
    "query": [
      "q",
      "limit"
    ],
    "headers": []
  },
  "GET /query/Lead/summary": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Lead/notes": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Lead/campaign-members": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Opportunity": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /sobjects/Opportunity/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/Opportunity/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /sobjects/Opportunity/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/Opportunity/{externalIdField}/{externalIdValue}": {
    "path": [
      "externalIdField",
      "externalIdValue"
    ],
    "query": [],
    "headers": []
  },
  "GET /query/Opportunity": {
    "path": [],
    "query": [
      "q",
      "limit"
    ],
    "headers": []
  },
  "GET /query/Opportunity/summary": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Opportunity/notes": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Case": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /sobjects/Case/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/Case/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /sobjects/Case/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /query/Case": {
    "path": [],
    "query": [
      "q",
      "limit"
    ],
    "headers": []
  },
  "GET /query/Case/summary": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Case/comments": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Task": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /sobjects/Task/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/Task/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /sobjects/Task/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /query/Task": {
    "path": [],
    "query": [
      "q",
      "limit"
    ],
    "headers": []
  },
  "GET /query/Task/summary": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /sobjects/User/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /query/User": {
    "path": [],
    "query": [
      "q",
      "limit"
    ],
    "headers": []
  },
  "POST /sobjects/CustomObject": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /sobjects/CustomObject/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/CustomObject/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /sobjects/CustomObject/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/CustomObject/{externalIdField}/{externalIdValue}": {
    "path": [
      "externalIdField",
      "externalIdValue"
    ],
    "query": [],
    "headers": []
  },
  "GET /query/CustomObject": {
    "path": [],
    "query": [
      "q",
      "limit"
    ],
    "headers": []
  },
  "POST /sobjects/Document": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /actions/custom/flow": {
    "path": [],
    "query": [
      "limit"
    ],
    "headers": []
  },
  "POST /actions/custom/flow/{flowName}": {
    "path": [
      "flowName"
    ],
    "query": [],
    "headers": []
  },
  "POST /sobjects/Attachment": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /sobjects/Attachment/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /sobjects/Attachment/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /sobjects/Attachment/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /query/Attachment": {
    "path": [],
    "query": [
      "q",
      "limit"
    ],
    "headers": []
  },
  "GET /query/Attachment/summary": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /search/query": {
    "path": [],
    "query": [
      "query"
    ],
    "headers": []
  }
}

export class SalesforceService {
  private baseUrl: string

  constructor(private creds: { accessToken: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('SALESFORCE_BASE_URL') as string
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
        default: throw new Error(`Salesforce API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
