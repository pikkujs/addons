// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ActionsSetCustomOidcSubClaimForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  include_claim_keys: z.array(z.string()).optional().describe("Array of unique strings. Each claim key can only contain alphanumeric characters and underscores."),
  use_default: z.boolean().describe("Whether to use the default template or not. If `true`, the `include_claim_keys` field is ignored."),
})

export const ActionsSetCustomOidcSubClaimForRepoOutput = z.record(z.string(), z.unknown()).describe("An object without any properties.")

export const actionsSetCustomOidcSubClaimForRepo = pikkuSessionlessFunc({
  description: "Sets the customization template and `opt-in` or `opt-out` flag for an OpenID Connect (OIDC) subject claim for a repository.\nYou must authenticate using an access token with the `repo` scope to use this\nendpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.",
  input: ActionsSetCustomOidcSubClaimForRepoInput,
  output: ActionsSetCustomOidcSubClaimForRepoOutput,
  errors: [BadRequestError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/actions/oidc/customization/sub", data) as any
  },
})
