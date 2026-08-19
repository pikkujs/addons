import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/addon/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /v1/users/me": {
    "path": [],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/users/{user_id}": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/users": {
    "path": [],
    "query": [
      "start_cursor",
      "page_size"
    ],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/pages": {
    "path": [],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/pages/{page_id}": {
    "path": [
      "page_id"
    ],
    "query": [
      "filter_properties"
    ],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "PATCH /v1/pages/{page_id}": {
    "path": [
      "page_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/pages/{page_id}/move": {
    "path": [
      "page_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/pages/{page_id}/properties/{property_id}": {
    "path": [
      "page_id",
      "property_id"
    ],
    "query": [
      "start_cursor",
      "page_size"
    ],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/pages/{page_id}/markdown": {
    "path": [
      "page_id"
    ],
    "query": [
      "include_transcript"
    ],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "PATCH /v1/pages/{page_id}/markdown": {
    "path": [
      "page_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/async_tasks/{task_id}": {
    "path": [
      "task_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/blocks/{block_id}": {
    "path": [
      "block_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "PATCH /v1/blocks/{block_id}": {
    "path": [
      "block_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "DELETE /v1/blocks/{block_id}": {
    "path": [
      "block_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/blocks/{block_id}/children": {
    "path": [
      "block_id"
    ],
    "query": [
      "start_cursor",
      "page_size"
    ],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "PATCH /v1/blocks/{block_id}/children": {
    "path": [
      "block_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/data_sources/{data_source_id}": {
    "path": [
      "data_source_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "PATCH /v1/data_sources/{data_source_id}": {
    "path": [
      "data_source_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/data_sources/{data_source_id}/query": {
    "path": [
      "data_source_id"
    ],
    "query": [
      "filter_properties"
    ],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/data_sources": {
    "path": [],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/data_sources/{data_source_id}/templates": {
    "path": [
      "data_source_id"
    ],
    "query": [
      "name",
      "start_cursor",
      "page_size"
    ],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/databases/{database_id}": {
    "path": [
      "database_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "PATCH /v1/databases/{database_id}": {
    "path": [
      "database_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/databases": {
    "path": [],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/search": {
    "path": [],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/comments": {
    "path": [],
    "query": [
      "block_id",
      "start_cursor",
      "page_size"
    ],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/comments": {
    "path": [],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/comments/{comment_id}": {
    "path": [
      "comment_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "PATCH /v1/comments/{comment_id}": {
    "path": [
      "comment_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "DELETE /v1/comments/{comment_id}": {
    "path": [
      "comment_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/file_uploads": {
    "path": [],
    "query": [
      "status",
      "start_cursor",
      "page_size"
    ],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/file_uploads": {
    "path": [],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/file_uploads/{file_upload_id}/send": {
    "path": [
      "file_upload_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/file_uploads/{file_upload_id}/complete": {
    "path": [
      "file_upload_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/file_uploads/{file_upload_id}": {
    "path": [
      "file_upload_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/custom_emojis": {
    "path": [],
    "query": [
      "start_cursor",
      "page_size",
      "name"
    ],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/views": {
    "path": [],
    "query": [
      "database_id",
      "data_source_id",
      "start_cursor",
      "page_size"
    ],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/views": {
    "path": [],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/views/{view_id}": {
    "path": [
      "view_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "PATCH /v1/views/{view_id}": {
    "path": [
      "view_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "DELETE /v1/views/{view_id}": {
    "path": [
      "view_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/views/{view_id}/queries": {
    "path": [
      "view_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "GET /v1/views/{view_id}/queries/{query_id}": {
    "path": [
      "view_id",
      "query_id"
    ],
    "query": [
      "start_cursor",
      "page_size"
    ],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "DELETE /v1/views/{view_id}/queries/{query_id}": {
    "path": [
      "view_id",
      "query_id"
    ],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/blocks/meeting_notes/query": {
    "path": [],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "404": "",
      "406": "",
      "409": "",
      "429": "",
      "500": "",
      "503": "",
      "504": "",
      "529": ""
    }
  },
  "POST /v1/oauth/token": {
    "path": [],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "500": ""
    }
  },
  "POST /v1/oauth/revoke": {
    "path": [],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "500": ""
    }
  },
  "POST /v1/oauth/introspect": {
    "path": [],
    "query": [],
    "headers": [
      "Notion-Version"
    ],
    "errors": {
      "400": "",
      "401": "",
      "403": "",
      "500": ""
    }
  }
}

export class NotionService {
  private baseUrl: string

  constructor(variables: TypedVariablesService) {
    this.baseUrl = variables.get('NOTION_BASE_URL') as string
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
        default: throw new Error(`Notion API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
