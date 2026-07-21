// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, NotFoundError } from '@pikku/core/errors'

export const ActionsGetCustomOidcSubClaimForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ActionsGetCustomOidcSubClaimForRepoOutput = z.object({
  include_claim_keys: z.array(z.string()).optional().describe("Array of unique strings. Each claim key can only contain alphanumeric characters and underscores."),
  use_default: z.boolean().describe("Whether to use the default template or not. If `true`, the `include_claim_keys` field is ignored."),
}).describe("Actions OIDC subject customization for a repository")

export const actionsGetCustomOidcSubClaimForRepo = pikkuSessionlessFunc({
  description: "Gets the customization template for an OpenID Connect (OIDC) subject claim.\nYou must authenticate using an access token with the `repo` scope to use this\nendpoint. GitHub Apps must have the `organization_administration:read` permission to use this endpoint.",
  input: ActionsGetCustomOidcSubClaimForRepoInput,
  output: ActionsGetCustomOidcSubClaimForRepoOutput,
  errors: [BadRequestError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/oidc/customization/sub", data) as any
  },
})
