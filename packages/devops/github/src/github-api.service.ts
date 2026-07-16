import { OAuth2Client } from '@pikku/core/oauth2'
import type { TypedSecretService } from '#pikku/secrets/pikku-secrets.gen.js'
import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/variables/pikku-variables.gen.js'

export const GITHUB_OAUTH2_CONFIG = {
  tokenSecretId: 'GITHUB_TOKENS',
  authorizationUrl: "https://example.com/oauth2/authorize",
  tokenUrl: "https://example.com/oauth2/token",
  scopes: ["read","write"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "GET /": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /app": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /app-manifests/{code}/conversions": {
    "path": [
      "code"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /app/hook/config": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PATCH /app/hook/config": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /app/hook/deliveries": {
    "path": [],
    "query": [
      "per_page",
      "cursor",
      "redelivery"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /app/hook/deliveries/{delivery_id}": {
    "path": [
      "delivery_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /app/hook/deliveries/{delivery_id}/attempts": {
    "path": [
      "delivery_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /app/installations": {
    "path": [],
    "query": [
      "per_page",
      "page",
      "since",
      "outdated"
    ],
    "headers": []
  },
  "GET /app/installations/{installation_id}": {
    "path": [
      "installation_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /app/installations/{installation_id}": {
    "path": [
      "installation_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /app/installations/{installation_id}/access_tokens": {
    "path": [
      "installation_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PUT /app/installations/{installation_id}/suspended": {
    "path": [
      "installation_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /app/installations/{installation_id}/suspended": {
    "path": [
      "installation_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /applications/{client_id}/grant": {
    "path": [
      "client_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /applications/{client_id}/token": {
    "path": [
      "client_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PATCH /applications/{client_id}/token": {
    "path": [
      "client_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /applications/{client_id}/token": {
    "path": [
      "client_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /applications/{client_id}/token/scoped": {
    "path": [
      "client_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /apps/{app_slug}": {
    "path": [
      "app_slug"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /codes_of_conduct": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /codes_of_conduct/{key}": {
    "path": [
      "key"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /emojis": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /enterprises/{enterprise}/dependabot/alerts": {
    "path": [
      "enterprise"
    ],
    "query": [
      "state",
      "severity",
      "ecosystem",
      "package",
      "scope",
      "sort",
      "direction",
      "before",
      "after",
      "first",
      "last",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /enterprises/{enterprise}/secret-scanning/alerts": {
    "path": [
      "enterprise"
    ],
    "query": [
      "state",
      "secret_type",
      "resolution",
      "sort",
      "direction",
      "per_page",
      "before",
      "after"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "GET /events": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "503": "Service unavailable"
    }
  },
  "GET /feeds": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /gists": {
    "path": [],
    "query": [
      "since",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden"
    }
  },
  "POST /gists": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /gists/public": {
    "path": [],
    "query": [
      "since",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /gists/starred": {
    "path": [],
    "query": [
      "since",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "GET /gists/{gist_id}": {
    "path": [
      "gist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden Gist",
      "404": "Resource not found"
    }
  },
  "PATCH /gists/{gist_id}": {
    "path": [
      "gist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /gists/{gist_id}": {
    "path": [
      "gist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /gists/{gist_id}/comments": {
    "path": [
      "gist_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /gists/{gist_id}/comments": {
    "path": [
      "gist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /gists/{gist_id}/comments/{comment_id}": {
    "path": [
      "gist_id",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden Gist",
      "404": "Resource not found"
    }
  },
  "PATCH /gists/{gist_id}/comments/{comment_id}": {
    "path": [
      "gist_id",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /gists/{gist_id}/comments/{comment_id}": {
    "path": [
      "gist_id",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /gists/{gist_id}/commits": {
    "path": [
      "gist_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /gists/{gist_id}/forks": {
    "path": [
      "gist_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /gists/{gist_id}/forks": {
    "path": [
      "gist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /gists/{gist_id}/star": {
    "path": [
      "gist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Not Found if gist is not starred"
    }
  },
  "PUT /gists/{gist_id}/star": {
    "path": [
      "gist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "DELETE /gists/{gist_id}/star": {
    "path": [
      "gist_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /gists/{gist_id}/{sha}": {
    "path": [
      "gist_id",
      "sha"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /gitignore/templates": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /gitignore/templates/{name}": {
    "path": [
      "name"
    ],
    "query": [],
    "headers": []
  },
  "GET /installation/repositories": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "DELETE /installation/token": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /issues": {
    "path": [],
    "query": [
      "filter",
      "state",
      "labels",
      "sort",
      "direction",
      "since",
      "collab",
      "orgs",
      "owned",
      "pulls",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /licenses": {
    "path": [],
    "query": [
      "featured",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /licenses/{license}": {
    "path": [
      "license"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /markdown": {
    "path": [],
    "query": [],
    "headers": []
  },
  "POST /markdown/raw": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /marketplace_listing/accounts/{account_id}": {
    "path": [
      "account_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "404": "Not Found when the account has not purchased the listing"
    }
  },
  "GET /marketplace_listing/plans": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "404": "Resource not found"
    }
  },
  "GET /marketplace_listing/plans/{plan_id}/accounts": {
    "path": [
      "plan_id"
    ],
    "query": [
      "sort",
      "direction",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /marketplace_listing/stubbed/accounts/{account_id}": {
    "path": [
      "account_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "404": "Not Found when the account has not purchased the listing"
    }
  },
  "GET /marketplace_listing/stubbed/plans": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication"
    }
  },
  "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts": {
    "path": [
      "plan_id"
    ],
    "query": [
      "sort",
      "direction",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication"
    }
  },
  "GET /meta": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /networks/{owner}/{repo}/events": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /notifications": {
    "path": [],
    "query": [
      "all",
      "participating",
      "since",
      "before",
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PUT /notifications": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "GET /notifications/threads/{thread_id}": {
    "path": [
      "thread_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "PATCH /notifications/threads/{thread_id}": {
    "path": [
      "thread_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden"
    }
  },
  "GET /notifications/threads/{thread_id}/subscription": {
    "path": [
      "thread_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "PUT /notifications/threads/{thread_id}/subscription": {
    "path": [
      "thread_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "DELETE /notifications/threads/{thread_id}/subscription": {
    "path": [
      "thread_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "GET /octocat": {
    "path": [],
    "query": [
      "s"
    ],
    "headers": []
  },
  "GET /organizations": {
    "path": [],
    "query": [
      "since",
      "per_page"
    ],
    "headers": []
  },
  "GET /orgs/{org}": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PATCH /orgs/{org}": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Conflict",
      "422": "Validation failed"
    }
  },
  "GET /orgs/{org}/actions/cache/usage": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/actions/cache/usage-by-repository": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/actions/oidc/customization/sub": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/actions/oidc/customization/sub": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/actions/permissions": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/actions/permissions": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/actions/permissions/repositories": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "PUT /orgs/{org}/actions/permissions/repositories": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/actions/permissions/repositories/{repository_id}": {
    "path": [
      "org",
      "repository_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}": {
    "path": [
      "org",
      "repository_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/actions/permissions/selected-actions": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/actions/permissions/selected-actions": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/actions/permissions/workflow": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/actions/permissions/workflow": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/actions/required_workflows": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /orgs/{org}/actions/required_workflows": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /orgs/{org}/actions/required_workflows/{required_workflow_id}": {
    "path": [
      "org",
      "required_workflow_id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /orgs/{org}/actions/required_workflows/{required_workflow_id}": {
    "path": [
      "org",
      "required_workflow_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /orgs/{org}/actions/required_workflows/{required_workflow_id}": {
    "path": [
      "org",
      "required_workflow_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/actions/required_workflows/{required_workflow_id}/repositories": {
    "path": [
      "org",
      "required_workflow_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource Not Found"
    }
  },
  "PUT /orgs/{org}/actions/required_workflows/{required_workflow_id}/repositories": {
    "path": [
      "org",
      "required_workflow_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/actions/required_workflows/{required_workflow_id}/repositories/{repository_id}": {
    "path": [
      "org",
      "required_workflow_id",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource Not Found",
      "422": "Validation Error"
    }
  },
  "DELETE /orgs/{org}/actions/required_workflows/{required_workflow_id}/repositories/{repository_id}": {
    "path": [
      "org",
      "required_workflow_id",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource Not Found",
      "422": "Validation Error"
    }
  },
  "GET /orgs/{org}/actions/runners": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/actions/runners/downloads": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "POST /orgs/{org}/actions/runners/registration-token": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "POST /orgs/{org}/actions/runners/remove-token": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/actions/runners/{runner_id}": {
    "path": [
      "org",
      "runner_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orgs/{org}/actions/runners/{runner_id}": {
    "path": [
      "org",
      "runner_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/actions/runners/{runner_id}/labels": {
    "path": [
      "org",
      "runner_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /orgs/{org}/actions/runners/{runner_id}/labels": {
    "path": [
      "org",
      "runner_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PUT /orgs/{org}/actions/runners/{runner_id}/labels": {
    "path": [
      "org",
      "runner_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /orgs/{org}/actions/runners/{runner_id}/labels": {
    "path": [
      "org",
      "runner_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /orgs/{org}/actions/runners/{runner_id}/labels/{name}": {
    "path": [
      "org",
      "runner_id",
      "name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /orgs/{org}/actions/secrets": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/actions/secrets/public-key": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/actions/secrets/{secret_name}": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/actions/secrets/{secret_name}": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orgs/{org}/actions/secrets/{secret_name}": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/actions/secrets/{secret_name}/repositories": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": []
  },
  "PUT /orgs/{org}/actions/secrets/{secret_name}/repositories": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}": {
    "path": [
      "org",
      "secret_name",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Conflict when visibility type is not set to selected"
    }
  },
  "DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}": {
    "path": [
      "org",
      "secret_name",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Conflict when visibility type not set to selected"
    }
  },
  "GET /orgs/{org}/actions/variables": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /orgs/{org}/actions/variables": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/actions/variables/{name}": {
    "path": [
      "org",
      "name"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /orgs/{org}/actions/variables/{name}": {
    "path": [
      "org",
      "name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orgs/{org}/actions/variables/{name}": {
    "path": [
      "org",
      "name"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/actions/variables/{name}/repositories": {
    "path": [
      "org",
      "name"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "409": "Response when the visibility of the variable is not set to `selected`"
    }
  },
  "PUT /orgs/{org}/actions/variables/{name}/repositories": {
    "path": [
      "org",
      "name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Response when the visibility of the variable is not set to `selected`"
    }
  },
  "PUT /orgs/{org}/actions/variables/{name}/repositories/{repository_id}": {
    "path": [
      "org",
      "name",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Response when the visibility of the variable is not set to `selected`"
    }
  },
  "DELETE /orgs/{org}/actions/variables/{name}/repositories/{repository_id}": {
    "path": [
      "org",
      "name",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Response when the visibility of the variable is not set to `selected`"
    }
  },
  "GET /orgs/{org}/blocks": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/blocks/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "If the user is not blocked"
    }
  },
  "PUT /orgs/{org}/blocks/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /orgs/{org}/blocks/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/code-scanning/alerts": {
    "path": [
      "org"
    ],
    "query": [
      "tool_name",
      "tool_guid",
      "before",
      "after",
      "page",
      "per_page",
      "direction",
      "state",
      "sort",
      "severity"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "GET /orgs/{org}/codespaces": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "PUT /orgs/{org}/codespaces/billing": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Users are neither members nor collaborators of this organization.",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed.",
      "500": "Internal Error"
    }
  },
  "POST /orgs/{org}/codespaces/billing/selected_users": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Users are neither members nor collaborators of this organization.",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed.",
      "500": "Internal Error"
    }
  },
  "DELETE /orgs/{org}/codespaces/billing/selected_users": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Users are neither members nor collaborators of this organization.",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed.",
      "500": "Internal Error"
    }
  },
  "GET /orgs/{org}/codespaces/secrets": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/codespaces/secrets/public-key": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/codespaces/secrets/{secret_name}": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/codespaces/secrets/{secret_name}": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /orgs/{org}/codespaces/secrets/{secret_name}": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "409": "Conflict when visibility type not set to selected"
    }
  },
  "PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}": {
    "path": [
      "org",
      "secret_name",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "409": "Conflict when visibility type is not set to selected",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}": {
    "path": [
      "org",
      "secret_name",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "409": "Conflict when visibility type not set to selected",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /orgs/{org}/dependabot/alerts": {
    "path": [
      "org"
    ],
    "query": [
      "state",
      "severity",
      "ecosystem",
      "package",
      "scope",
      "sort",
      "direction",
      "before",
      "after",
      "first",
      "last",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /orgs/{org}/dependabot/secrets": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/dependabot/secrets/public-key": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/dependabot/secrets/{secret_name}": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/dependabot/secrets/{secret_name}": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orgs/{org}/dependabot/secrets/{secret_name}": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": []
  },
  "PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories": {
    "path": [
      "org",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}": {
    "path": [
      "org",
      "secret_name",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Conflict when visibility type is not set to selected"
    }
  },
  "DELETE /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}": {
    "path": [
      "org",
      "secret_name",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Conflict when visibility type not set to selected"
    }
  },
  "GET /orgs/{org}/events": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/failed_invitations": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/hooks": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /orgs/{org}/hooks": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /orgs/{org}/hooks/{hook_id}": {
    "path": [
      "org",
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PATCH /orgs/{org}/hooks/{hook_id}": {
    "path": [
      "org",
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /orgs/{org}/hooks/{hook_id}": {
    "path": [
      "org",
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/hooks/{hook_id}/config": {
    "path": [
      "org",
      "hook_id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /orgs/{org}/hooks/{hook_id}/config": {
    "path": [
      "org",
      "hook_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/hooks/{hook_id}/deliveries": {
    "path": [
      "org",
      "hook_id"
    ],
    "query": [
      "per_page",
      "cursor",
      "redelivery"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}": {
    "path": [
      "org",
      "hook_id",
      "delivery_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts": {
    "path": [
      "org",
      "hook_id",
      "delivery_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /orgs/{org}/hooks/{hook_id}/pings": {
    "path": [
      "org",
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/installation": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/installations": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/interaction-limits": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/interaction-limits": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /orgs/{org}/interaction-limits": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/invitations": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page",
      "role",
      "invitation_source"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /orgs/{org}/invitations": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /orgs/{org}/invitations/{invitation_id}": {
    "path": [
      "org",
      "invitation_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /orgs/{org}/invitations/{invitation_id}/teams": {
    "path": [
      "org",
      "invitation_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/issues": {
    "path": [
      "org"
    ],
    "query": [
      "filter",
      "state",
      "labels",
      "sort",
      "direction",
      "since",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/members": {
    "path": [
      "org"
    ],
    "query": [
      "filter",
      "role",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /orgs/{org}/members/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Not Found if requester is an organization member and user is not a member"
    }
  },
  "DELETE /orgs/{org}/members/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden"
    }
  },
  "GET /orgs/{org}/members/{username}/codespaces": {
    "path": [
      "org",
      "username"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "DELETE /orgs/{org}/members/{username}/codespaces/{codespace_name}": {
    "path": [
      "org",
      "username",
      "codespace_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "POST /orgs/{org}/members/{username}/codespaces/{codespace_name}/stop": {
    "path": [
      "org",
      "username",
      "codespace_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "GET /orgs/{org}/memberships/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "PUT /orgs/{org}/memberships/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /orgs/{org}/memberships/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/migrations": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page",
      "exclude"
    ],
    "headers": []
  },
  "POST /orgs/{org}/migrations": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /orgs/{org}/migrations/{migration_id}": {
    "path": [
      "org",
      "migration_id"
    ],
    "query": [
      "exclude"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/migrations/{migration_id}/archive": {
    "path": [
      "org",
      "migration_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /orgs/{org}/migrations/{migration_id}/archive": {
    "path": [
      "org",
      "migration_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock": {
    "path": [
      "org",
      "migration_id",
      "repo_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/migrations/{migration_id}/repositories": {
    "path": [
      "org",
      "migration_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/outside_collaborators": {
    "path": [
      "org"
    ],
    "query": [
      "filter",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "PUT /orgs/{org}/outside_collaborators/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden if user is the last owner of the organization, not a member of the organization, or if the enterprise enforces a policy for inviting outside collaborators. For more information, see \"[Enforcing repository management policies in your enterprise](https://docs.github.com/admin/policies/enforcing-policies-for-your-enterprise/enforcing-repository-management-policies-in-your-enterprise#enforcing-a-policy-for-inviting-outside-collaborators-to-repositories).\"",
      "404": "Resource not found"
    }
  },
  "DELETE /orgs/{org}/outside_collaborators/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Unprocessable Entity if user is a member of the organization"
    }
  },
  "GET /orgs/{org}/packages": {
    "path": [
      "org"
    ],
    "query": [
      "package_type",
      "visibility",
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "GET /orgs/{org}/packages/{package_type}/{package_name}": {
    "path": [
      "package_type",
      "package_name",
      "org"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orgs/{org}/packages/{package_type}/{package_name}": {
    "path": [
      "package_type",
      "package_name",
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /orgs/{org}/packages/{package_type}/{package_name}/restore": {
    "path": [
      "package_type",
      "package_name",
      "org"
    ],
    "query": [
      "token"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/packages/{package_type}/{package_name}/versions": {
    "path": [
      "package_type",
      "package_name",
      "org"
    ],
    "query": [
      "page",
      "per_page",
      "state"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}": {
    "path": [
      "package_type",
      "package_name",
      "org",
      "package_version_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}": {
    "path": [
      "package_type",
      "package_name",
      "org",
      "package_version_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore": {
    "path": [
      "package_type",
      "package_name",
      "org",
      "package_version_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /orgs/{org}/projects": {
    "path": [
      "org"
    ],
    "query": [
      "state",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /orgs/{org}/projects": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "410": "Gone",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /orgs/{org}/public_members": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/public_members/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Not Found if user is not a public member"
    }
  },
  "PUT /orgs/{org}/public_members/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden"
    }
  },
  "DELETE /orgs/{org}/public_members/{username}": {
    "path": [
      "org",
      "username"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/repos": {
    "path": [
      "org"
    ],
    "query": [
      "type",
      "sort",
      "direction",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /orgs/{org}/repos": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /orgs/{org}/secret-scanning/alerts": {
    "path": [
      "org"
    ],
    "query": [
      "state",
      "secret_type",
      "resolution",
      "sort",
      "direction",
      "page",
      "per_page",
      "before",
      "after"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "GET /orgs/{org}/security-managers": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "PUT /orgs/{org}/security-managers/teams/{team_slug}": {
    "path": [
      "org",
      "team_slug"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "The organization has reached the maximum number of security manager teams."
    }
  },
  "DELETE /orgs/{org}/security-managers/teams/{team_slug}": {
    "path": [
      "org",
      "team_slug"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/settings/billing/actions": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/settings/billing/packages": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/settings/billing/shared-storage": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/teams": {
    "path": [
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden"
    }
  },
  "POST /orgs/{org}/teams": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /orgs/{org}/teams/{team_slug}": {
    "path": [
      "org",
      "team_slug"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PATCH /orgs/{org}/teams/{team_slug}": {
    "path": [
      "org",
      "team_slug"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /orgs/{org}/teams/{team_slug}": {
    "path": [
      "org",
      "team_slug"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/discussions": {
    "path": [
      "org",
      "team_slug"
    ],
    "query": [
      "direction",
      "per_page",
      "page",
      "pinned"
    ],
    "headers": []
  },
  "POST /orgs/{org}/teams/{team_slug}/discussions": {
    "path": [
      "org",
      "team_slug"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}": {
    "path": [
      "org",
      "team_slug",
      "discussion_number"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}": {
    "path": [
      "org",
      "team_slug",
      "discussion_number"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}": {
    "path": [
      "org",
      "team_slug",
      "discussion_number"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments": {
    "path": [
      "org",
      "team_slug",
      "discussion_number"
    ],
    "query": [
      "direction",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments": {
    "path": [
      "org",
      "team_slug",
      "discussion_number"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}": {
    "path": [
      "org",
      "team_slug",
      "discussion_number",
      "comment_number"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}": {
    "path": [
      "org",
      "team_slug",
      "discussion_number",
      "comment_number"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}": {
    "path": [
      "org",
      "team_slug",
      "discussion_number",
      "comment_number"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions": {
    "path": [
      "org",
      "team_slug",
      "discussion_number",
      "comment_number"
    ],
    "query": [
      "content",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions": {
    "path": [
      "org",
      "team_slug",
      "discussion_number",
      "comment_number"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}": {
    "path": [
      "org",
      "team_slug",
      "discussion_number",
      "comment_number",
      "reaction_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions": {
    "path": [
      "org",
      "team_slug",
      "discussion_number"
    ],
    "query": [
      "content",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions": {
    "path": [
      "org",
      "team_slug",
      "discussion_number"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}": {
    "path": [
      "org",
      "team_slug",
      "discussion_number",
      "reaction_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/invitations": {
    "path": [
      "org",
      "team_slug"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/members": {
    "path": [
      "org",
      "team_slug"
    ],
    "query": [
      "role",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/memberships/{username}": {
    "path": [
      "org",
      "team_slug",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "if user has no team membership"
    }
  },
  "PUT /orgs/{org}/teams/{team_slug}/memberships/{username}": {
    "path": [
      "org",
      "team_slug",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden if team synchronization is set up",
      "422": "Unprocessable Entity if you attempt to add an organization to a team"
    }
  },
  "DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}": {
    "path": [
      "org",
      "team_slug",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden if team synchronization is set up"
    }
  },
  "GET /orgs/{org}/teams/{team_slug}/projects": {
    "path": [
      "org",
      "team_slug"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/projects/{project_id}": {
    "path": [
      "org",
      "team_slug",
      "project_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Not Found if project is not managed by this team"
    }
  },
  "PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}": {
    "path": [
      "org",
      "team_slug",
      "project_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden if the project is not owned by the organization"
    }
  },
  "DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}": {
    "path": [
      "org",
      "team_slug",
      "project_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/repos": {
    "path": [
      "org",
      "team_slug"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}": {
    "path": [
      "org",
      "team_slug",
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Not Found if team does not have permission for the repository"
    }
  },
  "PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}": {
    "path": [
      "org",
      "team_slug",
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}": {
    "path": [
      "org",
      "team_slug",
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /orgs/{org}/teams/{team_slug}/teams": {
    "path": [
      "org",
      "team_slug"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /orgs/{org}/{security_product}/{enablement}": {
    "path": [
      "org",
      "security_product",
      "enablement"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "The action could not be taken due to an in progress enablement, or a policy is preventing enablement"
    }
  },
  "GET /projects/columns/cards/{card_id}": {
    "path": [
      "card_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "PATCH /projects/columns/cards/{card_id}": {
    "path": [
      "card_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /projects/columns/cards/{card_id}": {
    "path": [
      "card_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /projects/columns/cards/{card_id}/moves": {
    "path": [
      "card_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed.",
      "503": "Response"
    }
  },
  "GET /projects/columns/{column_id}": {
    "path": [
      "column_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "PATCH /projects/columns/{column_id}": {
    "path": [
      "column_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "DELETE /projects/columns/{column_id}": {
    "path": [
      "column_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "GET /projects/columns/{column_id}/cards": {
    "path": [
      "column_id"
    ],
    "query": [
      "archived_state",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "POST /projects/columns/{column_id}/cards": {
    "path": [
      "column_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "422": "Validation failed",
      "503": "Response"
    }
  },
  "POST /projects/columns/{column_id}/moves": {
    "path": [
      "column_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /projects/{project_id}": {
    "path": [
      "project_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "PATCH /projects/{project_id}": {
    "path": [
      "project_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Not Found if the authenticated user does not have access to the project",
      "410": "Gone",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /projects/{project_id}": {
    "path": [
      "project_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "410": "Gone"
    }
  },
  "GET /projects/{project_id}/collaborators": {
    "path": [
      "project_id"
    ],
    "query": [
      "affiliation",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PUT /projects/{project_id}/collaborators/{username}": {
    "path": [
      "project_id",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /projects/{project_id}/collaborators/{username}": {
    "path": [
      "project_id",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /projects/{project_id}/collaborators/{username}/permission": {
    "path": [
      "project_id",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /projects/{project_id}/columns": {
    "path": [
      "project_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "POST /projects/{project_id}/columns": {
    "path": [
      "project_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /rate_limit": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{org}/{repo}/actions/required_workflows": {
    "path": [
      "org",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{org}/{repo}/actions/required_workflows/{required_workflow_id_for_repo}": {
    "path": [
      "org",
      "repo",
      "required_workflow_id_for_repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{org}/{repo}/actions/required_workflows/{required_workflow_id_for_repo}/timing": {
    "path": [
      "org",
      "repo",
      "required_workflow_id_for_repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "PATCH /repos/{owner}/{repo}": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "If an organization owner has configured the organization to prevent members from deleting organization-owned repositories, a member will get this response:",
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/actions/artifacts": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page",
      "name"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}": {
    "path": [
      "owner",
      "repo",
      "artifact_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}": {
    "path": [
      "owner",
      "repo",
      "artifact_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}": {
    "path": [
      "owner",
      "repo",
      "artifact_id",
      "archive_format"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "410": "Gone"
    }
  },
  "GET /repos/{owner}/{repo}/actions/cache/usage": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/caches": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page",
      "ref",
      "key",
      "sort",
      "direction"
    ],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/actions/caches": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "key",
      "ref"
    ],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}": {
    "path": [
      "owner",
      "repo",
      "cache_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/jobs/{job_id}": {
    "path": [
      "owner",
      "repo",
      "job_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs": {
    "path": [
      "owner",
      "repo",
      "job_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/actions/jobs/{job_id}/rerun": {
    "path": [
      "owner",
      "repo",
      "job_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden"
    }
  },
  "GET /repos/{owner}/{repo}/actions/oidc/customization/sub": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "404": "Resource not found"
    }
  },
  "PUT /repos/{owner}/{repo}/actions/oidc/customization/sub": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/actions/permissions": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/actions/permissions": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/permissions/access": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/actions/permissions/access": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/permissions/selected-actions": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/actions/permissions/selected-actions": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/permissions/workflow": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/actions/permissions/workflow": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Conflict response when changing a setting is prevented by the owning organization"
    }
  },
  "GET /repos/{owner}/{repo}/actions/required_workflows/{required_workflow_id_for_repo}/runs": {
    "path": [
      "owner",
      "repo",
      "required_workflow_id_for_repo"
    ],
    "query": [
      "actor",
      "branch",
      "event",
      "status",
      "per_page",
      "page",
      "created",
      "exclude_pull_requests",
      "check_suite_id",
      "head_sha"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/runners": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/runners/downloads": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/actions/runners/registration-token": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/actions/runners/remove-token": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/runners/{runner_id}": {
    "path": [
      "owner",
      "repo",
      "runner_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}": {
    "path": [
      "owner",
      "repo",
      "runner_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/runners/{runner_id}/labels": {
    "path": [
      "owner",
      "repo",
      "runner_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/actions/runners/{runner_id}/labels": {
    "path": [
      "owner",
      "repo",
      "runner_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PUT /repos/{owner}/{repo}/actions/runners/{runner_id}/labels": {
    "path": [
      "owner",
      "repo",
      "runner_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels": {
    "path": [
      "owner",
      "repo",
      "runner_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}": {
    "path": [
      "owner",
      "repo",
      "runner_id",
      "name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/actions/runs": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "actor",
      "branch",
      "event",
      "status",
      "per_page",
      "page",
      "created",
      "exclude_pull_requests",
      "check_suite_id",
      "head_sha"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [
      "exclude_pull_requests"
    ],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/actions/runs/{run_id}": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}": {
    "path": [
      "owner",
      "repo",
      "run_id",
      "attempt_number"
    ],
    "query": [
      "exclude_pull_requests"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs": {
    "path": [
      "owner",
      "repo",
      "run_id",
      "attempt_number"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs": {
    "path": [
      "owner",
      "repo",
      "run_id",
      "attempt_number"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Conflict"
    }
  },
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [
      "filter",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "500": "Internal Error"
    }
  },
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing": {
    "path": [
      "owner",
      "repo",
      "run_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/secrets": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/secrets/public-key": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/secrets/{secret_name}": {
    "path": [
      "owner",
      "repo",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}": {
    "path": [
      "owner",
      "repo",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}": {
    "path": [
      "owner",
      "repo",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/variables": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/actions/variables": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/variables/{name}": {
    "path": [
      "owner",
      "repo",
      "name"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /repos/{owner}/{repo}/actions/variables/{name}": {
    "path": [
      "owner",
      "repo",
      "name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/actions/variables/{name}": {
    "path": [
      "owner",
      "repo",
      "name"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/workflows": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}": {
    "path": [
      "owner",
      "repo",
      "workflow_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable": {
    "path": [
      "owner",
      "repo",
      "workflow_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches": {
    "path": [
      "owner",
      "repo",
      "workflow_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable": {
    "path": [
      "owner",
      "repo",
      "workflow_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs": {
    "path": [
      "owner",
      "repo",
      "workflow_id"
    ],
    "query": [
      "actor",
      "branch",
      "event",
      "status",
      "per_page",
      "page",
      "created",
      "exclude_pull_requests",
      "check_suite_id",
      "head_sha"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing": {
    "path": [
      "owner",
      "repo",
      "workflow_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/assignees": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/assignees/{assignee}": {
    "path": [
      "owner",
      "repo",
      "assignee"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Otherwise a `404` status code is returned."
    }
  },
  "GET /repos/{owner}/{repo}/autolinks": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "page"
    ],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/autolinks": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/autolinks/{autolink_id}": {
    "path": [
      "owner",
      "repo",
      "autolink_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /repos/{owner}/{repo}/autolinks/{autolink_id}": {
    "path": [
      "owner",
      "repo",
      "autolink_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PUT /repos/{owner}/{repo}/automated-security-fixes": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/automated-security-fixes": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/branches": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "protected",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/branches/{branch}": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/branches/{branch}/protection": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PUT /repos/{owner}/{repo}/branches/{branch}/protection": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/branches/{branch}/protection": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden"
    }
  },
  "GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/branches/{branch}/rename": {
    "path": [
      "owner",
      "repo",
      "branch"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/check-runs": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/check-runs/{check_run_id}": {
    "path": [
      "owner",
      "repo",
      "check_run_id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}": {
    "path": [
      "owner",
      "repo",
      "check_run_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations": {
    "path": [
      "owner",
      "repo",
      "check_run_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest": {
    "path": [
      "owner",
      "repo",
      "check_run_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden if the check run is not rerequestable or doesn't belong to the authenticated GitHub App",
      "404": "Resource not found",
      "422": "Validation error if the check run is not rerequestable"
    }
  },
  "POST /repos/{owner}/{repo}/check-suites": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /repos/{owner}/{repo}/check-suites/preferences": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}": {
    "path": [
      "owner",
      "repo",
      "check_suite_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs": {
    "path": [
      "owner",
      "repo",
      "check_suite_id"
    ],
    "query": [
      "check_name",
      "status",
      "filter",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest": {
    "path": [
      "owner",
      "repo",
      "check_suite_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/code-scanning/alerts": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "tool_name",
      "tool_guid",
      "page",
      "per_page",
      "ref",
      "direction",
      "sort",
      "state",
      "severity"
    ],
    "headers": [],
    "errors": {
      "403": "Response if GitHub Advanced Security is not enabled for this repository",
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}": {
    "path": [
      "owner",
      "repo",
      "alert_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Response if GitHub Advanced Security is not enabled for this repository",
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}": {
    "path": [
      "owner",
      "repo",
      "alert_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Response if the repository is archived or if GitHub Advanced Security is not enabled for this repository",
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances": {
    "path": [
      "owner",
      "repo",
      "alert_number"
    ],
    "query": [
      "page",
      "per_page",
      "ref"
    ],
    "headers": [],
    "errors": {
      "403": "Response if GitHub Advanced Security is not enabled for this repository",
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/code-scanning/analyses": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "tool_name",
      "tool_guid",
      "page",
      "per_page",
      "ref",
      "sarif_id",
      "direction",
      "sort"
    ],
    "headers": [],
    "errors": {
      "403": "Response if GitHub Advanced Security is not enabled for this repository",
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}": {
    "path": [
      "owner",
      "repo",
      "analysis_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Response if GitHub Advanced Security is not enabled for this repository",
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}": {
    "path": [
      "owner",
      "repo",
      "analysis_id"
    ],
    "query": [
      "confirm_delete"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "403": "Response if the repository is archived or if GitHub Advanced Security is not enabled for this repository",
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/code-scanning/codeql/databases": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Response if GitHub Advanced Security is not enabled for this repository",
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}": {
    "path": [
      "owner",
      "repo",
      "language"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Response if GitHub Advanced Security is not enabled for this repository",
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "POST /repos/{owner}/{repo}/code-scanning/sarifs": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request if the sarif field is invalid",
      "403": "Response if the repository is archived or if GitHub Advanced Security is not enabled for this repository",
      "404": "Resource not found",
      "413": "Payload Too Large if the sarif field is too large",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}": {
    "path": [
      "owner",
      "repo",
      "sarif_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Response if GitHub Advanced Security is not enabled for this repository",
      "404": "Not Found if the sarif id does not match any upload",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/codeowners/errors": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "ref"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/codespaces": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "POST /repos/{owner}/{repo}/codespaces": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/codespaces/devcontainers": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "GET /repos/{owner}/{repo}/codespaces/machines": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "location",
      "client_ip"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "GET /repos/{owner}/{repo}/codespaces/new": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "ref",
      "client_ip"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/codespaces/secrets": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/codespaces/secrets/public-key": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/codespaces/secrets/{secret_name}": {
    "path": [
      "owner",
      "repo",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/codespaces/secrets/{secret_name}": {
    "path": [
      "owner",
      "repo",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/codespaces/secrets/{secret_name}": {
    "path": [
      "owner",
      "repo",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/collaborators": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "affiliation",
      "permission",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/collaborators/{username}": {
    "path": [
      "owner",
      "repo",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Not Found if user is not a collaborator"
    }
  },
  "PUT /repos/{owner}/{repo}/collaborators/{username}": {
    "path": [
      "owner",
      "repo",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/collaborators/{username}": {
    "path": [
      "owner",
      "repo",
      "username"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/collaborators/{username}/permission": {
    "path": [
      "owner",
      "repo",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/comments": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/comments/{comment_id}": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PATCH /repos/{owner}/{repo}/comments/{comment_id}": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /repos/{owner}/{repo}/comments/{comment_id}": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [
      "content",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/comments/{comment_id}/reactions": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}": {
    "path": [
      "owner",
      "repo",
      "comment_id",
      "reaction_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/commits": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "sha",
      "path",
      "author",
      "since",
      "until",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "404": "Resource not found",
      "409": "Conflict",
      "500": "Internal Error"
    }
  },
  "GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head": {
    "path": [
      "owner",
      "repo",
      "commit_sha"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments": {
    "path": [
      "owner",
      "repo",
      "commit_sha"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/commits/{commit_sha}/comments": {
    "path": [
      "owner",
      "repo",
      "commit_sha"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls": {
    "path": [
      "owner",
      "repo",
      "commit_sha"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/commits/{ref}": {
    "path": [
      "owner",
      "repo",
      "ref"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed.",
      "500": "Internal Error",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/commits/{ref}/check-runs": {
    "path": [
      "owner",
      "repo",
      "ref"
    ],
    "query": [
      "check_name",
      "status",
      "filter",
      "per_page",
      "page",
      "app_id"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/commits/{ref}/check-suites": {
    "path": [
      "owner",
      "repo",
      "ref"
    ],
    "query": [
      "app_id",
      "check_name",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/commits/{ref}/status": {
    "path": [
      "owner",
      "repo",
      "ref"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/commits/{ref}/statuses": {
    "path": [
      "owner",
      "repo",
      "ref"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/community/profile": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/compare/{basehead}": {
    "path": [
      "owner",
      "repo",
      "basehead"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "500": "Internal Error",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/contents/{path}": {
    "path": [
      "owner",
      "repo",
      "path"
    ],
    "query": [
      "ref"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "PUT /repos/{owner}/{repo}/contents/{path}": {
    "path": [
      "owner",
      "repo",
      "path"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "409": "Conflict",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/contents/{path}": {
    "path": [
      "owner",
      "repo",
      "path"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "409": "Conflict",
      "422": "Validation failed, or the endpoint has been spammed.",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/contributors": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "anon",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/dependabot/alerts": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "state",
      "severity",
      "ecosystem",
      "package",
      "manifest",
      "scope",
      "sort",
      "direction",
      "page",
      "per_page",
      "before",
      "after",
      "first",
      "last"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/dependabot/alerts/{alert_number}": {
    "path": [
      "owner",
      "repo",
      "alert_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "PATCH /repos/{owner}/{repo}/dependabot/alerts/{alert_number}": {
    "path": [
      "owner",
      "repo",
      "alert_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "403": "Forbidden",
      "404": "Resource not found",
      "409": "Conflict",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/dependabot/secrets": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/dependabot/secrets/public-key": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/dependabot/secrets/{secret_name}": {
    "path": [
      "owner",
      "repo",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/dependabot/secrets/{secret_name}": {
    "path": [
      "owner",
      "repo",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/dependabot/secrets/{secret_name}": {
    "path": [
      "owner",
      "repo",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/dependency-graph/compare/{basehead}": {
    "path": [
      "owner",
      "repo",
      "basehead"
    ],
    "query": [
      "name"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/dependency-graph/snapshots": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/deployments": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "sha",
      "ref",
      "task",
      "environment",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/deployments": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Conflict when there is a merge conflict or the commit's status checks failed",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/deployments/{deployment_id}": {
    "path": [
      "owner",
      "repo",
      "deployment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /repos/{owner}/{repo}/deployments/{deployment_id}": {
    "path": [
      "owner",
      "repo",
      "deployment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses": {
    "path": [
      "owner",
      "repo",
      "deployment_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses": {
    "path": [
      "owner",
      "repo",
      "deployment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}": {
    "path": [
      "owner",
      "repo",
      "deployment_id",
      "status_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/dispatches": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/environments": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/environments/{environment_name}": {
    "path": [
      "owner",
      "repo",
      "environment_name"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/environments/{environment_name}": {
    "path": [
      "owner",
      "repo",
      "environment_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation error when the environment name is invalid or when `protected_branches` and `custom_branch_policies` in `deployment_branch_policy` are set to the same value"
    }
  },
  "DELETE /repos/{owner}/{repo}/environments/{environment_name}": {
    "path": [
      "owner",
      "repo",
      "environment_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies": {
    "path": [
      "owner",
      "repo",
      "environment_name"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies": {
    "path": [
      "owner",
      "repo",
      "environment_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Not Found or `deployment_branch_policy.custom_branch_policies` property for the environment is set to false"
    }
  },
  "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}": {
    "path": [
      "owner",
      "repo",
      "environment_name",
      "branch_policy_id"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}": {
    "path": [
      "owner",
      "repo",
      "environment_name",
      "branch_policy_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}": {
    "path": [
      "owner",
      "repo",
      "environment_name",
      "branch_policy_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/events": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/forks": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "sort",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request"
    }
  },
  "POST /repos/{owner}/{repo}/forks": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/git/blobs": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "409": "Conflict",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/git/blobs/{file_sha}": {
    "path": [
      "owner",
      "repo",
      "file_sha"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/git/commits": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/git/commits/{commit_sha}": {
    "path": [
      "owner",
      "repo",
      "commit_sha"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/git/matching-refs/{ref}": {
    "path": [
      "owner",
      "repo",
      "ref"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/git/ref/{ref}": {
    "path": [
      "owner",
      "repo",
      "ref"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/git/refs": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PATCH /repos/{owner}/{repo}/git/refs/{ref}": {
    "path": [
      "owner",
      "repo",
      "ref"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/git/refs/{ref}": {
    "path": [
      "owner",
      "repo",
      "ref"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/git/tags": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/git/tags/{tag_sha}": {
    "path": [
      "owner",
      "repo",
      "tag_sha"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/git/trees": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/git/trees/{tree_sha}": {
    "path": [
      "owner",
      "repo",
      "tree_sha"
    ],
    "query": [
      "recursive"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/hooks": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/hooks": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/hooks/{hook_id}": {
    "path": [
      "owner",
      "repo",
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PATCH /repos/{owner}/{repo}/hooks/{hook_id}": {
    "path": [
      "owner",
      "repo",
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/hooks/{hook_id}": {
    "path": [
      "owner",
      "repo",
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/hooks/{hook_id}/config": {
    "path": [
      "owner",
      "repo",
      "hook_id"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config": {
    "path": [
      "owner",
      "repo",
      "hook_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries": {
    "path": [
      "owner",
      "repo",
      "hook_id"
    ],
    "query": [
      "per_page",
      "cursor",
      "redelivery"
    ],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}": {
    "path": [
      "owner",
      "repo",
      "hook_id",
      "delivery_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts": {
    "path": [
      "owner",
      "repo",
      "hook_id",
      "delivery_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/hooks/{hook_id}/pings": {
    "path": [
      "owner",
      "repo",
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/hooks/{hook_id}/tests": {
    "path": [
      "owner",
      "repo",
      "hook_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/import": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "503": "Unavailable due to service under maintenance."
    }
  },
  "PUT /repos/{owner}/{repo}/import": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed.",
      "503": "Unavailable due to service under maintenance."
    }
  },
  "PATCH /repos/{owner}/{repo}/import": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "503": "Unavailable due to service under maintenance."
    }
  },
  "DELETE /repos/{owner}/{repo}/import": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "503": "Unavailable due to service under maintenance."
    }
  },
  "GET /repos/{owner}/{repo}/import/authors": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "since"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "503": "Unavailable due to service under maintenance."
    }
  },
  "PATCH /repos/{owner}/{repo}/import/authors/{author_id}": {
    "path": [
      "owner",
      "repo",
      "author_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed.",
      "503": "Unavailable due to service under maintenance."
    }
  },
  "GET /repos/{owner}/{repo}/import/large_files": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "503": "Unavailable due to service under maintenance."
    }
  },
  "PATCH /repos/{owner}/{repo}/import/lfs": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed.",
      "503": "Unavailable due to service under maintenance."
    }
  },
  "GET /repos/{owner}/{repo}/installation": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/interaction-limits": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/interaction-limits": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Response"
    }
  },
  "DELETE /repos/{owner}/{repo}/interaction-limits": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Response"
    }
  },
  "GET /repos/{owner}/{repo}/invitations": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "PATCH /repos/{owner}/{repo}/invitations/{invitation_id}": {
    "path": [
      "owner",
      "repo",
      "invitation_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/invitations/{invitation_id}": {
    "path": [
      "owner",
      "repo",
      "invitation_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/issues": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "milestone",
      "state",
      "assignee",
      "creator",
      "mentioned",
      "labels",
      "sort",
      "direction",
      "since",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/issues": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "410": "Gone",
      "422": "Validation failed, or the endpoint has been spammed.",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/issues/comments": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "sort",
      "direction",
      "since",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/issues/comments/{comment_id}": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [
      "content",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}": {
    "path": [
      "owner",
      "repo",
      "comment_id",
      "reaction_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/issues/events": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/issues/events/{event_id}": {
    "path": [
      "owner",
      "repo",
      "event_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "410": "Gone"
    }
  },
  "GET /repos/{owner}/{repo}/issues/{issue_number}": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "410": "Gone"
    }
  },
  "PATCH /repos/{owner}/{repo}/issues/{issue_number}": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "410": "Gone",
      "422": "Validation failed, or the endpoint has been spammed.",
      "503": "Service unavailable"
    }
  },
  "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}": {
    "path": [
      "owner",
      "repo",
      "issue_number",
      "assignee"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Response if `assignee` can not be assigned to `issue_number`"
    }
  },
  "GET /repos/{owner}/{repo}/issues/{issue_number}/comments": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [
      "since",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "410": "Gone"
    }
  },
  "POST /repos/{owner}/{repo}/issues/{issue_number}/comments": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "410": "Gone",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/issues/{issue_number}/events": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "410": "Gone"
    }
  },
  "GET /repos/{owner}/{repo}/issues/{issue_number}/labels": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "410": "Gone"
    }
  },
  "POST /repos/{owner}/{repo}/issues/{issue_number}/labels": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "410": "Gone",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PUT /repos/{owner}/{repo}/issues/{issue_number}/labels": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "410": "Gone",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "410": "Gone"
    }
  },
  "DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}": {
    "path": [
      "owner",
      "repo",
      "issue_number",
      "name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "410": "Gone"
    }
  },
  "PUT /repos/{owner}/{repo}/issues/{issue_number}/lock": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "410": "Gone",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/issues/{issue_number}/reactions": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [
      "content",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "410": "Gone"
    }
  },
  "POST /repos/{owner}/{repo}/issues/{issue_number}/reactions": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}": {
    "path": [
      "owner",
      "repo",
      "issue_number",
      "reaction_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline": {
    "path": [
      "owner",
      "repo",
      "issue_number"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "410": "Gone"
    }
  },
  "GET /repos/{owner}/{repo}/keys": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/keys": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/keys/{key_id}": {
    "path": [
      "owner",
      "repo",
      "key_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "DELETE /repos/{owner}/{repo}/keys/{key_id}": {
    "path": [
      "owner",
      "repo",
      "key_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/labels": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/labels": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/labels/{name}": {
    "path": [
      "owner",
      "repo",
      "name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PATCH /repos/{owner}/{repo}/labels/{name}": {
    "path": [
      "owner",
      "repo",
      "name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/labels/{name}": {
    "path": [
      "owner",
      "repo",
      "name"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/languages": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/lfs": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "We will return a 403 with one of the following messages:\n\n- Git LFS support not enabled because Git LFS is globally disabled.\n- Git LFS support not enabled because Git LFS is disabled for the root repository in the network.\n- Git LFS support not enabled because Git LFS is disabled for <owner>."
    }
  },
  "DELETE /repos/{owner}/{repo}/lfs": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/license": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/merge-upstream": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "The branch could not be synced because of a merge conflict",
      "422": "The branch could not be synced for some other reason"
    }
  },
  "POST /repos/{owner}/{repo}/merges": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Not Found when the base or head does not exist",
      "409": "Conflict when there is a merge conflict",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/milestones": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "state",
      "sort",
      "direction",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/milestones": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/milestones/{milestone_number}": {
    "path": [
      "owner",
      "repo",
      "milestone_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PATCH /repos/{owner}/{repo}/milestones/{milestone_number}": {
    "path": [
      "owner",
      "repo",
      "milestone_number"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/milestones/{milestone_number}": {
    "path": [
      "owner",
      "repo",
      "milestone_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels": {
    "path": [
      "owner",
      "repo",
      "milestone_number"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/notifications": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "all",
      "participating",
      "since",
      "before",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "PUT /repos/{owner}/{repo}/notifications": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/pages": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/pages": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "409": "Conflict",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PUT /repos/{owner}/{repo}/pages": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "409": "Conflict",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/pages": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "409": "Conflict",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/pages/builds": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/pages/builds": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/pages/builds/latest": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/pages/builds/{build_id}": {
    "path": [
      "owner",
      "repo",
      "build_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/pages/deployment": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/pages/health": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Custom domains are not available for GitHub Pages",
      "404": "Resource not found",
      "422": "There isn't a CNAME for this page"
    }
  },
  "GET /repos/{owner}/{repo}/projects": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "state",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "410": "Gone",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/projects": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "410": "Gone",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/pulls": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "state",
      "head",
      "base",
      "sort",
      "direction",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/pulls": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/pulls/comments": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "sort",
      "direction",
      "since",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [
      "content",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions": {
    "path": [
      "owner",
      "repo",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}": {
    "path": [
      "owner",
      "repo",
      "comment_id",
      "reaction_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/pulls/{pull_number}": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "500": "Internal Error",
      "503": "Service unavailable"
    }
  },
  "PATCH /repos/{owner}/{repo}/pulls/{pull_number}": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/pulls/{pull_number}/codespaces": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [
      "sort",
      "direction",
      "since",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies": {
    "path": [
      "owner",
      "repo",
      "pull_number",
      "comment_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/commits": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/files": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed.",
      "500": "Internal Error",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/merge": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Not Found if pull request has not been merged"
    }
  },
  "PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "405": "Method Not Allowed if merge cannot be performed",
      "409": "Conflict if sha was provided and pull request head did not match",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Unprocessable Entity if user is not a collaborator"
    }
  },
  "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}": {
    "path": [
      "owner",
      "repo",
      "pull_number",
      "review_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}": {
    "path": [
      "owner",
      "repo",
      "pull_number",
      "review_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}": {
    "path": [
      "owner",
      "repo",
      "pull_number",
      "review_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments": {
    "path": [
      "owner",
      "repo",
      "pull_number",
      "review_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals": {
    "path": [
      "owner",
      "repo",
      "pull_number",
      "review_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events": {
    "path": [
      "owner",
      "repo",
      "pull_number",
      "review_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch": {
    "path": [
      "owner",
      "repo",
      "pull_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/readme": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "ref"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/readme/{dir}": {
    "path": [
      "owner",
      "repo",
      "dir"
    ],
    "query": [
      "ref"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/releases": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/releases": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Not Found if the discussion category name is invalid",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/releases/assets/{asset_id}": {
    "path": [
      "owner",
      "repo",
      "asset_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}": {
    "path": [
      "owner",
      "repo",
      "asset_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}": {
    "path": [
      "owner",
      "repo",
      "asset_id"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/releases/generate-notes": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/releases/latest": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/releases/tags/{tag}": {
    "path": [
      "owner",
      "repo",
      "tag"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/releases/{release_id}": {
    "path": [
      "owner",
      "repo",
      "release_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PATCH /repos/{owner}/{repo}/releases/{release_id}": {
    "path": [
      "owner",
      "repo",
      "release_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Not Found if the discussion category name is invalid"
    }
  },
  "DELETE /repos/{owner}/{repo}/releases/{release_id}": {
    "path": [
      "owner",
      "repo",
      "release_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/releases/{release_id}/assets": {
    "path": [
      "owner",
      "repo",
      "release_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/releases/{release_id}/assets": {
    "path": [
      "owner",
      "repo",
      "release_id"
    ],
    "query": [
      "name",
      "label"
    ],
    "headers": [],
    "errors": {
      "422": "Response if you upload an asset with the same filename as another uploaded asset"
    }
  },
  "GET /repos/{owner}/{repo}/releases/{release_id}/reactions": {
    "path": [
      "owner",
      "repo",
      "release_id"
    ],
    "query": [
      "content",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/releases/{release_id}/reactions": {
    "path": [
      "owner",
      "repo",
      "release_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /repos/{owner}/{repo}/releases/{release_id}/reactions/{reaction_id}": {
    "path": [
      "owner",
      "repo",
      "release_id",
      "reaction_id"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/secret-scanning/alerts": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "state",
      "secret_type",
      "resolution",
      "sort",
      "direction",
      "page",
      "per_page",
      "before",
      "after"
    ],
    "headers": [],
    "errors": {
      "404": "Repository is public or secret scanning is disabled for the repository",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}": {
    "path": [
      "owner",
      "repo",
      "alert_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Repository is public, or secret scanning is disabled for the repository, or the resource is not found",
      "503": "Service unavailable"
    }
  },
  "PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}": {
    "path": [
      "owner",
      "repo",
      "alert_number"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad request, resolution comment is invalid or the resolution was not changed.",
      "404": "Repository is public, or secret scanning is disabled for the repository, or the resource is not found",
      "422": "State does not match the resolution or resolution comment",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations": {
    "path": [
      "owner",
      "repo",
      "alert_number"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "404": "Repository is public, or secret scanning is disabled for the repository, or the resource is not found",
      "503": "Service unavailable"
    }
  },
  "GET /repos/{owner}/{repo}/stargazers": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/stats/code_frequency": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/stats/commit_activity": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/stats/contributors": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/stats/participation": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/stats/punch_card": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{owner}/{repo}/statuses/{sha}": {
    "path": [
      "owner",
      "repo",
      "sha"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/subscribers": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/subscription": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Not Found if you don't subscribe to the repository"
    }
  },
  "PUT /repos/{owner}/{repo}/subscription": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/subscription": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/tags": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/tags/protection": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /repos/{owner}/{repo}/tags/protection": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "DELETE /repos/{owner}/{repo}/tags/protection/{tag_protection_id}": {
    "path": [
      "owner",
      "repo",
      "tag_protection_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /repos/{owner}/{repo}/tarball/{ref}": {
    "path": [
      "owner",
      "repo",
      "ref"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/teams": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/topics": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "page",
      "per_page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "PUT /repos/{owner}/{repo}/topics": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repos/{owner}/{repo}/traffic/clones": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden"
    }
  },
  "GET /repos/{owner}/{repo}/traffic/popular/paths": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden"
    }
  },
  "GET /repos/{owner}/{repo}/traffic/popular/referrers": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden"
    }
  },
  "GET /repos/{owner}/{repo}/traffic/views": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [
      "per"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden"
    }
  },
  "POST /repos/{owner}/{repo}/transfer": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/vulnerability-alerts": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Not Found if repository is not enabled with vulnerability alerts"
    }
  },
  "PUT /repos/{owner}/{repo}/vulnerability-alerts": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repos/{owner}/{repo}/vulnerability-alerts": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repos/{owner}/{repo}/zipball/{ref}": {
    "path": [
      "owner",
      "repo",
      "ref"
    ],
    "query": [],
    "headers": []
  },
  "POST /repos/{template_owner}/{template_repo}/generate": {
    "path": [
      "template_owner",
      "template_repo"
    ],
    "query": [],
    "headers": []
  },
  "GET /repositories": {
    "path": [],
    "query": [
      "since"
    ],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /repositories/{repository_id}/environments/{environment_name}/secrets": {
    "path": [
      "repository_id",
      "environment_name"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key": {
    "path": [
      "repository_id",
      "environment_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}": {
    "path": [
      "repository_id",
      "environment_name",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}": {
    "path": [
      "repository_id",
      "environment_name",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}": {
    "path": [
      "repository_id",
      "environment_name",
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /repositories/{repository_id}/environments/{environment_name}/variables": {
    "path": [
      "repository_id",
      "environment_name"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "POST /repositories/{repository_id}/environments/{environment_name}/variables": {
    "path": [
      "repository_id",
      "environment_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}": {
    "path": [
      "repository_id",
      "environment_name",
      "name"
    ],
    "query": [],
    "headers": []
  },
  "PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}": {
    "path": [
      "repository_id",
      "name",
      "environment_name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /repositories/{repository_id}/environments/{environment_name}/variables/{name}": {
    "path": [
      "repository_id",
      "name",
      "environment_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /search/code": {
    "path": [],
    "query": [
      "q",
      "sort",
      "order",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed.",
      "503": "Service unavailable"
    }
  },
  "GET /search/commits": {
    "path": [],
    "query": [
      "q",
      "sort",
      "order",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /search/issues": {
    "path": [],
    "query": [
      "q",
      "sort",
      "order",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed.",
      "503": "Service unavailable"
    }
  },
  "GET /search/labels": {
    "path": [],
    "query": [
      "repository_id",
      "q",
      "sort",
      "order",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /search/repositories": {
    "path": [],
    "query": [
      "q",
      "sort",
      "order",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed.",
      "503": "Service unavailable"
    }
  },
  "GET /search/topics": {
    "path": [],
    "query": [
      "q",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /search/users": {
    "path": [],
    "query": [
      "q",
      "sort",
      "order",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed.",
      "503": "Service unavailable"
    }
  },
  "GET /user": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "PATCH /user": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /user/blocks": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /user/blocks/{username}": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "If the user is not blocked"
    }
  },
  "PUT /user/blocks/{username}": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /user/blocks/{username}": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /user/codespaces": {
    "path": [],
    "query": [
      "per_page",
      "page",
      "repository_id"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "POST /user/codespaces": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "503": "Service unavailable"
    }
  },
  "GET /user/codespaces/secrets": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /user/codespaces/secrets/public-key": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /user/codespaces/secrets/{secret_name}": {
    "path": [
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "PUT /user/codespaces/secrets/{secret_name}": {
    "path": [
      "secret_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /user/codespaces/secrets/{secret_name}": {
    "path": [
      "secret_name"
    ],
    "query": [],
    "headers": []
  },
  "GET /user/codespaces/secrets/{secret_name}/repositories": {
    "path": [
      "secret_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "PUT /user/codespaces/secrets/{secret_name}/repositories": {
    "path": [
      "secret_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "PUT /user/codespaces/secrets/{secret_name}/repositories/{repository_id}": {
    "path": [
      "secret_name",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "DELETE /user/codespaces/secrets/{secret_name}/repositories/{repository_id}": {
    "path": [
      "secret_name",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "GET /user/codespaces/{codespace_name}": {
    "path": [
      "codespace_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "PATCH /user/codespaces/{codespace_name}": {
    "path": [
      "codespace_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "DELETE /user/codespaces/{codespace_name}": {
    "path": [
      "codespace_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "POST /user/codespaces/{codespace_name}/exports": {
    "path": [
      "codespace_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed.",
      "500": "Internal Error"
    }
  },
  "GET /user/codespaces/{codespace_name}/exports/{export_id}": {
    "path": [
      "codespace_name",
      "export_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /user/codespaces/{codespace_name}/machines": {
    "path": [
      "codespace_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "POST /user/codespaces/{codespace_name}/publish": {
    "path": [
      "codespace_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /user/codespaces/{codespace_name}/start": {
    "path": [
      "codespace_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "401": "Requires authentication",
      "402": "Payment required",
      "403": "Forbidden",
      "404": "Resource not found",
      "409": "Conflict",
      "500": "Internal Error"
    }
  },
  "POST /user/codespaces/{codespace_name}/stop": {
    "path": [
      "codespace_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "500": "Internal Error"
    }
  },
  "PATCH /user/email/visibility": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /user/emails": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /user/emails": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /user/emails": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /user/followers": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "GET /user/following": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "GET /user/following/{username}": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "if the person is not followed by the authenticated user"
    }
  },
  "PUT /user/following/{username}": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "DELETE /user/following/{username}": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /user/gpg_keys": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /user/gpg_keys": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /user/gpg_keys/{gpg_key_id}": {
    "path": [
      "gpg_key_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "DELETE /user/gpg_keys/{gpg_key_id}": {
    "path": [
      "gpg_key_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /user/installations": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "GET /user/installations/{installation_id}/repositories": {
    "path": [
      "installation_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "PUT /user/installations/{installation_id}/repositories/{repository_id}": {
    "path": [
      "installation_id",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "DELETE /user/installations/{installation_id}/repositories/{repository_id}": {
    "path": [
      "installation_id",
      "repository_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /user/interaction-limits": {
    "path": [],
    "query": [],
    "headers": []
  },
  "PUT /user/interaction-limits": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "DELETE /user/interaction-limits": {
    "path": [],
    "query": [],
    "headers": []
  },
  "GET /user/issues": {
    "path": [],
    "query": [
      "filter",
      "state",
      "labels",
      "sort",
      "direction",
      "since",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /user/keys": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /user/keys": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /user/keys/{key_id}": {
    "path": [
      "key_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "DELETE /user/keys/{key_id}": {
    "path": [
      "key_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /user/marketplace_purchases": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "404": "Resource not found"
    }
  },
  "GET /user/marketplace_purchases/stubbed": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication"
    }
  },
  "GET /user/memberships/orgs": {
    "path": [],
    "query": [
      "state",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /user/memberships/orgs/{org}": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "PATCH /user/memberships/orgs/{org}": {
    "path": [
      "org"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /user/migrations": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "POST /user/migrations": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /user/migrations/{migration_id}": {
    "path": [
      "migration_id"
    ],
    "query": [
      "exclude"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /user/migrations/{migration_id}/archive": {
    "path": [
      "migration_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "DELETE /user/migrations/{migration_id}/archive": {
    "path": [
      "migration_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock": {
    "path": [
      "migration_id",
      "repo_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /user/migrations/{migration_id}/repositories": {
    "path": [
      "migration_id"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /user/orgs": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "GET /user/packages": {
    "path": [],
    "query": [
      "package_type",
      "visibility"
    ],
    "headers": []
  },
  "GET /user/packages/{package_type}/{package_name}": {
    "path": [
      "package_type",
      "package_name"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /user/packages/{package_type}/{package_name}": {
    "path": [
      "package_type",
      "package_name"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /user/packages/{package_type}/{package_name}/restore": {
    "path": [
      "package_type",
      "package_name"
    ],
    "query": [
      "token"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /user/packages/{package_type}/{package_name}/versions": {
    "path": [
      "package_type",
      "package_name"
    ],
    "query": [
      "page",
      "per_page",
      "state"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}": {
    "path": [
      "package_type",
      "package_name",
      "package_version_id"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}": {
    "path": [
      "package_type",
      "package_name",
      "package_version_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore": {
    "path": [
      "package_type",
      "package_name",
      "package_version_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /user/projects": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /user/public_emails": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /user/repos": {
    "path": [],
    "query": [
      "visibility",
      "affiliation",
      "type",
      "sort",
      "direction",
      "per_page",
      "page",
      "since",
      "before"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "POST /user/repos": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "400": "Bad Request",
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /user/repository_invitations": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "PATCH /user/repository_invitations/{invitation_id}": {
    "path": [
      "invitation_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "409": "Conflict"
    }
  },
  "DELETE /user/repository_invitations/{invitation_id}": {
    "path": [
      "invitation_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found",
      "409": "Conflict"
    }
  },
  "GET /user/ssh_signing_keys": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /user/ssh_signing_keys": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /user/ssh_signing_keys/{ssh_signing_key_id}": {
    "path": [
      "ssh_signing_key_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "DELETE /user/ssh_signing_keys/{ssh_signing_key_id}": {
    "path": [
      "ssh_signing_key_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /user/starred": {
    "path": [],
    "query": [
      "sort",
      "direction",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "GET /user/starred/{owner}/{repo}": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Not Found if this repository is not starred by you"
    }
  },
  "PUT /user/starred/{owner}/{repo}": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "DELETE /user/starred/{owner}/{repo}": {
    "path": [
      "owner",
      "repo"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /user/subscriptions": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "GET /user/teams": {
    "path": [],
    "query": [
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /users": {
    "path": [],
    "query": [
      "since",
      "per_page"
    ],
    "headers": []
  },
  "GET /users/{username}": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /users/{username}/events": {
    "path": [
      "username"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/events/orgs/{org}": {
    "path": [
      "username",
      "org"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/events/public": {
    "path": [
      "username"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/followers": {
    "path": [
      "username"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/following": {
    "path": [
      "username"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/following/{target_user}": {
    "path": [
      "username",
      "target_user"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "404": "if the user does not follow the target user"
    }
  },
  "GET /users/{username}/gists": {
    "path": [
      "username"
    ],
    "query": [
      "since",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /users/{username}/gpg_keys": {
    "path": [
      "username"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/hovercard": {
    "path": [
      "username"
    ],
    "query": [
      "subject_type",
      "subject_id"
    ],
    "headers": [],
    "errors": {
      "404": "Resource not found",
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /users/{username}/installation": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{username}/keys": {
    "path": [
      "username"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/orgs": {
    "path": [
      "username"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/packages": {
    "path": [
      "username"
    ],
    "query": [
      "package_type",
      "visibility"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden"
    }
  },
  "GET /users/{username}/packages/{package_type}/{package_name}": {
    "path": [
      "package_type",
      "package_name",
      "username"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{username}/packages/{package_type}/{package_name}": {
    "path": [
      "package_type",
      "package_name",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /users/{username}/packages/{package_type}/{package_name}/restore": {
    "path": [
      "package_type",
      "package_name",
      "username"
    ],
    "query": [
      "token"
    ],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /users/{username}/packages/{package_type}/{package_name}/versions": {
    "path": [
      "package_type",
      "package_name",
      "username"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}": {
    "path": [
      "package_type",
      "package_name",
      "package_version_id",
      "username"
    ],
    "query": [],
    "headers": []
  },
  "DELETE /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}": {
    "path": [
      "package_type",
      "package_name",
      "username",
      "package_version_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "POST /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore": {
    "path": [
      "package_type",
      "package_name",
      "username",
      "package_version_id"
    ],
    "query": [],
    "headers": [],
    "errors": {
      "401": "Requires authentication",
      "403": "Forbidden",
      "404": "Resource not found"
    }
  },
  "GET /users/{username}/projects": {
    "path": [
      "username"
    ],
    "query": [
      "state",
      "per_page",
      "page"
    ],
    "headers": [],
    "errors": {
      "422": "Validation failed, or the endpoint has been spammed."
    }
  },
  "GET /users/{username}/received_events": {
    "path": [
      "username"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/received_events/public": {
    "path": [
      "username"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/repos": {
    "path": [
      "username"
    ],
    "query": [
      "type",
      "sort",
      "direction",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/settings/billing/actions": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{username}/settings/billing/packages": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{username}/settings/billing/shared-storage": {
    "path": [
      "username"
    ],
    "query": [],
    "headers": []
  },
  "GET /users/{username}/ssh_signing_keys": {
    "path": [
      "username"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/starred": {
    "path": [
      "username"
    ],
    "query": [
      "sort",
      "direction",
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /users/{username}/subscriptions": {
    "path": [
      "username"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "headers": []
  },
  "GET /versions": {
    "path": [],
    "query": [],
    "headers": [],
    "errors": {
      "404": "Resource not found"
    }
  },
  "GET /zen": {
    "path": [],
    "query": [],
    "headers": []
  }
}

export class GithubService {
  private baseUrl: string
  private oauth: OAuth2Client

  constructor(secrets: TypedSecretService, variables: TypedVariablesService) {
    this.baseUrl = variables.get('GITHUB_BASE_URL') as string
    this.oauth = new OAuth2Client(
      GITHUB_OAUTH2_CONFIG,
      'GITHUB_APP_CREDENTIALS',
      secrets
    )
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

    const response = await this.oauth.request(url.toString(), {
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
        default: throw new Error(`GitHub API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
