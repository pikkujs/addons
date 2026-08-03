import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const TWIST_OAUTH2_CONFIG = {
  tokenSecretId: 'TWIST_TOKENS',
  authorizationUrl: "https://example.com/oauth2/authorize",
  tokenUrl: "https://example.com/oauth2/token",
  scopes: ["read","write"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "POST /channels/add": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /channels/remove": {
    "path": [],
    "query": [
      "id"
    ],
    "headers": []
  },
  "GET /channels/getone": {
    "path": [],
    "query": [
      "id"
    ],
    "headers": []
  },
  "GET /channels/get": {
    "path": [],
    "query": [
      "workspace_id"
    ],
    "headers": []
  },
  "POST /channels/update": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /channels/archive": {
    "path": [],
    "query": [
      "id"
    ],
    "headers": []
  },
  "POST /channels/unarchive": {
    "path": [],
    "query": [
      "id"
    ],
    "headers": []
  },
  "POST /comments/add": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /comments/remove": {
    "path": [],
    "query": [
      "id"
    ],
    "headers": []
  },
  "GET /comments/getone": {
    "path": [],
    "query": [
      "id"
    ],
    "headers": []
  },
  "GET /comments/get": {
    "path": [],
    "query": [
      "thread_id"
    ],
    "headers": []
  },
  "POST /comments/update": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /conversation_messages/add": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /conversation_messages/getone": {
    "path": [],
    "query": [
      "id"
    ],
    "headers": []
  },
  "GET /conversation_messages/get": {
    "path": [],
    "query": [
      "conversation_id"
    ],
    "headers": []
  },
  "POST /conversation_messages/remove": {
    "path": [],
    "query": [
      "id"
    ],
    "headers": []
  },
  "POST /conversation_messages/update": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /threads/add": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /threads/remove": {
    "path": [],
    "query": [
      "id"
    ],
    "headers": []
  },
  "GET /threads/getone": {
    "path": [],
    "query": [
      "id"
    ],
    "headers": []
  },
  "GET /threads/get": {
    "path": [],
    "query": [
      "channel_id"
    ],
    "headers": []
  },
  "POST /threads/update": {
    "path": [],
    "query": [],
    "headers": []
  }
}

export class TwistService {
  private baseUrl: string

  constructor(private creds: { accessToken: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('TWIST_BASE_URL') as string
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
        default: throw new Error(`Twist API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
