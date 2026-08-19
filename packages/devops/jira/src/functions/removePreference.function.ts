// Myself — This resource represents information about the current user, such as basic details, group membership, application roles, preferences, and locale. Use it to get, create, update, and delete (restore default) values of the user's preferences and locale.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const RemovePreferenceInput = z.object({
  key: z.string().describe("The key of the preference."),
})

export const removePreference = pikkuSessionlessFunc({
  description: "Deletes a preference of the user, which restores the default value of system defined settings.\n\nNote that these keys are deprecated:\n\n *  *jira.user.locale* The locale of the user. By default, not set. The user takes the instance locale.\n *  *jira.user.timezone* The time zone of the user. By default, not set. The user takes the instance timezone.\n\nUse [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: RemovePreferenceInput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/mypreferences", data)
  },
})
