// status — Endpoints for getting and updating user statuses.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const UpdateUsersStatusInput = z.object({
  user_id: z.string().describe("User ID"),
  status: z.string().describe("User status, can be `online`, `away`, `offline` and `dnd`"),
})

export const UpdateUsersStatusOutput = z.object({
  user_id: z.string().optional(),
  status: z.string().optional(),
  manual: z.boolean().optional(),
  last_activity_at: z.number().int().optional(),
})

export const updateUsersStatus = pikkuSessionlessFunc({
  description: "Manually set a user's status. When setting a user's status, the status will remain that value until set \"online\" again, which will return the status to being automatically updated based on user activity.\n##### Permissions\nMust have `edit_other_users` permission for the team.",
  input: UpdateUsersStatusInput,
  output: UpdateUsersStatusOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/users/{user_id}/status", data) as any
  },
})
