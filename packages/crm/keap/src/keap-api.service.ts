import { OAuth2Client } from '@pikku/core/oauth2'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'
import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const KEAP_OAUTH2_CONFIG = {
  tokenSecretId: 'KEAP_TOKENS',
  authorizationUrl: "https://example.com/oauth2/authorize",
  tokenUrl: "https://example.com/oauth2/token",
  scopes: ["read","write"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /companies": {
    "path": [],
    "query": [
      "limit",
      "offset"
    ],
    "headers": []
  },
  "POST /companies": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /contacts": {
    "path": [],
    "query": [
      "limit",
      "email"
    ],
    "headers": []
  },
  "PUT /contacts": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /contacts/{contactId}": {
    "path": [
      "contactId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /contacts/{contactId}": {
    "path": [
      "contactId"
    ],
    "query": [],
    "headers": []
  },
  "GET /notes": {
    "path": [],
    "query": [
      "limit"
    ],
    "headers": []
  },
  "POST /notes": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /notes/{noteId}": {
    "path": [
      "noteId"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /notes/{noteId}": {
    "path": [
      "noteId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /notes/{noteId}": {
    "path": [
      "noteId"
    ],
    "query": [],
    "headers": []
  },
  "GET /contacts/{contactId}/tags": {
    "path": [
      "contactId"
    ],
    "query": [
      "limit"
    ],
    "headers": []
  },
  "POST /contacts/{contactId}/tags": {
    "path": [
      "contactId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /contacts/{contactId}/tags": {
    "path": [
      "contactId"
    ],
    "query": [
      "ids"
    ],
    "headers": []
  },
  "GET /orders": {
    "path": [],
    "query": [
      "limit"
    ],
    "headers": []
  },
  "POST /orders": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /orders/{orderId}": {
    "path": [
      "orderId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orders/{orderId}": {
    "path": [
      "orderId"
    ],
    "query": [],
    "headers": []
  },
  "GET /products": {
    "path": [],
    "query": [
      "limit"
    ],
    "headers": []
  },
  "POST /products": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /products/{productId}": {
    "path": [
      "productId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /products/{productId}": {
    "path": [
      "productId"
    ],
    "query": [],
    "headers": []
  },
  "GET /emails": {
    "path": [],
    "query": [
      "limit"
    ],
    "headers": []
  },
  "POST /emails": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /emails/{emailRecordId}": {
    "path": [
      "emailRecordId"
    ],
    "query": [],
    "headers": []
  },
  "POST /emails/queue": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /files": {
    "path": [],
    "query": [
      "limit"
    ],
    "headers": []
  },
  "POST /files": {
    "path": [],
    "query": [],
    "headers": []
  },
  "DELETE /files/{fileId}": {
    "path": [
      "fileId"
    ],
    "query": [],
    "headers": []
  }
}

export class KeapService {
  private baseUrl: string
  private oauth: OAuth2Client

  constructor(secrets: TypedSecretService, variables: TypedVariablesService) {
    this.baseUrl = variables.get('KEAP_BASE_URL') as string
    this.oauth = new OAuth2Client(
      KEAP_OAUTH2_CONFIG,
      'KEAP_APP_CREDENTIALS',
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
        default: throw new Error(`Keap API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
