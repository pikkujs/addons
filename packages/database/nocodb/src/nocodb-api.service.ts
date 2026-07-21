import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "PATCH /api/v1/user/profile": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v1/auth/user/signup": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "POST /api/v1/auth/user/signout": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/auth/user/signin": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/auth/user/me": {
    "path": [],
    "query": [
      "base_id"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/auth/password/forgot": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/auth/password/change": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/auth/token/validate/{token}": {
    "path": [
      "token"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/auth/email/validate/{token}": {
    "path": [
      "token"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/auth/password/reset/{token}": {
    "path": [
      "token"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/auth/token/refresh": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/tokens": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/tokens": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/tokens/{tokenId}": {
    "path": [
      "tokenId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/license": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/license": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/app-settings": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/app-settings": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/users": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/users": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/users/{userId}": {
    "path": [
      "userId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/users/{userId}": {
    "path": [
      "userId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/users/{username}": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v1/users/{userId}/resend-invite": {
    "path": [
      "userId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/users/{userId}/profile": {
    "path": [
      "userId"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v1/users/{userId}/profile": {
    "path": [
      "userId"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /api/v1/users/{userId}/profile": {
    "path": [
      "userId"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v1/users/{userId}/follower": {
    "path": [
      "userId"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v1/users/{userId}/follower": {
    "path": [
      "userId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v1/users/{userId}/follower": {
    "path": [
      "userId"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v1/users/{userId}/following": {
    "path": [
      "userId"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v1/users/{userId}/isFollowing/{followerId}": {
    "path": [
      "userId",
      "followerId"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v1/users/{userId}/generate-reset-url": {
    "path": [
      "userId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/{baseId}/users": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/projects/{baseId}/users": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/{baseId}/info": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/projects/{baseId}/users/{userId}": {
    "path": [
      "baseId",
      "userId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/projects/{baseId}/users/{userId}": {
    "path": [
      "baseId",
      "userId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/{baseId}/visibility-rules": {
    "path": [
      "baseId"
    ],
    "query": [
      "includeM2M"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/projects/{baseId}/visibility-rules": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/projects/": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/duplicate/{baseId}/{sourceId}": {
    "path": [
      "baseId",
      "sourceId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/duplicate/{baseId}": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/{baseId}": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/projects/{baseId}": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/projects/{baseId}": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/projects/{baseId}/user": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v1/db/meta/projects/{baseId}/bases/{sourceId}": {
    "path": [
      "baseId",
      "sourceId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/projects/{baseId}/bases/{sourceId}": {
    "path": [
      "baseId",
      "sourceId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/projects/{baseId}/bases/{sourceId}": {
    "path": [
      "baseId",
      "sourceId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/{baseId}/bases/": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/projects/{baseId}/bases/": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/projects/{baseId}/bases/{sourceId}/share/erd": {
    "path": [
      "baseId",
      "sourceId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v1/db/meta/projects/{baseId}/bases/{sourceId}/share/erd": {
    "path": [
      "baseId",
      "sourceId"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v1/db/meta/projects/{baseId}/shared": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/projects/{baseId}/shared": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/projects/{baseId}/shared": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/projects/{baseId}/shared": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/{baseId}/cost": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/{baseId}/tables": {
    "path": [
      "baseId"
    ],
    "query": [
      "page",
      "pageSize",
      "sort",
      "includeM2M"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/projects/{baseId}/tables": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/internal/links/{linkColumnId}/tables/{tableId}": {
    "path": [
      "linkColumnId",
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/tables/{tableId}": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/tables/{tableId}": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/tables/{tableId}": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/duplicate/{baseId}/table/{tableId}": {
    "path": [
      "baseId",
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/duplicate/{baseId}/column/{columnId}": {
    "path": [
      "baseId",
      "columnId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v2/meta/duplicate/{workspaceId}/shared/{sharedBaseId}": {
    "path": [
      "workspaceId",
      "sharedBaseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/{baseId}/{sourceId}/tables": {
    "path": [
      "baseId",
      "sourceId"
    ],
    "query": [
      "page",
      "pageSize",
      "sort",
      "includeM2M"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/projects/{baseId}/{sourceId}/tables": {
    "path": [
      "baseId",
      "sourceId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/tables/{tableId}/reorder": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/tables/{tableId}/columns": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/columns/{columnId}": {
    "path": [
      "columnId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/columns/{columnId}": {
    "path": [
      "columnId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/columns/{columnId}": {
    "path": [
      "columnId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/columns/{columnId}/primary": {
    "path": [
      "columnId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/tables/{tableId}/views": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/views/{viewId}": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/views/{viewId}": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/views/{viewId}/row-color": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/views/{viewId}/row-color": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/views/{viewId}/row-color-select": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v1/db/meta/views/{viewId}/row-color-conditions": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /api/v1/db/meta/views/{viewId}/row-color-conditions/{id}": {
    "path": [
      "viewId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v1/db/meta/views/{viewId}/row-color-conditions/{id}": {
    "path": [
      "viewId",
      "id"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v1/db/meta/views/{viewId}/show-all": {
    "path": [
      "viewId"
    ],
    "query": [
      "ignoreIds"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/views/{viewId}/hide-all": {
    "path": [
      "viewId"
    ],
    "query": [
      "ignoreIds"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/tables/{tableId}/share": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/views/{viewId}/share": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/views/{viewId}/share": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/views/{viewId}/share": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/views/{viewId}/columns": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/views/{viewId}/columns": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/views/{viewId}/columns/{columnId}": {
    "path": [
      "viewId",
      "columnId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/views/{viewId}/sorts": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/views/{viewId}/sorts": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/sorts/{sortId}": {
    "path": [
      "sortId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/sorts/{sortId}": {
    "path": [
      "sortId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/sorts/{sortId}": {
    "path": [
      "sortId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/views/{viewId}/filters": {
    "path": [
      "viewId"
    ],
    "query": [
      "includeAllFilters"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/views/{viewId}/filters": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/hooks/{hookId}/filters": {
    "path": [
      "hookId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/hooks/{hookId}/filters": {
    "path": [
      "hookId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/hooks/{hookId}/logs": {
    "path": [
      "hookId"
    ],
    "query": [
      "limit",
      "offset"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/filters/{filterId}": {
    "path": [
      "filterId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/filters/{filterId}": {
    "path": [
      "filterId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/filters/{filterId}": {
    "path": [
      "filterId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/filters/{filterGroupId}/children": {
    "path": [
      "filterGroupId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/tables/{tableId}/grids": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/tables/{tableId}/forms": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/forms/{formViewId}": {
    "path": [
      "formViewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/forms/{formViewId}": {
    "path": [
      "formViewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/form-columns/{formViewColumnId}": {
    "path": [
      "formViewColumnId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/grids/{viewId}": {
    "path": [
      "viewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/grids/{gridId}/grid-columns": {
    "path": [
      "gridId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/grid-columns/{columnId}": {
    "path": [
      "columnId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/tables/{tableId}/galleries": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/galleries/{galleryViewId}": {
    "path": [
      "galleryViewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/galleries/{galleryViewId}": {
    "path": [
      "galleryViewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/tables/{tableId}/kanbans": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/kanbans/{kanbanViewId}": {
    "path": [
      "kanbanViewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/kanbans/{kanbanViewId}": {
    "path": [
      "kanbanViewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/tables/{tableId}/maps": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/maps/{mapViewId}": {
    "path": [
      "mapViewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/maps/{mapViewId}": {
    "path": [
      "mapViewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/tables/{tableId}/calendars": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/calendars/{calendarViewId}": {
    "path": [
      "calendarViewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/calendars/{calendarViewId}": {
    "path": [
      "calendarViewId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/{baseId}/meta-diff": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/projects/{baseId}/meta-diff": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/{baseId}/meta-diff/{sourceId}": {
    "path": [
      "baseId",
      "sourceId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/projects/{baseId}/meta-diff/{sourceId}": {
    "path": [
      "baseId",
      "sourceId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/{baseId}/has-empty-or-null-filters": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}": {
    "path": [
      "orgs",
      "baseName",
      "tableName"
    ],
    "query": [
      "fields",
      "sort",
      "where",
      "offset",
      "limit",
      "sortArrJson",
      "filterArrJson",
      "pks",
      "getHiddenColumns"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/data/{orgs}/{baseName}/{tableName}": {
    "path": [
      "orgs",
      "baseName",
      "tableName"
    ],
    "query": [
      "before",
      "undo"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/find-one": {
    "path": [
      "orgs",
      "baseName",
      "tableName"
    ],
    "query": [
      "fields",
      "sort",
      "where"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/groupby": {
    "path": [
      "orgs",
      "baseName",
      "tableName"
    ],
    "query": [
      "column_name",
      "sort",
      "where",
      "limit",
      "offset"
    ],
    "headers": [
      "xc-auth"
    ]
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/groupby/count": {
    "path": [
      "orgs",
      "baseName",
      "tableName"
    ],
    "query": [
      "column_name",
      "sort",
      "where",
      "offset"
    ],
    "headers": [
      "xc-auth"
    ]
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/group/{columnId}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName",
      "columnId"
    ],
    "query": [
      "fields",
      "sort",
      "where",
      "nested"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/group/{columnId}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "columnId"
    ],
    "query": [
      "fields",
      "sort",
      "where",
      "nested"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/calendar-data/{orgs}/{baseName}/{tableName}/views/{viewName}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName"
    ],
    "query": [
      "from_date",
      "prev_date",
      "next_date",
      "to_date",
      "fields",
      "sort",
      "where",
      "nested",
      "offset"
    ],
    "headers": [
      "xc-auth"
    ]
  },
  "GET /api/v1/db/calendar-data/{orgs}/{baseName}/{tableName}/views/{viewName}/countByDate/": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName"
    ],
    "query": [
      "from_date",
      "to_date",
      "prev_date",
      "next_date",
      "sort",
      "where",
      "limit",
      "offset"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/public/calendar-view/{sharedViewUuid}": {
    "path": [
      "sharedViewUuid"
    ],
    "query": [
      "from_date",
      "to_date",
      "prev_date",
      "next_date",
      "fields",
      "sort",
      "where",
      "nested",
      "offset"
    ],
    "headers": [
      "xc-password",
      "xc-auth"
    ]
  },
  "GET /api/v1/db/public/calendar-view/{sharedViewUuid}/countByDate": {
    "path": [
      "sharedViewUuid"
    ],
    "query": [
      "from_date",
      "prev_date",
      "next_date",
      "to_date",
      "sort",
      "where",
      "limit",
      "offset"
    ],
    "headers": [
      "xc-password",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName"
    ],
    "query": [
      "fields",
      "sort",
      "where",
      "nested",
      "offset",
      "getHiddenColumns"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName"
    ],
    "query": [
      "before",
      "undo"
    ],
    "headers": [],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/find-one": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName"
    ],
    "query": [
      "fields",
      "sort",
      "where",
      "nested"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/groupby": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName"
    ],
    "query": [
      "column_name",
      "sort",
      "where",
      "limit",
      "offset"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/groupby/count": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName"
    ],
    "query": [
      "column_name",
      "sort",
      "where",
      "offset"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/count": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName"
    ],
    "query": [
      "where",
      "nested"
    ],
    "headers": [
      "xc-auth"
    ]
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/{rowId}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName",
      "rowId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/{rowId}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName",
      "rowId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/{rowId}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName",
      "rowId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/views/{viewName}/{rowId}/exist": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "viewName",
      "rowId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/{rowId}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "rowId"
    ],
    "query": [
      "getHiddenColumn"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/data/{orgs}/{baseName}/{tableName}/{rowId}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "rowId"
    ],
    "query": [
      "getHiddenColumn"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/data/{orgs}/{baseName}/{tableName}/{rowId}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "rowId"
    ],
    "query": [
      "getHiddenColumn"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/{rowId}/exist": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "rowId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v2/tables/{tableId}/bulk/dataList": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId",
      "where"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v2/tables/{tableId}/bulk/group": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId"
    ],
    "headers": [],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/data/bulk/{orgs}/{baseName}/{tableName}/upsert": {
    "path": [
      "orgs",
      "baseName",
      "tableName"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/data/bulk/{orgs}/{baseName}/{tableName}": {
    "path": [
      "orgs",
      "baseName",
      "tableName"
    ],
    "query": [
      "undo"
    ],
    "headers": [
      "xc-auth",
      "nc-operation-id",
      "nc-import-type"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/data/bulk/{orgs}/{baseName}/{tableName}": {
    "path": [
      "orgs",
      "baseName",
      "tableName"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/data/bulk/{orgs}/{baseName}/{tableName}": {
    "path": [
      "orgs",
      "baseName",
      "tableName"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/data/bulk/{orgs}/{baseName}/{tableName}/all": {
    "path": [
      "orgs",
      "baseName",
      "tableName"
    ],
    "query": [
      "where",
      "viewId",
      "skipPks"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/data/bulk/{orgs}/{baseName}/{tableName}/all": {
    "path": [
      "orgs",
      "baseName",
      "tableName"
    ],
    "query": [
      "where",
      "viewId",
      "skipPks"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/{rowId}/{relationType}/{columnName}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "rowId",
      "relationType",
      "columnName"
    ],
    "query": [
      "limit",
      "offset",
      "where"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/data/{orgs}/{baseName}/{tableName}/{rowId}/{relationType}/{columnName}/{refRowId}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "rowId",
      "relationType",
      "columnName",
      "refRowId"
    ],
    "query": [
      "fields",
      "sort",
      "where",
      "offset",
      "limit",
      "sortArrJson",
      "filterArrJson"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/data/{orgs}/{baseName}/{tableName}/{rowId}/{relationType}/{columnName}/{refRowId}": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "rowId",
      "relationType",
      "columnName",
      "refRowId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/data/{orgs}/{baseName}/{tableName}/{rowId}/{relationType}/{columnName}/exclude": {
    "path": [
      "orgs",
      "baseName",
      "tableName",
      "rowId",
      "relationType",
      "columnName"
    ],
    "query": [
      "limit",
      "offset",
      "where"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v2/public/shared-view/{sharedViewUuid}/count": {
    "path": [
      "sharedViewUuid"
    ],
    "query": [
      "where",
      "nested"
    ],
    "headers": [
      "xc-password",
      "xc-auth"
    ]
  },
  "GET /api/v2/public/oauth/client/{clientId}": {
    "path": [
      "clientId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid client ID format",
      "404": "OAuth client not found"
    }
  },
  "POST /api/v2/oauth/authorize": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Missing required parameters"
    }
  },
  "POST /api/v2/public/shared-view/{sharedViewUuid}/bulk/dataList": {
    "path": [
      "sharedViewUuid"
    ],
    "query": [
      "where"
    ],
    "headers": [
      "xc-password"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v2/public/shared-view/{sharedViewUuid}/bulk/group": {
    "path": [
      "sharedViewUuid"
    ],
    "query": [
      "where"
    ],
    "headers": [
      "xc-password"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v2/public/shared-view/{sharedViewUuid}/aggregate": {
    "path": [
      "sharedViewUuid"
    ],
    "query": [
      "where",
      "filterArrJson",
      "aggregation"
    ],
    "headers": [
      "xc-password"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v2/tables/{tableId}/bulk/aggregate": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId",
      "aggregation",
      "where",
      "filterArrJson"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v2/public/shared-view/{sharedViewUuid}/bulk/aggregate": {
    "path": [
      "sharedViewUuid"
    ],
    "query": [
      "where",
      "filterArrJson",
      "aggregation"
    ],
    "headers": [
      "xc-password"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v2/public/shared-view/{sharedViewUuid}/downloadAttachment/{columnId}/{rowId}": {
    "path": [
      "sharedViewUuid",
      "columnId",
      "rowId"
    ],
    "query": [
      "urlOrPath"
    ],
    "headers": [
      "xc-password"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/public/shared-view/{sharedViewUuid}/group/{columnId}": {
    "path": [
      "sharedViewUuid",
      "columnId"
    ],
    "query": [
      "fields",
      "sort",
      "where",
      "offset",
      "limit",
      "sortArrJson",
      "filterArrJson"
    ],
    "headers": [
      "xc-password"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/public/shared-view/{sharedViewUuid}/rows": {
    "path": [
      "sharedViewUuid"
    ],
    "query": [
      "fields",
      "sort",
      "where",
      "offset",
      "limit",
      "sortArrJson",
      "filterArrJson",
      "pks"
    ],
    "headers": [
      "xc-password"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/public/shared-view/{sharedViewUuid}/rows": {
    "path": [
      "sharedViewUuid"
    ],
    "query": [],
    "headers": [
      "xc-password",
      "xc-password"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/public/shared-view/{sharedViewUuid}/groupby": {
    "path": [
      "sharedViewUuid"
    ],
    "query": [
      "fields",
      "sort",
      "where",
      "offset",
      "limit",
      "sortArrJson",
      "filterArrJson",
      "column_name"
    ],
    "headers": [
      "xc-password"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v2/public/shared-view/{sharedViewUuid}/groupby/count": {
    "path": [
      "sharedViewUuid"
    ],
    "query": [
      "sort",
      "where",
      "filterArrJson",
      "column_name"
    ],
    "headers": [
      "xc-password"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/public/shared-view/{sharedViewUuid}/rows/{rowId}/{relationType}/{columnName}": {
    "path": [
      "sharedViewUuid",
      "rowId",
      "relationType",
      "columnName"
    ],
    "query": [
      "fields",
      "sort",
      "where",
      "offset",
      "limit",
      "sortArrJson",
      "filterArrJson"
    ],
    "headers": [],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/public/shared-view/{sharedViewUuid}/nested/{columnName}": {
    "path": [
      "sharedViewUuid",
      "columnName"
    ],
    "query": [
      "fields",
      "sort",
      "where",
      "offset",
      "limit",
      "sortArrJson",
      "filterArrJson"
    ],
    "headers": [
      "xc-password"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/public/shared-base/{sharedBaseUuid}/meta": {
    "path": [
      "sharedBaseUuid"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/public/shared-view/{sharedViewUuid}/meta": {
    "path": [
      "sharedViewUuid"
    ],
    "query": [],
    "headers": [
      "xc-password"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/public/shared-erd/{sharedErdUuid}/meta": {
    "path": [
      "sharedErdUuid"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v1/db/meta/comments": {
    "path": [],
    "query": [
      "row_id",
      "fk_model_id"
    ],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/comments": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/comment/{commentId}/": {
    "path": [
      "commentId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "DELETE /api/v1/db/meta/comment/{commentId}/": {
    "path": [
      "commentId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "GET /api/v1/db/meta/comments/count": {
    "path": [],
    "query": [
      "ids",
      "fk_model_id"
    ],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/tables/{tableId}/hooks": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/tables/{tableId}/hooks": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/tables/{tableId}/hooks/test": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/tables/{tableId}/hooks/samplePayload/{event}/{operation}/{version}": {
    "path": [
      "tableId",
      "event",
      "operation",
      "version"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/hooks/{hookId}": {
    "path": [
      "hookId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/hooks/{hookId}": {
    "path": [
      "hookId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/plugins": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/plugins/webhook": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/plugins/{pluginId}/status": {
    "path": [
      "pluginId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/plugins/test": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/plugins/{pluginId}": {
    "path": [
      "pluginId"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v1/db/meta/plugins/{pluginId}": {
    "path": [
      "pluginId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/connection/test": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/url_to_config": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/nocodb/info": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/error-reporting": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v1/db/meta/axiosRequestMake": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/version": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/health": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v2/feed": {
    "path": [],
    "query": [
      "type",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v2/cloud-features": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/aggregated-meta-info": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/cache": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ]
  },
  "DELETE /api/v1/db/meta/cache": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth",
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/db/meta/projects/{baseId}/api-tokens": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/meta/projects/{baseId}/api-tokens": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v1/db/meta/projects/{baseId}/api-tokens/{tokenId}": {
    "path": [
      "baseId",
      "tokenId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/db/storage/upload": {
    "path": [],
    "query": [
      "path",
      "scope"
    ],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v1/db/storage/upload-by-url": {
    "path": [],
    "query": [
      "path",
      "scope"
    ],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v1/db/meta/projects/{baseId}/users/{userId}/resend-invite": {
    "path": [
      "baseId",
      "userId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v1/notifications/poll": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v1/notifications": {
    "path": [],
    "query": [
      "is_read",
      "limit",
      "offset"
    ],
    "headers": []
  },
  "PATCH /api/v1/notifications/{notificationId}": {
    "path": [
      "notificationId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v1/notifications/{notificationId}": {
    "path": [
      "notificationId"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v1/notifications/mark-all-read": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v1/db/meta/tables/{tableId}/columns/hash": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v1/db/meta/tables/{tableId}/columns/bulk": {
    "path": [
      "tableId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v2/tables/{tableId}/aggregate": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId",
      "aggregation",
      "where",
      "filterArrJson"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v2/tables/{tableId}/records": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId",
      "fields",
      "sort",
      "where",
      "offset",
      "limit",
      "sortArrJson",
      "filterArrJson",
      "pks"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v2/tables/{tableId}/records": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId",
      "before",
      "undo"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "PATCH /api/v2/tables/{tableId}/records": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v2/tables/{tableId}/records": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v2/tables/{tableId}/records/{rowId}": {
    "path": [
      "tableId",
      "rowId"
    ],
    "query": [
      "viewId",
      "fields",
      "offset"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v2/tables/{tableId}/records/{rowId}/move": {
    "path": [
      "tableId",
      "rowId"
    ],
    "query": [
      "before"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v2/tables/{tableId}/records/count": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId",
      "fields",
      "where",
      "filterArrJson"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v2/tables/{tableId}/links/{columnId}/records/{rowId}": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId",
      "fields",
      "sort",
      "where",
      "offset",
      "limit",
      "sortArrJson",
      "filterArrJson"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v2/tables/{tableId}/links/{columnId}/records/{rowId}": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "DELETE /api/v2/tables/{tableId}/links/{columnId}/records/{rowId}": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "GET /api/v2/downloadAttachment/{modelId}/{columnId}/{rowId}": {
    "path": [
      "modelId",
      "columnId",
      "rowId"
    ],
    "query": [
      "urlOrPath"
    ],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v2/tables/{tableId}/links/{columnId}/records": {
    "path": [
      "tableId"
    ],
    "query": [
      "viewId"
    ],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v1/command_palette": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/extensions/{baseId}": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v2/extensions/{baseId}": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "GET /api/v2/extensions/{extensionId}": {
    "path": [
      "extensionId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "PATCH /api/v2/extensions/{extensionId}": {
    "path": [
      "extensionId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "DELETE /api/v2/extensions/{extensionId}": {
    "path": [
      "extensionId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /jobs/listen": {
    "path": [],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v2/jobs/{baseId}": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v2/export/{viewId}/{exportAs}": {
    "path": [
      "viewId",
      "exportAs"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v2/public/export/{publicDataUuid}/{exportAs}": {
    "path": [
      "publicDataUuid",
      "exportAs"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/meta/hooks/{hookId}/trigger/{rowId}": {
    "path": [
      "hookId",
      "rowId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ],
    "errors": {
      "400": "BadReqeust"
    }
  },
  "POST /api/v2/ai/bases/{baseId}/utils": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v2/ai/bases/{baseId}/completion": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v2/ai/bases/{baseId}/schema": {
    "path": [
      "baseId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v2/ai/workspaces/{workspaceId}/bases": {
    "path": [
      "workspaceId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v2/ai/tables/{modelId}/rows/generate": {
    "path": [
      "modelId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v2/ai/tables/{modelId}/rows/fill": {
    "path": [
      "modelId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "POST /api/v2/ai/tables/{modelId}/extract": {
    "path": [
      "modelId"
    ],
    "query": [],
    "headers": [
      "xc-auth"
    ]
  },
  "GET /api/v2/meta/integrations": {
    "path": [],
    "query": [
      "type",
      "includeDatabaseInfo",
      "limit",
      "offset",
      "baseId",
      "query"
    ],
    "headers": []
  },
  "POST /api/v2/meta/integrations": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/meta/integrations/{integrationId}": {
    "path": [
      "integrationId"
    ],
    "query": [
      "includeConfig",
      "includeSources"
    ],
    "headers": []
  },
  "PATCH /api/v2/meta/integrations/{integrationId}": {
    "path": [
      "integrationId"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /api/v2/meta/integrations/{integrationId}": {
    "path": [
      "integrationId"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /api/v2/meta/integrations/{integrationId}/default": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /api/v2/integrations/:integrationId/store": {
    "path": [
      "integrationId"
    ],
    "query": [],
    "headers": []
  },
  "GET /api/v2/integrations": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /api/v2/integrations/:type/:subType": {
    "path": [
      "type",
      "subType"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/integrations/:integrationId/:endpoint": {
    "path": [
      "integrationId",
      "endpoint"
    ],
    "query": [],
    "headers": []
  },
  "POST /api/v2/tables/:tableId/button/:fieldId": {
    "path": [
      "tableId",
      "fieldId"
    ],
    "query": [
      "passThrough"
    ],
    "headers": []
  },
  "GET /api/v2/internal/:workspaceId/:baseId": {
    "path": [
      "workspaceId",
      "baseId"
    ],
    "query": [
      "operation",
      "fk_model_id",
      "row_id",
      "workflowId",
      "cursor",
      "tableId",
      "mcpTokenId",
      "viewId",
      "formViewId",
      "gridViewId",
      "kanbanViewId",
      "galleryViewId",
      "calendarViewId",
      "publicDataUuid",
      "sharedViewUuid",
      "sharedBaseUuid",
      "sharedDashboardUuid",
      "hookId",
      "rowColorConditionId",
      "gridViewColumnId",
      "formViewColumnId",
      "galleryViewColumnId",
      "columnId",
      "filterId",
      "filterParentId",
      "widgetId",
      "sortId",
      "syncId",
      "extensionId",
      "teamId",
      "clientId",
      "tokenId",
      "dashboardId",
      "widgetId",
      "id",
      "teamId"
    ],
    "headers": []
  },
  "POST /api/v2/internal/:workspaceId/:baseId": {
    "path": [
      "workspaceId",
      "baseId"
    ],
    "query": [
      "operation",
      "fk_model_id",
      "row_id",
      "workflowId",
      "cursor",
      "tableId",
      "mcpTokenId",
      "viewId",
      "formViewId",
      "gridViewId",
      "kanbanViewId",
      "galleryViewId",
      "calendarViewId",
      "publicDataUuid",
      "sharedViewUuid",
      "sharedBaseUuid",
      "sharedDashboardUuid",
      "hookId",
      "rowColorConditionId",
      "gridViewColumnId",
      "formViewColumnId",
      "galleryViewColumnId",
      "columnId",
      "filterId",
      "filterParentId",
      "widgetId",
      "sortId",
      "syncId",
      "extensionId",
      "teamId",
      "clientId",
      "tokenId",
      "dashboardId",
      "widgetId",
      "id",
      "teamId"
    ],
    "headers": []
  }
}

export class NocodbService {
  private baseUrl: string

  constructor(private creds: { apiKey: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('NOCODB_BASE_URL') as string
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

    headers["Auth Token "] = this.creds.apiKey

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
        default: throw new Error(`NocoDB API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
