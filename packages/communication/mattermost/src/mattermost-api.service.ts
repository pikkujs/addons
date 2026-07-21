import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /users": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "in_team",
      "not_in_team",
      "in_channel",
      "not_in_channel",
      "group_constrained",
      "without_team",
      "sort"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /users": {
    "path": [],
    "query": [
      "t",
      "iid"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /users/ids": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided"
    }
  },
  "POST /users/group_channels": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided"
    }
  },
  "POST /users/usernames": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided"
    }
  },
  "POST /users/search": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/autocomplete": {
    "path": [],
    "query": [
      "team_id",
      "channel_id",
      "name",
      "limit"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/stats": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /users/{user_id}": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "404": "Resource not found"
    }
  },
  "PUT /users/{user_id}": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "DELETE /users/{user_id}": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "PUT /users/{user_id}/patch": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /users/{user_id}/roles": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /users/{user_id}/active": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/{user_id}/image": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "POST /users/{user_id}/image": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "DELETE /users/{user_id}/image": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "GET /users/{user_id}/image/default": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "GET /users/username/{username}": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "404": "Resource not found"
    }
  },
  "POST /users/password/reset": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /users/{user_id}/mfa": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /users/{user_id}/mfa/generate": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "POST /users/mfa": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body"
    }
  },
  "PUT /users/{user_id}/password": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /users/password/reset/send": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/email/{email}": {
    "path": [
      "email"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /users/{user_id}/sessions": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /users/{user_id}/sessions/revoke": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /users/{user_id}/sessions/revoke/all": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /users/sessions/device": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided"
    }
  },
  "GET /users/{user_id}/audits": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /users/email/verify": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body"
    }
  },
  "POST /users/email/verify/send": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body"
    }
  },
  "POST /users/login/switch": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "GET /users/{user_id}/tokens": {
    "path": [
      "user_id"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /users/{user_id}/tokens": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/tokens": {
    "path": [],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /users/tokens/revoke": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/tokens/{token_id}": {
    "path": [
      "token_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /users/tokens/disable": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /users/tokens/enable": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /users/tokens/search": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /users/{user_id}/auth": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /users/{user_id}/terms_of_service": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "404": "User hasn't performed an action or the latest action was a rejection."
    }
  },
  "POST /users/{user_id}/terms_of_service": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/{user_id}/status": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided"
    }
  },
  "PUT /users/{user_id}/status": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided"
    }
  },
  "POST /users/status/ids": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided"
    }
  },
  "GET /teams": {
    "path": [],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided"
    }
  },
  "POST /teams": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /teams/{team_id}": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "PUT /teams/{team_id}": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "DELETE /teams/{team_id}": {
    "path": [
      "team_id"
    ],
    "query": [
      "permanent"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "PUT /teams/{team_id}/patch": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /teams/name/{name}": {
    "path": [
      "name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /teams/search": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /teams/name/{name}/exists": {
    "path": [
      "name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "404": "Resource not found"
    }
  },
  "GET /users/{user_id}/teams": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /teams/{team_id}/members": {
    "path": [
      "team_id"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /teams/{team_id}/members": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /teams/members/invite": {
    "path": [],
    "query": [
      "token"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /teams/{team_id}/members/batch": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /users/{user_id}/teams/members": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /teams/{team_id}/members/{user_id}": {
    "path": [
      "team_id",
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "DELETE /teams/{team_id}/members/{user_id}": {
    "path": [
      "team_id",
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /teams/{team_id}/members/ids": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /teams/{team_id}/stats": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /teams/{team_id}/regenerate_invite_id": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /teams/{team_id}/image": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "POST /teams/{team_id}/image": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "500": "Something went wrong with the server",
      "501": "Feature is disabled"
    }
  },
  "DELETE /teams/{team_id}/image": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "500": "Something went wrong with the server",
      "501": "Feature is disabled"
    }
  },
  "PUT /teams/{team_id}/members/{user_id}/roles": {
    "path": [
      "team_id",
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "PUT /teams/{team_id}/members/{user_id}/schemeRoles": {
    "path": [
      "team_id",
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /users/{user_id}/teams/unread": {
    "path": [
      "user_id"
    ],
    "query": [
      "exclude_team"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/{user_id}/teams/{team_id}/unread": {
    "path": [
      "user_id",
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /teams/{team_id}/invite/email": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "DELETE /teams/invites/email": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /teams/{team_id}/import": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /teams/invite/{invite_id}": {
    "path": [
      "invite_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body"
    }
  },
  "PUT /teams/{team_id}/scheme": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /channels": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /channels/direct": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /channels/group": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /group/search": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided"
    }
  },
  "POST /teams/{team_id}/channels/ids": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "404": "Resource not found"
    }
  },
  "GET /channels/{channel_id}/timezones": {
    "path": [
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /channels/{channel_id}": {
    "path": [
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "PUT /channels/{channel_id}": {
    "path": [
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "DELETE /channels/{channel_id}": {
    "path": [
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /channels/{channel_id}/patch": {
    "path": [
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /channels/{channel_id}/convert": {
    "path": [
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /channels/{channel_id}/restore": {
    "path": [
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /channels/{channel_id}/stats": {
    "path": [
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /channels/{channel_id}/pinned": {
    "path": [
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /teams/{team_id}/channels": {
    "path": [
      "team_id"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /teams/{team_id}/channels/deleted": {
    "path": [
      "team_id"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /teams/{team_id}/channels/autocomplete": {
    "path": [
      "team_id"
    ],
    "query": [
      "name"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /teams/{team_id}/channels/search_autocomplete": {
    "path": [
      "team_id"
    ],
    "query": [
      "name"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /teams/{team_id}/channels/search": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /teams/{team_id}/channels/name/{channel_name}": {
    "path": [
      "team_id",
      "channel_name"
    ],
    "query": [
      "include_deleted"
    ],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /teams/name/{team_name}/channels/name/{channel_name}": {
    "path": [
      "team_name",
      "channel_name"
    ],
    "query": [
      "include_deleted"
    ],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /channels/{channel_id}/members": {
    "path": [
      "channel_id"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /channels/{channel_id}/members": {
    "path": [
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /channels/{channel_id}/members/ids": {
    "path": [
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /channels/{channel_id}/members/{user_id}": {
    "path": [
      "channel_id",
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "DELETE /channels/{channel_id}/members/{user_id}": {
    "path": [
      "channel_id",
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /channels/{channel_id}/members/{user_id}/roles": {
    "path": [
      "channel_id",
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /channels/{channel_id}/members/{user_id}/schemeRoles": {
    "path": [
      "channel_id",
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "PUT /channels/{channel_id}/members/{user_id}/notify_props": {
    "path": [
      "channel_id",
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /channels/members/{user_id}/view": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/{user_id}/teams/{team_id}/channels/members": {
    "path": [
      "user_id",
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/{user_id}/teams/{team_id}/channels": {
    "path": [
      "user_id",
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /users/{user_id}/channels/{channel_id}/unread": {
    "path": [
      "user_id",
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "PUT /channels/{channel_id}/scheme": {
    "path": [
      "channel_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /posts": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /posts/ephemeral": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /posts/{post_id}": {
    "path": [
      "post_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /posts/{post_id}": {
    "path": [
      "post_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "DELETE /posts/{post_id}": {
    "path": [
      "post_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /posts/{post_id}/patch": {
    "path": [
      "post_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /posts/{post_id}/thread": {
    "path": [
      "post_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/{user_id}/posts/flagged": {
    "path": [
      "user_id"
    ],
    "query": [
      "team_id",
      "channel_id",
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /posts/{post_id}/files/info": {
    "path": [
      "post_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /channels/{channel_id}/posts": {
    "path": [
      "channel_id"
    ],
    "query": [
      "page",
      "per_page",
      "since",
      "before",
      "after"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/{user_id}/channels/{channel_id}/posts/unread": {
    "path": [
      "user_id",
      "channel_id"
    ],
    "query": [
      "limit_before",
      "limit_after"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /teams/{team_id}/posts/search": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /posts/{post_id}/pin": {
    "path": [
      "post_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /posts/{post_id}/unpin": {
    "path": [
      "post_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /posts/{post_id}/actions/{action_id}": {
    "path": [
      "post_id",
      "action_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/{user_id}/preferences": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /users/{user_id}/preferences": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /users/{user_id}/preferences/delete": {
    "path": [
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/{user_id}/preferences/{category}": {
    "path": [
      "user_id",
      "category"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /users/{user_id}/preferences/{category}/name/{preference_name}": {
    "path": [
      "user_id",
      "category",
      "preference_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided"
    }
  },
  "POST /files": {
    "path": [],
    "query": [
      "channel_id",
      "filename"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "413": "Content too large",
      "501": "Feature is disabled"
    }
  },
  "GET /files/{file_id}": {
    "path": [
      "file_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "GET /files/{file_id}/thumbnail": {
    "path": [
      "file_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "GET /files/{file_id}/preview": {
    "path": [
      "file_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "GET /files/{file_id}/link": {
    "path": [
      "file_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "GET /files/{file_id}/info": {
    "path": [
      "file_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "GET /jobs": {
    "path": [],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /jobs": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /jobs/{job_id}": {
    "path": [
      "job_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /jobs/{job_id}/cancel": {
    "path": [
      "job_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /jobs/type/{type}": {
    "path": [
      "type"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /system/ping": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "500": "Something went wrong with the server"
    }
  },
  "POST /database/recycle": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /email/test": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Do not have appropriate permissions",
      "500": "Something went wrong with the server"
    }
  },
  "POST /file/s3_test": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Do not have appropriate permissions",
      "500": "Something went wrong with the server"
    }
  },
  "GET /config": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /config": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /config/reload": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /config/client": {
    "path": [],
    "query": [
      "format"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "501": "Feature is disabled"
    }
  },
  "GET /config/environment": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /license": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "413": "Content too large"
    }
  },
  "DELETE /license": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /license/client": {
    "path": [],
    "query": [
      "format"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "501": "Feature is disabled"
    }
  },
  "GET /audits": {
    "path": [],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /caches/invalidate": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /logs": {
    "path": [],
    "query": [
      "page",
      "logs_per_page"
    ],
    "headers": [],
    "errors": {
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /logs": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /analytics/old": {
    "path": [],
    "query": [
      "name",
      "team_id"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /emoji": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "sort"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /emoji": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "413": "Content too large",
      "501": "Feature is disabled"
    }
  },
  "GET /emoji/{emoji_id}": {
    "path": [
      "emoji_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "DELETE /emoji/{emoji_id}": {
    "path": [
      "emoji_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /emoji/name/{emoji_name}": {
    "path": [
      "emoji_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "GET /emoji/{emoji_id}/image": {
    "path": [
      "emoji_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "500": "Something went wrong with the server",
      "501": "Feature is disabled"
    }
  },
  "POST /emoji/search": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /emoji/autocomplete": {
    "path": [],
    "query": [
      "name"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /hooks/incoming": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "team_id"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /hooks/incoming": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /hooks/incoming/{hook_id}": {
    "path": [
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "PUT /hooks/incoming/{hook_id}": {
    "path": [
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /hooks/outgoing": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "team_id",
      "channel_id"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /hooks/outgoing": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /hooks/outgoing/{hook_id}": {
    "path": [
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "PUT /hooks/outgoing/{hook_id}": {
    "path": [
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "DELETE /hooks/outgoing/{hook_id}": {
    "path": [
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /hooks/outgoing/{hook_id}/regen_token": {
    "path": [
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /saml/metadata": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "501": "Feature is disabled"
    }
  },
  "POST /saml/certificate/idp": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "DELETE /saml/certificate/idp": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /saml/certificate/public": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "DELETE /saml/certificate/public": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /saml/certificate/private": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "DELETE /saml/certificate/private": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /saml/certificate/status": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /compliance/reports": {
    "path": [],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /compliance/reports": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /compliance/reports/{report_id}": {
    "path": [
      "report_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /compliance/reports/{report_id}/download": {
    "path": [
      "report_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /ldap/sync": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "501": "Feature is disabled"
    }
  },
  "POST /ldap/test": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "500": "Something went wrong with the server",
      "501": "Feature is disabled"
    }
  },
  "GET /channels/{channel_id}/groups": {
    "path": [
      "channel_id"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /teams/{team_id}/groups": {
    "path": [
      "team_id"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /cluster/status": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /brand/image": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "404": "No brand image uploaded",
      "501": "Feature is disabled"
    }
  },
  "POST /brand/image": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "413": "Content too large",
      "501": "Feature is disabled"
    }
  },
  "DELETE /brand/image": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "No brand image uploaded"
    }
  },
  "GET /commands": {
    "path": [],
    "query": [
      "team_id",
      "custom_only"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /commands": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /teams/{team_id}/commands/autocomplete": {
    "path": [
      "team_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /commands/{command_id}": {
    "path": [
      "command_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "DELETE /commands/{command_id}": {
    "path": [
      "command_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "PUT /commands/{command_id}/regen_token": {
    "path": [
      "command_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /commands/execute": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /oauth/apps": {
    "path": [],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /oauth/apps": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /oauth/apps/{app_id}": {
    "path": [
      "app_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "PUT /oauth/apps/{app_id}": {
    "path": [
      "app_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "DELETE /oauth/apps/{app_id}": {
    "path": [
      "app_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "POST /oauth/apps/{app_id}/regen_secret": {
    "path": [
      "app_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "GET /oauth/apps/{app_id}/info": {
    "path": [
      "app_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "GET /users/{user_id}/oauth/apps/authorized": {
    "path": [
      "user_id"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /elasticsearch/test": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "500": "Something went wrong with the server",
      "501": "Feature is disabled"
    }
  },
  "POST /elasticsearch/purge_indexes": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "500": "Something went wrong with the server",
      "501": "Feature is disabled"
    }
  },
  "GET /data_retention/policy": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "500": "Something went wrong with the server",
      "501": "Feature is disabled"
    }
  },
  "GET /plugins": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /plugins": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "413": "Content too large",
      "501": "Feature is disabled"
    }
  },
  "DELETE /plugins/{plugin_id}": {
    "path": [
      "plugin_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /plugins/{plugin_id}/enable": {
    "path": [
      "plugin_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "POST /plugins/{plugin_id}/disable": {
    "path": [
      "plugin_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /plugins/webapp": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /roles/{role_id}": {
    "path": [
      "role_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "404": "Resource not found"
    }
  },
  "GET /roles/name/{role_name}": {
    "path": [
      "role_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "404": "Resource not found"
    }
  },
  "PUT /roles/{role_id}/patch": {
    "path": [
      "role_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /roles/names": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "404": "Resource not found"
    }
  },
  "GET /schemes": {
    "path": [],
    "query": [
      "scope",
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /schemes": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "GET /schemes/{scheme_id}": {
    "path": [
      "scheme_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "No access token provided",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "DELETE /schemes/{scheme_id}": {
    "path": [
      "scheme_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "501": "Feature is disabled"
    }
  },
  "PUT /schemes/{scheme_id}/patch": {
    "path": [
      "scheme_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "501": "Feature is disabled"
    }
  },
  "GET /schemes/{scheme_id}/teams": {
    "path": [
      "scheme_id"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "GET /schemes/{scheme_id}/channels": {
    "path": [
      "scheme_id"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found"
    }
  },
  "POST /opengraph": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "501": "Feature is disabled"
    }
  },
  "POST /reactions": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /posts/{post_id}/reactions": {
    "path": [
      "post_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "DELETE /users/{user_id}/posts/{post_id}/reactions/{emoji_name}": {
    "path": [
      "user_id",
      "post_id",
      "emoji_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /posts/ids/reactions": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /actions/dialogs/open": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body"
    }
  },
  "POST /actions/dialogs/submit": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /bots": {
    "path": [],
    "query": [
      "page",
      "per_page",
      "include_deleted",
      "only_orphaned"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /bots": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /bots/{bot_user_id}": {
    "path": [
      "bot_user_id"
    ],
    "query": [
      "include_deleted"
    ],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "PUT /bots/{bot_user_id}": {
    "path": [
      "bot_user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /bots/{bot_user_id}/disable": {
    "path": [
      "bot_user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /bots/{bot_user_id}/enable": {
    "path": [
      "bot_user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "POST /bots/{bot_user_id}/assign/{user_id}": {
    "path": [
      "bot_user_id",
      "user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions"
    }
  },
  "GET /bots/{bot_user_id}/icon": {
    "path": [
      "bot_user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "500": "Something went wrong with the server",
      "501": "Feature is disabled"
    }
  },
  "POST /bots/{bot_user_id}/icon": {
    "path": [
      "bot_user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "413": "Content too large",
      "500": "Something went wrong with the server",
      "501": "Feature is disabled"
    }
  },
  "DELETE /bots/{bot_user_id}/icon": {
    "path": [
      "bot_user_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Invalid or missing parameters in URL or request body",
      "401": "No access token provided",
      "403": "Do not have appropriate permissions",
      "404": "Resource not found",
      "500": "Something went wrong with the server",
      "501": "Feature is disabled"
    }
  }
}

export class MattermostService {
  private baseUrl: string

  constructor(private creds: { token: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('MATTERMOST_BASE_URL') as string
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
        default: throw new Error(`Mattermost API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
