// preferences — Endpoints for saving and modifying user preferences.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetUsersPreferenceInput = z.object({
  user_id: z.string().describe("User GUID"),
  category: z.string().describe("The category of a group of preferences"),
})

export const GetUsersPreferenceOutput = z.array(z.object({
  user_id: z.string().optional().describe("The ID of the user that owns this preference"),
  category: z.string().optional(),
  name: z.string().optional(),
  value: z.string().optional(),
}))

export const getUsersPreference = pikkuSessionlessFunc({
  description: "Lists the current user's stored preferences in the given category.\n##### Permissions\nMust be logged in as the user being updated or have the `edit_other_users` permission.",
  input: GetUsersPreferenceInput,
  output: GetUsersPreferenceOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/preferences/{category}", data) as any
  },
})
