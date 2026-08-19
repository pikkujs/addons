import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/addon/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /projects/{projectId}/issues": {
    "path": [
      "projectId"
    ],
    "query": [
      "state",
      "search",
      "per_page"
    ],
    "headers": []
  },
  "POST /projects/{projectId}/issues": {
    "path": [
      "projectId"
    ],
    "query": [],
    "headers": []
  },
  "GET /projects/{projectId}/issues/{issueNumber}": {
    "path": [
      "projectId",
      "issueNumber"
    ],
    "query": [],
    "headers": []
  },
  "PUT /projects/{projectId}/issues/{issueNumber}": {
    "path": [
      "projectId",
      "issueNumber"
    ],
    "query": [],
    "headers": []
  },
  "POST /projects/{projectId}/issues/{issueNumber}/notes": {
    "path": [
      "projectId",
      "issueNumber"
    ],
    "query": [],
    "headers": []
  },
  "POST /projects/{projectId}/issues/{issueNumber}/lock": {
    "path": [
      "projectId",
      "issueNumber"
    ],
    "query": [],
    "headers": []
  },
  "GET /projects/{projectId}": {
    "path": [
      "projectId"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{owner}/projects": {
    "path": [
      "owner"
    ],
    "query": [],
    "headers": []
  },
  "GET /projects/{projectId}/releases": {
    "path": [
      "projectId"
    ],
    "query": [
      "order_by",
      "sort",
      "per_page"
    ],
    "headers": []
  },
  "POST /projects/{projectId}/releases": {
    "path": [
      "projectId"
    ],
    "query": [],
    "headers": []
  },
  "GET /projects/{projectId}/releases/{tagName}": {
    "path": [
      "projectId",
      "tagName"
    ],
    "query": [],
    "headers": []
  },
  "PUT /projects/{projectId}/releases/{tagName}": {
    "path": [
      "projectId",
      "tagName"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /projects/{projectId}/releases/{tagName}": {
    "path": [
      "projectId",
      "tagName"
    ],
    "query": [],
    "headers": []
  },
  "GET /projects/{projectId}/repository/files/{filePath}": {
    "path": [
      "projectId",
      "filePath"
    ],
    "query": [
      "ref"
    ],
    "headers": []
  },
  "POST /projects/{projectId}/repository/files/{filePath}": {
    "path": [
      "projectId",
      "filePath"
    ],
    "query": [],
    "headers": []
  },
  "PUT /projects/{projectId}/repository/files/{filePath}": {
    "path": [
      "projectId",
      "filePath"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /projects/{projectId}/repository/files/{filePath}": {
    "path": [
      "projectId",
      "filePath"
    ],
    "query": [],
    "headers": []
  },
  "GET /projects/{projectId}/repository/tree": {
    "path": [
      "projectId"
    ],
    "query": [
      "path",
      "ref",
      "recursive",
      "per_page"
    ],
    "headers": []
  }
}

export class GitlabService {
  private baseUrl: string

  constructor(private creds: { apiKey: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('GITLAB_BASE_URL') as string
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
        default: throw new Error(`GitLab API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
