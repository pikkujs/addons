// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListUsersAutocompleteInput = z.object({
  team_id: z.string().optional().describe("Team ID"),
  channel_id: z.string().optional().describe("Channel ID"),
  name: z.string().describe("Username, nickname first name or last name"),
  limit: z.number().int().optional().default(100).describe("The maximum number of users to return in each subresult\n\n__Available as of server version 5.6. Defaults to `100` if not provided or on an earlier server version.__\n"),
})

export const ListUsersAutocompleteOutput = z.object({
  users: z.array(z.object({
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
  })).optional().describe("A list of users that are the main result of the query"),
  out_of_channel: z.array(z.object({
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
  })).optional().describe("A special case list of users returned when autocompleting in a specific channel. Omitted when empty or not relevant"),
})

export const listUsersAutocomplete = pikkuSessionlessFunc({
  description: "Get a list of users for the purpose of autocompleting based on the provided search term. Specify a combination of `team_id` and `channel_id` to filter results further.\n##### Permissions\nRequires an active session and `view_team` and `read_channel` on any teams or channels used to filter the results further.",
  input: ListUsersAutocompleteInput,
  output: ListUsersAutocompleteOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/autocomplete", data) as any
  },
})
