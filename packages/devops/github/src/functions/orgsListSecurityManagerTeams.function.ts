// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrgsListSecurityManagerTeamsInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const OrgsListSecurityManagerTeamsOutput = z.array(z.object({
  description: z.string().nullable().describe("Description of the team"),
  html_url: z.string().url(),
  id: z.number().int().describe("Unique identifier of the team"),
  ldap_dn: z.string().optional().describe("Distinguished Name (DN) that team maps to within LDAP environment"),
  members_url: z.string(),
  name: z.string().describe("Name of the team"),
  node_id: z.string(),
  permission: z.string().describe("Permission that the team will have for its repositories"),
  privacy: z.string().optional().describe("The level of privacy this team should have"),
  repositories_url: z.string().url(),
  slug: z.string(),
  url: z.string().url().describe("URL for the team"),
}))

export const orgsListSecurityManagerTeams = pikkuSessionlessFunc({
  description: "Lists teams that are security managers for an organization. For more information, see \"[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization).\"\n\nTo use this endpoint, you must be an administrator or security manager for the organization, and you must use an access token with the `read:org` scope.\n\nGitHub Apps must have the `administration` organization read permission to use this endpoint.",
  input: OrgsListSecurityManagerTeamsInput,
  output: OrgsListSecurityManagerTeamsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/security-managers", data) as any
  },
})
