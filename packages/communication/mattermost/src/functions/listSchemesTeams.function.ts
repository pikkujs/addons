// schemes — Endpoints for creating, getting and updating and deleting schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListSchemesTeamsInput = z.object({
  scheme_id: z.string().describe("Scheme GUID"),
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of teams per page."),
})

export const ListSchemesTeamsOutput = z.array(z.object({
  id: z.string().optional(),
  create_at: z.number().int().optional().describe("The time in milliseconds a team was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a team was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a team was deleted"),
  display_name: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  email: z.string().optional(),
  type: z.string().optional(),
  allowed_domains: z.string().optional(),
  invite_id: z.string().optional(),
  allow_open_invite: z.boolean().optional(),
}))

export const listSchemesTeams = pikkuSessionlessFunc({
  description: "Get a page of teams which use this scheme. The provided Scheme ID should be for a Team-scoped Scheme.\nUse the query parameters to modify the behaviour of this endpoint.\n\n##### Permissions\n`manage_system` permission is required.\n\n__Minimum server version__: 5.0",
  input: ListSchemesTeamsInput,
  output: ListSchemesTeamsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/schemes/{scheme_id}/teams", data) as any
  },
})
