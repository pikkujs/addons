// status — Endpoints for getting and updating user statuses.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const CreateUsersStatusIdsInput = z.object({
  body: z.array(z.string()),
})

export const CreateUsersStatusIdsOutput = z.array(z.object({
  user_id: z.string().optional(),
  status: z.string().optional(),
  manual: z.boolean().optional(),
  last_activity_at: z.number().int().optional(),
}))

export const createUsersStatusIds = pikkuSessionlessFunc({
  description: "Get a list of user statuses by id from the server.\n##### Permissions\nMust be authenticated.",
  input: CreateUsersStatusIdsInput,
  output: CreateUsersStatusIdsOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/status/ids", data) as any
  },
})
