// status — Endpoints for getting and updating user statuses.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const ListUsersStatusInput = z.object({
  user_id: z.string().describe("User ID"),
})

export const ListUsersStatusOutput = z.object({
  user_id: z.string().optional(),
  status: z.string().optional(),
  manual: z.boolean().optional(),
  last_activity_at: z.number().int().optional(),
})

export const listUsersStatus = pikkuSessionlessFunc({
  description: "Get user status by id from the server.\n##### Permissions\nMust be authenticated.",
  input: ListUsersStatusInput,
  output: ListUsersStatusOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/status", data) as any
  },
})
