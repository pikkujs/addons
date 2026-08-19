// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetUsersEmailInput = z.object({
  email: z.string().describe("User Email"),
})

export const GetUsersEmailOutput = z.object({
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
})

export const getUsersEmail = pikkuSessionlessFunc({
  description: "Get a user object by providing a user email. Sensitive information will be sanitized out.\n##### Permissions\nRequires an active session and for the current session to be able to view another user's email based on the server's privacy settings.",
  input: GetUsersEmailInput,
  output: GetUsersEmailOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/email/{email}", data) as any
  },
})
