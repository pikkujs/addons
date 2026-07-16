import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "POST /companies/new": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PATCH /companies/{companyId}/edit": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "GET /companies/{companyId}": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "GET /companies": {
    "path": [],
    "query": [
      "limit",
      "start"
    ],
    "headers": []
  },
  "DELETE /companies/{companyId}/delete": {
    "path": [
      "companyId"
    ],
    "query": [],
    "headers": []
  },
  "POST /contacts/new": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PATCH /contacts/{contactId}/edit": {
    "path": [
      "contactId"
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
  "GET /contacts": {
    "path": [],
    "query": [
      "limit",
      "start",
      "search"
    ],
    "headers": []
  },
  "DELETE /contacts/{contactId}/delete": {
    "path": [
      "contactId"
    ],
    "query": [],
    "headers": []
  },
  "POST /emails/{campaignEmailId}/contact/{contactId}/send": {
    "path": [
      "campaignEmailId",
      "contactId"
    ],
    "query": [],
    "headers": []
  },
  "POST /contacts/{contactId}/dnc/{channel}/{action}": {
    "path": [
      "contactId",
      "channel",
      "action"
    ],
    "query": [],
    "headers": []
  },
  "POST /contacts/{contactId}/points/{action}/{points}": {
    "path": [
      "contactId",
      "action",
      "points"
    ],
    "query": [],
    "headers": []
  },
  "POST /segments/{segmentId}/contact/{contactId}/add": {
    "path": [
      "segmentId",
      "contactId"
    ],
    "query": [],
    "headers": []
  },
  "POST /segments/{segmentId}/contact/{contactId}/remove": {
    "path": [
      "segmentId",
      "contactId"
    ],
    "query": [],
    "headers": []
  },
  "POST /campaigns/{campaignId}/contact/{contactId}/add": {
    "path": [
      "campaignId",
      "contactId"
    ],
    "query": [],
    "headers": []
  },
  "POST /campaigns/{campaignId}/contact/{contactId}/remove": {
    "path": [
      "campaignId",
      "contactId"
    ],
    "query": [],
    "headers": []
  },
  "POST /companies/{companyId}/contact/{contactId}/add": {
    "path": [
      "companyId",
      "contactId"
    ],
    "query": [],
    "headers": []
  },
  "POST /companies/{companyId}/contact/{contactId}/remove": {
    "path": [
      "companyId",
      "contactId"
    ],
    "query": [],
    "headers": []
  },
  "POST /emails/{segmentEmailId}/send": {
    "path": [
      "segmentEmailId"
    ],
    "query": [],
    "headers": []
  }
}

export class MauticService {
  private baseUrl: string

  constructor(private creds: { apiKey: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('MAUTIC_BASE_URL') as string
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

    headers.Authorization = `Bearer ${this.creds.apiKey}`

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
        default: throw new Error(`Mautic API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
