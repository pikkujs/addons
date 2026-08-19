// preferences — Endpoints for saving and modifying user preferences.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListUsersPreferencesInput = z.object({
  user_id: z.string().describe("User GUID"),
})

export const ListUsersPreferencesOutput = z.array(z.object({
  user_id: z.string().optional().describe("The ID of the user that owns this preference"),
  category: z.string().optional(),
  name: z.string().optional(),
  value: z.string().optional(),
}))

export const listUsersPreferences = pikkuSessionlessFunc({
  description: "Get a list of the user's preferences.\n##### Permissions\nMust be logged in as the user being updated or have the `edit_other_users` permission.",
  input: ListUsersPreferencesInput,
  output: ListUsersPreferencesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/preferences", data) as any
  },
})
