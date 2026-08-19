// preferences — Endpoints for saving and modifying user preferences.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateUsersPreferencesInput = z.object({
  user_id: z.string().describe("User GUID"),
  body: z.array(z.object({
  user_id: z.string().optional().describe("The ID of the user that owns this preference"),
  category: z.string().optional(),
  name: z.string().optional(),
  value: z.string().optional(),
})),
})

export const UpdateUsersPreferencesOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateUsersPreferences = pikkuSessionlessFunc({
  description: "Save a list of the user's preferences.\n##### Permissions\nMust be logged in as the user being updated or have the `edit_other_users` permission.",
  input: UpdateUsersPreferencesInput,
  output: UpdateUsersPreferencesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/users/{user_id}/preferences", data) as any
  },
})
