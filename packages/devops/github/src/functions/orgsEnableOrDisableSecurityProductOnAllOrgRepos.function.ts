// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const OrgsEnableOrDisableSecurityProductOnAllOrgReposInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  security_product: z.enum(["dependency_graph", "dependabot_alerts", "dependabot_security_updates", "advanced_security", "secret_scanning", "secret_scanning_push_protection"]).describe("The security feature to enable or disable."),
  enablement: z.enum(["enable_all", "disable_all"]).describe("The action to take.\n\n`enable_all` means to enable the specified security feature for all repositories in the organization.\n`disable_all` means to disable the specified security feature for all repositories in the organization."),
})

export const orgsEnableOrDisableSecurityProductOnAllOrgRepos = pikkuSessionlessFunc({
  description: "Enables or disables the specified security feature for all repositories in an organization.\n\nTo use this endpoint, you must be an organization owner or be member of a team with the security manager role.\nA token with the 'write:org' scope is also required.\n\nGitHub Apps must have the `organization_administration:write` permission to use this endpoint.\n\nFor more information, see \"[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization).\"",
  input: OrgsEnableOrDisableSecurityProductOnAllOrgReposInput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/orgs/{org}/{security_product}/{enablement}", data)
  },
})
