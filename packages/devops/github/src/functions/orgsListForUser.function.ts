// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrgsListForUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const OrgsListForUserOutput = z.array(z.object({
  avatar_url: z.string(),
  description: z.string().nullable(),
  events_url: z.string().url(),
  hooks_url: z.string(),
  id: z.number().int(),
  issues_url: z.string(),
  login: z.string(),
  members_url: z.string(),
  node_id: z.string(),
  public_members_url: z.string(),
  repos_url: z.string().url(),
  url: z.string().url(),
}))

export const orgsListForUser = pikkuSessionlessFunc({
  description: "List [public organization memberships](https://docs.github.com/articles/publicizing-or-concealing-organization-membership) for the specified user.\n\nThis method only lists _public_ memberships, regardless of authentication. If you need to fetch all of the organization memberships (public and private) for the authenticated user, use the [List organizations for the authenticated user](https://docs.github.com/rest/reference/orgs#list-organizations-for-the-authenticated-user) API instead.",
  input: OrgsListForUserInput,
  output: OrgsListForUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/orgs", data) as any
  },
})
