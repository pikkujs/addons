import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const HARVEST_OAUTH2_CONFIG = {
  tokenSecretId: 'HARVEST_TOKENS',
  authorizationUrl: "https://example.com/oauth2/authorize",
  tokenUrl: "https://example.com/oauth2/token",
  scopes: ["read","write"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /clients": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /clients": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /clients/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /clients/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /clients/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /company": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /contacts": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /contacts": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /contacts/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /contacts/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /contacts/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /estimates": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /estimates": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /estimates/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /estimates/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /estimates/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /expenses": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /expenses": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /expenses/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /expenses/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /expenses/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /invoices": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /invoices": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /invoices/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /invoices/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /invoices/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /projects": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /projects": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /projects/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /projects/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /projects/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /tasks": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /tasks": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /tasks/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /tasks/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /tasks/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /time_entries": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /time_entries": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /time_entries/duration": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /time_entries/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /time_entries/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /time_entries/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /time_entries/{id}/external_reference": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /time_entries/{id}/restart": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /time_entries/{id}/stop": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /users": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /users": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /users/me": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /users/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /users/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  }
}

export class HarvestService {
  private baseUrl: string

  constructor(private creds: { accessToken: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('HARVEST_BASE_URL') as string
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
        default: throw new Error(`Harvest API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
