// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const UsersListFollowersForAuthenticatedUserInput = z.object({
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const UsersListFollowersForAuthenticatedUserOutput = z.array(z.object({
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

export const usersListFollowersForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Lists the people following the authenticated user.",
  input: UsersListFollowersForAuthenticatedUserInput,
  output: UsersListFollowersForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/followers", data) as any
  },
})
