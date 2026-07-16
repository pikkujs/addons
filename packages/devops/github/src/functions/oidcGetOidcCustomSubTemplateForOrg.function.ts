// oidc — Endpoints to manage GitHub OIDC configuration using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OidcGetOidcCustomSubTemplateForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const OidcGetOidcCustomSubTemplateForOrgOutput = z.object({
  include_claim_keys: z.array(z.string()).describe("Array of unique strings. Each claim key can only contain alphanumeric characters and underscores."),
}).describe("Actions OIDC Subject customization")

export const oidcGetOidcCustomSubTemplateForOrg = pikkuSessionlessFunc({
  description: "Gets the customization template for an OpenID Connect (OIDC) subject claim.\nYou must authenticate using an access token with the `read:org` scope to use this endpoint.\nGitHub Apps must have the `organization_administration:write` permission to use this endpoint.",
  input: OidcGetOidcCustomSubTemplateForOrgInput,
  output: OidcGetOidcCustomSubTemplateForOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/actions/oidc/customization/sub", data) as any
  },
})
