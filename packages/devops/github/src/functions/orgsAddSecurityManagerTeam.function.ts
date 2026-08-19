// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ConflictError } from '@pikku/core/errors'

export const OrgsAddSecurityManagerTeamInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
})

export const orgsAddSecurityManagerTeam = pikkuSessionlessFunc({
  description: "Adds a team as a security manager for an organization. For more information, see \"[Managing security for an organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization) for an organization.\"\n\nTo use this endpoint, you must be an administrator for the organization, and you must use an access token with the `write:org` scope.\n\nGitHub Apps must have the `administration` organization read-write permission to use this endpoint.",
  input: OrgsAddSecurityManagerTeamInput,
  errors: [ConflictError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/security-managers/teams/{team_slug}", data)
  },
})
