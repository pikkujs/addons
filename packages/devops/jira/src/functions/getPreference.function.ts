// Myself — This resource represents information about the current user, such as basic details, group membership, application roles, preferences, and locale. Use it to get, create, update, and delete (restore default) values of the user's preferences and locale.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetPreferenceInput = z.object({
  key: z.string().describe("The key of the preference."),
})

export const GetPreferenceOutput = z.string()

export const getPreference = pikkuSessionlessFunc({
  description: "Returns the value of a preference of the current user.\n\nNote that these keys are deprecated:\n\n *  *jira.user.locale* The locale of the user. By default this is not set and the user takes the locale of the instance.\n *  *jira.user.timezone* The time zone of the user. By default this is not set and the user takes the timezone of the instance.\n\nUse [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: GetPreferenceInput,
  output: GetPreferenceOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/mypreferences", data) as any
  },
})
