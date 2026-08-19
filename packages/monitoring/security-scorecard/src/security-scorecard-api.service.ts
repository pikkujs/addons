import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/addon/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /companies/{scorecardIdentifier}": {
    "path": [
      "scorecardIdentifier"
    ],
    "query": [],
    "headers": []
  },
  "GET /companies/{scorecardIdentifier}/factors": {
    "path": [
      "scorecardIdentifier"
    ],
    "query": [],
    "headers": []
  },
  "GET /companies/{scorecardIdentifier}/history/factors": {
    "path": [
      "scorecardIdentifier"
    ],
    "query": [
      "date_from",
      "date_to"
    ],
    "headers": []
  },
  "GET /companies/{scorecardIdentifier}/history/score": {
    "path": [
      "scorecardIdentifier"
    ],
    "query": [
      "from",
      "to"
    ],
    "headers": []
  },
  "GET /companies/{scorecardIdentifier}/score-plans/by-target/{score}": {
    "path": [
      "scorecardIdentifier",
      "score"
    ],
    "query": [],
    "headers": []
  },
  "GET /industries/{industry}/score": {
    "path": [
      "industry"
    ],
    "query": [],
    "headers": []
  },
  "GET /industries/{industry}/history/factors": {
    "path": [
      "industry"
    ],
    "query": [],
    "headers": []
  },
  "GET /industries/{industry}/history/factors/historical": {
    "path": [
      "industry"
    ],
    "query": [
      "from",
      "to"
    ],
    "headers": []
  },
  "POST /invitations": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /portfolios": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /portfolios": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /portfolios/{portfolioId}": {
    "path": [
      "portfolioId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /portfolios/{portfolioId}": {
    "path": [
      "portfolioId"
    ],
    "query": [],
    "headers": []
  },
  "GET /portfolios/{portfolioId}/companies": {
    "path": [
      "portfolioId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /portfolios/{portfolioId}/companies/{domain}": {
    "path": [
      "portfolioId",
      "domain"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /portfolios/{portfolioId}/companies/{domain}": {
    "path": [
      "portfolioId",
      "domain"
    ],
    "query": [],
    "headers": []
  },
  "GET /reports/recent": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /reports/{reportType}": {
    "path": [
      "reportType"
    ],
    "query": [],
    "headers": []
  },
  "GET /reports/files/{file}": {
    "path": [
      "file"
    ],
    "query": [],
    "headers": []
  }
}

export class SecurityScorecardService {
  private baseUrl: string

  constructor(private creds: { apiKey: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('SECURITY_SCORECARD_BASE_URL') as string
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
        default: throw new Error(`SecurityScorecard API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
