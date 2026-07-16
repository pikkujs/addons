import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /admins": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /admins": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /admins/{adminId}": {
    "path": [
      "adminId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /admins/{adminId}": {
    "path": [
      "adminId"
    ],
    "query": [],
    "headers": []
  },
  "GET /containers/{containerId}": {
    "path": [
      "containerId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /containers/{containerId}/tasks": {
    "path": [
      "containerId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /containers/{containerId}/tasks/update": {
    "path": [
      "containerId"
    ],
    "query": [],
    "headers": []
  },
  "POST /destinations": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /destinations/{destinationId}": {
    "path": [
      "destinationId"
    ],
    "query": [],
    "headers": []
  },
  "GET /hubs": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /hubs": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /hubs/{hubId}": {
    "path": [
      "hubId"
    ],
    "query": [],
    "headers": []
  },
  "GET /organization": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /organizations/{organizationId}": {
    "path": [
      "organizationId"
    ],
    "query": [],
    "headers": []
  },
  "POST /recipients": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /recipients/{recipientId}": {
    "path": [
      "recipientId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /recipients/{recipientId}": {
    "path": [
      "recipientId"
    ],
    "query": [],
    "headers": []
  },
  "POST /tasks": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /tasks/all": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /tasks/{taskId}": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /tasks/{taskId}": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /tasks/{taskId}": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": []
  },
  "POST /tasks/{taskId}/clone": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": []
  },
  "POST /tasks/{taskId}/complete": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": []
  },
  "GET /teams": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /teams": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /teams/{teamId}": {
    "path": [
      "teamId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /teams/{teamId}": {
    "path": [
      "teamId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /teams/{teamId}": {
    "path": [
      "teamId"
    ],
    "query": [],
    "headers": []
  },
  "GET /teams/{teamId}/estimate": {
    "path": [
      "teamId"
    ],
    "query": [],
    "headers": []
  },
  "POST /teams/{teamId}/dispatch": {
    "path": [
      "teamId"
    ],
    "query": [],
    "headers": []
  },
  "GET /workers": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /workers": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /workers/{workerId}": {
    "path": [
      "workerId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /workers/{workerId}": {
    "path": [
      "workerId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /workers/{workerId}": {
    "path": [
      "workerId"
    ],
    "query": [],
    "headers": []
  },
  "GET /workers/{workerId}/schedule": {
    "path": [
      "workerId"
    ],
    "query": [],
    "headers": []
  }
}

export class OnfleetService {
  private baseUrl: string

  constructor(private creds: { apiKey: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('ONFLEET_BASE_URL') as string
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
        default: throw new Error(`Onfleet API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
