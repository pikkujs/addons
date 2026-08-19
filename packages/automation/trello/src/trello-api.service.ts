import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/addon/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "POST /boards": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /boards/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /boards/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /boards/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /boards/{id}/members": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /boards/{id}/members": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /boards/{id}/members/{idMember}": {
    "path": [
      "id",
      "idMember"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /boards/{id}/members/{idMember}": {
    "path": [
      "id",
      "idMember"
    ],
    "query": [],
    "headers": []
  },
  "POST /cards": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /cards/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /cards/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /cards/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "POST /cards/{cardId}/actions/comments": {
    "path": [
      "cardId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /cards/{cardId}/actions/{commentId}/comments": {
    "path": [
      "cardId",
      "commentId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /cards/{cardId}/actions/{commentId}/comments": {
    "path": [
      "cardId",
      "commentId"
    ],
    "query": [],
    "headers": []
  },
  "POST /lists": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /lists/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /lists/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /lists/{id}/closed": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /boards/{id}/lists": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /lists/{id}/cards": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /cards/{cardId}/attachments": {
    "path": [
      "cardId"
    ],
    "query": [],
    "headers": []
  },
  "POST /cards/{cardId}/attachments": {
    "path": [
      "cardId"
    ],
    "query": [],
    "headers": []
  },
  "GET /cards/{cardId}/attachments/{id}": {
    "path": [
      "cardId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /cards/{cardId}/attachments/{id}": {
    "path": [
      "cardId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /cards/{cardId}/checklists": {
    "path": [
      "cardId"
    ],
    "query": [],
    "headers": []
  },
  "POST /cards/{cardId}/checklists": {
    "path": [
      "cardId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /cards/{cardId}/checklists/{id}": {
    "path": [
      "cardId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /checklists/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /cards/{cardId}/checkItem/{checkItemId}": {
    "path": [
      "cardId",
      "checkItemId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /cards/{cardId}/checkItem/{checkItemId}": {
    "path": [
      "cardId",
      "checkItemId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /cards/{cardId}/checkItem/{checkItemId}": {
    "path": [
      "cardId",
      "checkItemId"
    ],
    "query": [],
    "headers": []
  },
  "POST /checklists/{checklistId}/checkItems": {
    "path": [
      "checklistId"
    ],
    "query": [],
    "headers": []
  },
  "GET /cards/{cardId}/checkItemStates": {
    "path": [
      "cardId"
    ],
    "query": [],
    "headers": []
  },
  "POST /labels": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /labels/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /labels/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /labels/{id}": {
    "path": [
      "id"
    ],
    "query": [],
    "headers": []
  },
  "GET /board/{idBoard}/labels": {
    "path": [
      "idBoard"
    ],
    "query": [],
    "headers": []
  },
  "POST /cards/{cardId}/idLabels": {
    "path": [
      "cardId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /cards/{cardId}/idLabels/{id}": {
    "path": [
      "cardId",
      "id"
    ],
    "query": [],
    "headers": []
  }
}

export class TrelloService {
  private baseUrl: string

  constructor(private creds: { apiKey: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('TRELLO_BASE_URL') as string
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
        default: throw new Error(`Trello API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
