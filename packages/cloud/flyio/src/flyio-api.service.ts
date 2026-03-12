import type { FlyioSecrets } from './flyio.secret.js'
import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /apps": {
    "path": [],
    "query": [
      "org_slug",
      "app_role"
    ],
    "headers": []
  },
  "POST /apps": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "GET /apps/{app_name}": {
    "path": [
      "app_name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /apps/{app_name}": {
    "path": [
      "app_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /apps/{app_name}/certificates": {
    "path": [
      "app_name"
    ],
    "query": [
      "filter",
      "cursor",
      "limit"
    ],
    "headers": []
  },
  "POST /apps/{app_name}/certificates/acme": {
    "path": [
      "app_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Unprocessable Entity"
    }
  },
  "POST /apps/{app_name}/certificates/custom": {
    "path": [
      "app_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Unprocessable Entity"
    }
  },
  "GET /apps/{app_name}/certificates/{hostname}": {
    "path": [
      "app_name",
      "hostname"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /apps/{app_name}/certificates/{hostname}": {
    "path": [
      "app_name",
      "hostname"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /apps/{app_name}/certificates/{hostname}/acme": {
    "path": [
      "app_name",
      "hostname"
    ],
    "query": [],
    "headers": []
  },
  "POST /apps/{app_name}/certificates/{hostname}/check": {
    "path": [
      "app_name",
      "hostname"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /apps/{app_name}/certificates/{hostname}/custom": {
    "path": [
      "app_name",
      "hostname"
    ],
    "query": [],
    "headers": []
  },
  "POST /apps/{app_name}/deploy_token": {
    "path": [
      "app_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /apps/{app_name}/ip_assignments": {
    "path": [
      "app_name"
    ],
    "query": [],
    "headers": []
  },
  "POST /apps/{app_name}/ip_assignments": {
    "path": [
      "app_name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /apps/{app_name}/ip_assignments/{ip}": {
    "path": [
      "app_name",
      "ip"
    ],
    "query": [],
    "headers": []
  },
  "GET /apps/{app_name}/machines": {
    "path": [
      "app_name"
    ],
    "query": [
      "include_deleted",
      "region",
      "state",
      "summary"
    ],
    "headers": []
  },
  "POST /apps/{app_name}/machines": {
    "path": [
      "app_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /apps/{app_name}/machines/{machine_id}": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /apps/{app_name}/machines/{machine_id}": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "DELETE /apps/{app_name}/machines/{machine_id}": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [
      "force"
    ],
    "headers": []
  },
  "POST /apps/{app_name}/machines/{machine_id}/cordon": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /apps/{app_name}/machines/{machine_id}/events": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [
      "limit"
    ],
    "headers": []
  },
  "POST /apps/{app_name}/machines/{machine_id}/exec": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "GET /apps/{app_name}/machines/{machine_id}/lease": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /apps/{app_name}/machines/{machine_id}/lease": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": [
      "fly-machine-lease-nonce"
    ]
  },
  "DELETE /apps/{app_name}/machines/{machine_id}/lease": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": [
      "fly-machine-lease-nonce"
    ]
  },
  "GET /apps/{app_name}/machines/{machine_id}/memory": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /apps/{app_name}/machines/{machine_id}/memory": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /apps/{app_name}/machines/{machine_id}/memory/reclaim": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /apps/{app_name}/machines/{machine_id}/metadata": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /apps/{app_name}/machines/{machine_id}/metadata": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "412": "Precondition Failed"
    }
  },
  "GET /apps/{app_name}/machines/{machine_id}/metadata/{key}": {
    "path": [
      "app_name",
      "machine_id",
      "key"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Not Found"
    }
  },
  "POST /apps/{app_name}/machines/{machine_id}/metadata/{key}": {
    "path": [
      "app_name",
      "machine_id",
      "key"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "DELETE /apps/{app_name}/machines/{machine_id}/metadata/{key}": {
    "path": [
      "app_name",
      "machine_id",
      "key"
    ],
    "query": [],
    "headers": []
  },
  "GET /apps/{app_name}/machines/{machine_id}/ps": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [
      "sort_by",
      "order"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "POST /apps/{app_name}/machines/{machine_id}/restart": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [
      "timeout",
      "signal"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "POST /apps/{app_name}/machines/{machine_id}/signal": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "POST /apps/{app_name}/machines/{machine_id}/start": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /apps/{app_name}/machines/{machine_id}/stop": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "POST /apps/{app_name}/machines/{machine_id}/suspend": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /apps/{app_name}/machines/{machine_id}/uncordon": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /apps/{app_name}/machines/{machine_id}/versions": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /apps/{app_name}/machines/{machine_id}/wait": {
    "path": [
      "app_name",
      "machine_id"
    ],
    "query": [
      "instance_id",
      "timeout",
      "state"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "GET /apps/{app_name}/secretkeys": {
    "path": [
      "app_name"
    ],
    "query": [
      "min_version",
      "types"
    ],
    "headers": []
  },
  "GET /apps/{app_name}/secretkeys/{secret_name}": {
    "path": [
      "app_name",
      "secret_name"
    ],
    "query": [
      "min_version"
    ],
    "headers": []
  },
  "POST /apps/{app_name}/secretkeys/{secret_name}": {
    "path": [
      "app_name",
      "secret_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "DELETE /apps/{app_name}/secretkeys/{secret_name}": {
    "path": [
      "app_name",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "POST /apps/{app_name}/secretkeys/{secret_name}/decrypt": {
    "path": [
      "app_name",
      "secret_name"
    ],
    "query": [
      "min_version"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "POST /apps/{app_name}/secretkeys/{secret_name}/encrypt": {
    "path": [
      "app_name",
      "secret_name"
    ],
    "query": [
      "min_version"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "POST /apps/{app_name}/secretkeys/{secret_name}/generate": {
    "path": [
      "app_name",
      "secret_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "POST /apps/{app_name}/secretkeys/{secret_name}/sign": {
    "path": [
      "app_name",
      "secret_name"
    ],
    "query": [
      "min_version"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "POST /apps/{app_name}/secretkeys/{secret_name}/verify": {
    "path": [
      "app_name",
      "secret_name"
    ],
    "query": [
      "min_version"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "GET /apps/{app_name}/secrets": {
    "path": [
      "app_name"
    ],
    "query": [
      "min_version",
      "show_secrets"
    ],
    "headers": []
  },
  "POST /apps/{app_name}/secrets": {
    "path": [
      "app_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "GET /apps/{app_name}/secrets/{secret_name}": {
    "path": [
      "app_name",
      "secret_name"
    ],
    "query": [
      "min_version",
      "show_secrets"
    ],
    "headers": []
  },
  "POST /apps/{app_name}/secrets/{secret_name}": {
    "path": [
      "app_name",
      "secret_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "DELETE /apps/{app_name}/secrets/{secret_name}": {
    "path": [
      "app_name",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /apps/{app_name}/volumes": {
    "path": [
      "app_name"
    ],
    "query": [
      "summary"
    ],
    "headers": []
  },
  "POST /apps/{app_name}/volumes": {
    "path": [
      "app_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /apps/{app_name}/volumes/{volume_id}": {
    "path": [
      "app_name",
      "volume_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /apps/{app_name}/volumes/{volume_id}": {
    "path": [
      "app_name",
      "volume_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "DELETE /apps/{app_name}/volumes/{volume_id}": {
    "path": [
      "app_name",
      "volume_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /apps/{app_name}/volumes/{volume_id}/extend": {
    "path": [
      "app_name",
      "volume_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /apps/{app_name}/volumes/{volume_id}/snapshots": {
    "path": [
      "app_name",
      "volume_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /apps/{app_name}/volumes/{volume_id}/snapshots": {
    "path": [
      "app_name",
      "volume_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org_slug}/machines": {
    "path": [
      "org_slug"
    ],
    "query": [
      "include_deleted",
      "region",
      "state",
      "updated_after",
      "cursor",
      "limit"
    ],
    "headers": []
  },
  "POST /platform/placements": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /platform/regions": {
    "path": [],
    "query": [
      "size",
      "cpu_kind",
      "memory_mb",
      "cpus",
      "gpus",
      "gpu_kind"
    ],
    "headers": []
  },
  "POST /tokens/kms": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /tokens/oidc": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "GET /v1/tokens/current": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Unauthorized",
      "500": "Internal Server Error"
    }
  }
}

export class FlyioService {
  private baseUrl: string

  constructor(private creds: FlyioSecrets, variables: TypedVariablesService) {
    this.baseUrl = variables.get('FLYIO_BASE_URL') as string
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
        default: throw new Error(`Fly.io API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
