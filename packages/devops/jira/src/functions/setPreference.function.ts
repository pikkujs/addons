// Myself — This resource represents information about the current user, such as basic details, group membership, application roles, preferences, and locale. Use it to get, create, update, and delete (restore default) values of the user's preferences and locale.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const SetPreferenceInput = z.object({
  key: z.string().describe("The key of the preference. The maximum length is 255 characters."),
  body: z.string(),
})

export const SetPreferenceOutput = z.unknown()

export const setPreference = pikkuSessionlessFunc({
  description: "Creates a preference for the user or updates a preference's value by sending a plain text string. For example, `false`. An arbitrary preference can be created with the value containing up to 255 characters. In addition, the following keys define system preferences that can be set or created:\n\n *  *user.notifications.mimetype* The mime type used in notifications sent to the user. Defaults to `html`.\n *  *user.notify.own.changes* Whether the user gets notified of their own changes. Defaults to `false`.\n *  *user.default.share.private* Whether new [ filters](https://confluence.atlassian.com/x/eQiiLQ) are set to private. Defaults to `true`.\n *  *user.keyboard.shortcuts.disabled* Whether keyboard shortcuts are disabled. Defaults to `false`.\n *  *user.autowatch.disabled* Whether the user automatically watches issues they create or add a comment to. By default, not set: the user takes the instance autowatch setting.\n\nNote that these keys are deprecated:\n\n *  *jira.user.locale* The locale of the user. By default, not set. The user takes the instance locale.\n *  *jira.user.timezone* The time zone of the user. By default, not set. The user takes the instance timezone.\n\nUse [ Update a user profile](https://developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: SetPreferenceInput,
  output: SetPreferenceOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/mypreferences", data) as any
  },
})
