// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const OrgsListInvitationTeamsInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  invitation_id: z.number().int().describe("The unique identifier of the invitation."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const OrgsListInvitationTeamsOutput = z.array(z.object({
  description: z.string().nullable(),
  html_url: z.string().url(),
  id: z.number().int(),
  members_url: z.string(),
  name: z.string(),
  node_id: z.string(),
  parent: z.object({
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
  }).nullable().describe("Groups of organization members that gives permissions on specified repositories."),
  permission: z.string(),
  permissions: z.object({
    admin: z.boolean(),
    maintain: z.boolean(),
    pull: z.boolean(),
    push: z.boolean(),
    triage: z.boolean(),
  }).optional(),
  privacy: z.string().optional(),
  repositories_url: z.string().url(),
  slug: z.string(),
  url: z.string().url(),
}))

export const orgsListInvitationTeams = pikkuSessionlessFunc({
  description: "List all teams associated with an invitation. In order to see invitations in an organization, the authenticated user must be an organization owner.",
  input: OrgsListInvitationTeamsInput,
  output: OrgsListInvitationTeamsOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/invitations/{invitation_id}/teams", data) as any
  },
})
