import { OAuth2Client } from '@pikku/core/oauth2'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'
import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const QUICKBOOKS_OAUTH2_CONFIG = {
  tokenSecretId: 'QUICKBOOKS_TOKENS',
  authorizationUrl: "https://example.com/oauth2/authorize",
  tokenUrl: "https://example.com/oauth2/token",
  scopes: ["read","write"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /company/{companyId}/customer": {
    "path": [
      "companyId"
    ],
    "query": [
      "query"
    ],
    "headers": []
  },
  "POST /company/{companyId}/customer": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "POST /company/{companyId}/customer/update": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/customer/{id}": {
    "path": [
      "companyId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/invoice": {
    "path": [
      "companyId"
    ],
    "query": [
      "query"
    ],
    "headers": []
  },
  "POST /company/{companyId}/invoice": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "POST /company/{companyId}/invoice/update": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/invoice/{id}": {
    "path": [
      "companyId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/item": {
    "path": [
      "companyId"
    ],
    "query": [
      "query"
    ],
    "headers": []
  },
  "GET /company/{companyId}/item/{id}": {
    "path": [
      "companyId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/payment": {
    "path": [
      "companyId"
    ],
    "query": [
      "query"
    ],
    "headers": []
  },
  "POST /company/{companyId}/payment": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "POST /company/{companyId}/payment/update": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/payment/{id}": {
    "path": [
      "companyId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/bill": {
    "path": [
      "companyId"
    ],
    "query": [
      "query"
    ],
    "headers": []
  },
  "POST /company/{companyId}/bill": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "POST /company/{companyId}/bill/update": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/bill/{id}": {
    "path": [
      "companyId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/estimate": {
    "path": [
      "companyId"
    ],
    "query": [
      "query"
    ],
    "headers": []
  },
  "POST /company/{companyId}/estimate": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "POST /company/{companyId}/estimate/update": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/estimate/{id}": {
    "path": [
      "companyId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/employee": {
    "path": [
      "companyId"
    ],
    "query": [
      "query"
    ],
    "headers": []
  },
  "POST /company/{companyId}/employee": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "POST /company/{companyId}/employee/update": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/employee/{id}": {
    "path": [
      "companyId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/vendor": {
    "path": [
      "companyId"
    ],
    "query": [
      "query"
    ],
    "headers": []
  },
  "POST /company/{companyId}/vendor": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "POST /company/{companyId}/vendor/update": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/vendor/{id}": {
    "path": [
      "companyId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /company/{companyId}/reports/TransactionList": {
    "path": [
      "companyId"
    ],
    "query": [
      "start_date",
      "end_date"
    ],
    "headers": []
  }
}

export class QuickbooksService {
  private baseUrl: string
  private oauth: OAuth2Client

  constructor(secrets: TypedSecretService, variables: TypedVariablesService) {
    this.baseUrl = variables.get('QUICKBOOKS_BASE_URL') as string
    this.oauth = new OAuth2Client(
      QUICKBOOKS_OAUTH2_CONFIG,
      'QUICKBOOKS_APP_CREDENTIALS',
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
        default: throw new Error(`QuickBooks Online API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
