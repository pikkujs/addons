import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /smart-lists/{listId}/contacts": {
    "path": [
      "listId"
    ],
    "query": [
      "limit"
    ],
    "headers": []
  },
  "POST /smart-lists/{listId}/contacts": {
    "path": [
      "listId"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /smart-lists/{listId}/contacts": {
    "path": [
      "listId"
    ],
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
  "GET /smart-lists": {
    "path": [],
    "query": [
      "limit"
    ],
    "headers": []
  },
  "POST /smart-lists": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /smart-lists/{listId}": {
    "path": [
      "listId"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /smart-lists/{listId}": {
    "path": [
      "listId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /smart-lists/{listId}": {
    "path": [
      "listId"
    ],
    "query": [],
    "headers": []
  }
}

export class AutomizyService {
  private baseUrl: string

  constructor(private creds: { token: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('AUTOMIZY_BASE_URL') as string
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

    headers.Authorization = `Bearer ${this.creds.token}`

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
        default: throw new Error(`Automizy API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
