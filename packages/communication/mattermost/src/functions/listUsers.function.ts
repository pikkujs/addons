// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListUsersInput = z.object({
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of users per page. There is a maximum limit of 200 users per page."),
  in_team: z.string().optional().describe("The ID of the team to get users for."),
  not_in_team: z.string().optional().describe("The ID of the team to exclude users for. Must not be used with \"in_team\" query parameter."),
  in_channel: z.string().optional().describe("The ID of the channel to get users for."),
  not_in_channel: z.string().optional().describe("The ID of the channel to exclude users for. Must be used with \"in_channel\" query parameter."),
  group_constrained: z.boolean().optional().describe("When used with `not_in_channel` or `not_in_team`, returns only the users that are allowed to join the channel or team based on its group constrains."),
  without_team: z.boolean().optional().describe("Whether or not to list users that are not on any team. This option takes precendence over `in_team`, `in_channel`, and `not_in_channel`."),
  sort: z.string().optional().describe("Sort is only available in conjunction with certain options below. The paging parameter is also always available.\n\n##### `in_team`\nCan be \"\", \"last_activity_at\" or \"create_at\".\nWhen left blank, sorting is done by username.\n__Minimum server version__: 4.0\n##### `in_channel`\nCan be \"\", \"status\".\nWhen left blank, sorting is done by username. `status` will sort by User's current status (Online, Away, DND, Offline), then by Username.\n__Minimum server version__: 4.7\n"),
})

export const ListUsersOutput = z.array(z.object({
  id: z.string().optional(),
  create_at: z.number().int().optional().describe("The time in milliseconds a user was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a user was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a user was deleted"),
  username: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  nickname: z.string().optional(),
  email: z.string().optional(),
  email_verified: z.boolean().optional(),
  auth_service: z.string().optional(),
  roles: z.string().optional(),
  locale: z.string().optional(),
  notify_props: z.object({
    email: z.string().optional().describe("Set to \"true\" to enable email notifications, \"false\" to disable. Defaults to \"true\"."),
    push: z.string().optional().describe("Set to \"all\" to receive push notifications for all activity, \"mention\" for mentions and direct messages only, and \"none\" to disable. Defaults to \"mention\"."),
    desktop: z.string().optional().describe("Set to \"all\" to receive desktop notifications for all activity, \"mention\" for mentions and direct messages only, and \"none\" to disable. Defaults to \"all\"."),
    desktop_sound: z.string().optional().describe("Set to \"true\" to enable sound on desktop notifications, \"false\" to disable. Defaults to \"true\"."),
    mention_keys: z.string().optional().describe("A comma-separated list of words to count as mentions. Defaults to username and @username."),
    channel: z.string().optional().describe("Set to \"true\" to enable channel-wide notifications (@channel, @all, etc.), \"false\" to disable. Defaults to \"true\"."),
    first_name: z.string().optional().describe("Set to \"true\" to enable mentions for first name. Defaults to \"true\" if a first name is set, \"false\" otherwise."),
  }).optional().describe("Field only visible to self and admins"),
  props: z.record(z.string(), z.unknown()).optional(),
  last_password_update: z.number().int().optional(),
  last_picture_update: z.number().int().optional(),
  failed_attempts: z.number().int().optional(),
  mfa_active: z.boolean().optional(),
  timezone: z.object({
    useAutomaticTimezone: z.string().optional().describe("Set to \"true\" to use the browser/system timezone, \"false\" to set manually. Defaults to \"true\"."),
    manualTimezone: z.string().optional().describe("Value when setting manually the timezone, i.e. \"Europe/Berlin\"."),
    automaticTimezone: z.string().optional().describe("This value is set automatically when the \"useAutomaticTimezone\" is set to \"true\"."),
  }).optional(),
  terms_of_service_id: z.string().optional().describe("ID of accepted terms of service, if any. This field is not present if empty."),
  terms_of_service_create_at: z.number().int().optional().describe("The time in milliseconds the user accepted the terms of service"),
}))

export const listUsers = pikkuSessionlessFunc({
  description: "Get a page of a list of users. Based on query string parameters, select users from a team, channel, or select users not in a specific channel.\n\nSince server version 4.0, some basic sorting is available using the `sort` query parameter. Sorting is currently only supported when selecting users on a team.\n##### Permissions\nRequires an active session and (if specified) membership to the channel or team being selected from.",
  input: ListUsersInput,
  output: ListUsersOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users", data) as any
  },
})
