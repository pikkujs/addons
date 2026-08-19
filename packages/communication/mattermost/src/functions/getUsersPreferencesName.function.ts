// preferences — Endpoints for saving and modifying user preferences.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetUsersPreferencesNameInput = z.object({
  user_id: z.string().describe("User GUID"),
  category: z.string().describe("The category of a group of preferences"),
  preference_name: z.string().describe("The name of the preference"),
})

export const GetUsersPreferencesNameOutput = z.object({
  user_id: z.string().optional().describe("The ID of the user that owns this preference"),
  category: z.string().optional(),
  name: z.string().optional(),
  value: z.string().optional(),
})

export const getUsersPreferencesName = pikkuSessionlessFunc({
  description: "Gets a single preference for the current user with the given category and name.\n##### Permissions\nMust be logged in as the user being updated or have the `edit_other_users` permission.",
  input: GetUsersPreferencesNameInput,
  output: GetUsersPreferencesNameOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/preferences/{category}/name/{preference_name}", data) as any
  },
})
