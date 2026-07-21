// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrgsRemoveSecurityManagerTeamInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
})

export const orgsRemoveSecurityManagerTeam = pikkuSessionlessFunc({
  description: "Removes the security manager role from a team for an organization. For more information, see \"[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization) team from an organization.\"\n\nTo use this endpoint, you must be an administrator for the organization, and you must use an access token with the `admin:org` scope.\n\nGitHub Apps must have the `administration` organization read-write permission to use this endpoint.",
  input: OrgsRemoveSecurityManagerTeamInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/security-managers/teams/{team_slug}", data)
  },
})
