// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CreateTeamsSearchInput = z.object({
  term: z.string().describe("The search term to match against the name or display name of teams"),
})

export const CreateTeamsSearchOutput = z.array(z.object({
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

export const createTeamsSearch = pikkuSessionlessFunc({
  description: "Search teams based on search term provided in the request body.\n##### Permissions\nLogged in user only shows open teams\nLogged in user with \"manage_system\" permission shows all teams",
  input: CreateTeamsSearchInput,
  output: CreateTeamsSearchOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/teams/search", data) as any
  },
})
