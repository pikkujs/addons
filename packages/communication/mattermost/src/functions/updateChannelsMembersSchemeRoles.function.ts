// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateChannelsMembersSchemeRolesInput = z.object({
  channel_id: z.string().describe("Channel GUID"),
  user_id: z.string().describe("User GUID"),
  scheme_admin: z.boolean(),
  scheme_user: z.boolean(),
})

export const UpdateChannelsMembersSchemeRolesOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateChannelsMembersSchemeRoles = pikkuSessionlessFunc({
  description: "Update a channel member's scheme_admin/scheme_user properties. Typically this should either be `scheme_admin=false, scheme_user=true` for ordinary channel member, or `scheme_admin=true, scheme_user=true` for a channel admin.\n__Minimum server version__: 5.0\n##### Permissions\nMust be authenticated and have the `manage_channel_roles` permission.",
  input: UpdateChannelsMembersSchemeRolesInput,
  output: UpdateChannelsMembersSchemeRolesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/channels/{channel_id}/members/{user_id}/schemeRoles", data) as any
  },
})
