// preferences — Endpoints for saving and modifying user preferences.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateUsersPreferencesDeleteInput = z.object({
  user_id: z.string().describe("User GUID"),
  body: z.array(z.object({
  user_id: z.string().optional().describe("The ID of the user that owns this preference"),
  category: z.string().optional(),
  name: z.string().optional(),
  value: z.string().optional(),
})),
})

export const CreateUsersPreferencesDeleteOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createUsersPreferencesDelete = pikkuSessionlessFunc({
  description: "Delete a list of the user's preferences.\n##### Permissions\nMust be logged in as the user being updated or have the `edit_other_users` permission.",
  input: CreateUsersPreferencesDeleteInput,
  output: CreateUsersPreferencesDeleteOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/{user_id}/preferences/delete", data) as any
  },
})
