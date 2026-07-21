// oidc — Endpoints to manage GitHub OIDC configuration using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const OidcUpdateOidcCustomSubTemplateForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  include_claim_keys: z.array(z.string()).describe("Array of unique strings. Each claim key can only contain alphanumeric characters and underscores."),
})

export const OidcUpdateOidcCustomSubTemplateForOrgOutput = z.record(z.string(), z.unknown()).describe("An object without any properties.")

export const oidcUpdateOidcCustomSubTemplateForOrg = pikkuSessionlessFunc({
  description: "Creates or updates the customization template for an OpenID Connect (OIDC) subject claim.\nYou must authenticate using an access token with the `write:org` scope to use this endpoint.\nGitHub Apps must have the `admin:org` permission to use this endpoint.",
  input: OidcUpdateOidcCustomSubTemplateForOrgInput,
  output: OidcUpdateOidcCustomSubTemplateForOrgOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/actions/oidc/customization/sub", data) as any
  },
})
