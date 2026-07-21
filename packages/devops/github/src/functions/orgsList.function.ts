// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrgsListInput = z.object({
  since: z.number().int().optional().describe("An organization ID. Only return organizations with an ID greater than this ID."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
})

export const OrgsListOutput = z.array(z.object({
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

export const orgsList = pikkuSessionlessFunc({
  description: "Lists all organizations, in the order that they were created on GitHub.\n\n**Note:** Pagination is powered exclusively by the `since` parameter. Use the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header) to get the URL for the next page of organizations.",
  input: OrgsListInput,
  output: OrgsListOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/organizations", data) as any
  },
})
