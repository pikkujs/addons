// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UsersListInput = z.object({
  since: z.number().int().optional().describe("A user ID. Only return users with an ID greater than this ID."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
})

export const UsersListOutput = z.array(z.object({
  avatar_url: z.string().url(),
  email: z.string().nullable().optional(),
  events_url: z.string(),
  followers_url: z.string().url(),
  following_url: z.string(),
  gists_url: z.string(),
  gravatar_id: z.string().nullable(),
  html_url: z.string().url(),
  id: z.number().int(),
  login: z.string(),
  name: z.string().nullable().optional(),
  node_id: z.string(),
  organizations_url: z.string().url(),
  received_events_url: z.string().url(),
  repos_url: z.string().url(),
  site_admin: z.boolean(),
  starred_at: z.string().optional(),
  starred_url: z.string(),
  subscriptions_url: z.string().url(),
  type: z.string(),
  url: z.string().url(),
}))

export const usersList = pikkuSessionlessFunc({
  description: "Lists all users, in the order that they signed up on GitHub. This list includes personal user accounts and organization accounts.\n\nNote: Pagination is powered exclusively by the `since` parameter. Use the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header) to get the URL for the next page of users.",
  input: UsersListInput,
  output: UsersListOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users", data) as any
  },
})
