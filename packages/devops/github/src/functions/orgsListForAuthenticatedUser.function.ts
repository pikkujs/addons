// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const OrgsListForAuthenticatedUserInput = z.object({
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const OrgsListForAuthenticatedUserOutput = z.array(z.object({
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

export const orgsListForAuthenticatedUser = pikkuSessionlessFunc({
  description: "List organizations for the authenticated user.\n\n**OAuth scope requirements**\n\nThis only lists organizations that your authorization allows you to operate on in some way (e.g., you can list teams with `read:org` scope, you can publicize your organization membership with `user` scope, etc.). Therefore, this API requires at least `user` or `read:org` scope. OAuth requests with insufficient scope receive a `403 Forbidden` response.",
  input: OrgsListForAuthenticatedUserInput,
  output: OrgsListForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/orgs", data) as any
  },
})
