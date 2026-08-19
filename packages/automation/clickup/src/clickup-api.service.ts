import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/addon/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "POST /task/{taskId}/checklist": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /checklist/{checklistId}": {
    "path": [
      "checklistId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /checklist/{checklistId}": {
    "path": [
      "checklistId"
    ],
    "query": [],
    "headers": []
  },
  "GET /task/{taskId}/comment": {
    "path": [
      "taskId"
    ],
    "query": [
      "limit"
    ],
    "headers": []
  },
  "POST /task/{taskId}/comment": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /comment/{commentId}": {
    "path": [
      "commentId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /comment/{commentId}": {
    "path": [
      "commentId"
    ],
    "query": [],
    "headers": []
  },
  "GET /space/{spaceId}/folder": {
    "path": [
      "spaceId"
    ],
    "query": [
      "archived"
    ],
    "headers": []
  },
  "POST /space/{spaceId}/folder": {
    "path": [
      "spaceId"
    ],
    "query": [],
    "headers": []
  },
  "GET /folder/{folderId}": {
    "path": [
      "folderId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /folder/{folderId}": {
    "path": [
      "folderId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /folder/{folderId}": {
    "path": [
      "folderId"
    ],
    "query": [],
    "headers": []
  },
  "GET /team/{teamId}/goal": {
    "path": [
      "teamId"
    ],
    "query": [
      "limit"
    ],
    "headers": []
  },
  "POST /team/{teamId}/goal": {
    "path": [
      "teamId"
    ],
    "query": [],
    "headers": []
  },
  "GET /goal/{goalId}": {
    "path": [
      "goalId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /goal/{goalId}": {
    "path": [
      "goalId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /goal/{goalId}": {
    "path": [
      "goalId"
    ],
    "query": [],
    "headers": []
  },
  "GET /list/{listId}/field": {
    "path": [
      "listId"
    ],
    "query": [],
    "headers": []
  },
  "GET /folder/{folderId}/list": {
    "path": [
      "folderId"
    ],
    "query": [
      "archived"
    ],
    "headers": []
  },
  "POST /folder/{folderId}/list": {
    "path": [
      "folderId"
    ],
    "query": [],
    "headers": []
  },
  "GET /list/{listId}/member": {
    "path": [
      "listId"
    ],
    "query": [],
    "headers": []
  },
  "GET /list/{listId}": {
    "path": [
      "listId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /list/{listId}": {
    "path": [
      "listId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /list/{listId}": {
    "path": [
      "listId"
    ],
    "query": [],
    "headers": []
  },
  "GET /space/{spaceId}/tag": {
    "path": [
      "spaceId"
    ],
    "query": [],
    "headers": []
  },
  "POST /space/{spaceId}/tag": {
    "path": [
      "spaceId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /space/{spaceId}/tag/{tagName}": {
    "path": [
      "spaceId",
      "tagName"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /space/{spaceId}/tag/{tagName}": {
    "path": [
      "spaceId",
      "tagName"
    ],
    "query": [],
    "headers": []
  },
  "GET /list/{listId}/task": {
    "path": [
      "listId"
    ],
    "query": [
      "archived"
    ],
    "headers": []
  },
  "POST /list/{listId}/task": {
    "path": [
      "listId"
    ],
    "query": [],
    "headers": []
  },
  "GET /task/{taskId}": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /task/{taskId}": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /task/{taskId}": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": []
  },
  "GET /task/{taskId}/member": {
    "path": [
      "taskId"
    ],
    "query": [],
    "headers": []
  },
  "POST /task/{taskId}/field/{fieldId}": {
    "path": [
      "taskId",
      "fieldId"
    ],
    "query": [],
    "headers": []
  },
  "POST /task/{taskId}/tag/{tagName}": {
    "path": [
      "taskId",
      "tagName"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /task/{taskId}/tag/{tagName}": {
    "path": [
      "taskId",
      "tagName"
    ],
    "query": [],
    "headers": []
  },
  "GET /team/{teamId}/time_entries": {
    "path": [
      "teamId"
    ],
    "query": [],
    "headers": []
  },
  "POST /team/{teamId}/time_entries": {
    "path": [
      "teamId"
    ],
    "query": [],
    "headers": []
  },
  "GET /team/{teamId}/time_entries/{timeEntryId}": {
    "path": [
      "teamId",
      "timeEntryId"
    ],
    "query": [],
    "headers": []
  },
  "PUT /team/{teamId}/time_entries/{timeEntryId}": {
    "path": [
      "teamId",
      "timeEntryId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /team/{teamId}/time_entries/{timeEntryId}": {
    "path": [
      "teamId",
      "timeEntryId"
    ],
    "query": [],
    "headers": []
  },
  "POST /team/{teamId}/time_entries/start": {
    "path": [
      "teamId"
    ],
    "query": [],
    "headers": []
  },
  "POST /team/{teamId}/time_entries/stop": {
    "path": [
      "teamId"
    ],
    "query": [],
    "headers": []
  }
}

export class ClickupService {
  private baseUrl: string

  constructor(private creds: { apiKey: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('CLICKUP_BASE_URL') as string
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
        default: throw new Error(`ClickUp API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
