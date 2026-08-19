// groups — Endpoints related to LDAP groups.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListChannelsGroupsInput = z.object({
  channel_id: z.string().describe("Channel GUID"),
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of groups per page."),
})

export const ListChannelsGroupsOutput = z.array(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  display_name: z.string().optional(),
  description: z.string().optional(),
  source: z.string().optional(),
  remote_id: z.string().optional(),
  create_at: z.number().int().optional(),
  update_at: z.number().int().optional(),
  delete_at: z.number().int().optional(),
  has_syncables: z.boolean().optional(),
}))

export const listChannelsGroups = pikkuSessionlessFunc({
  description: "Retrieve the list of groups associated with a given channel.\n\n##### Permissions\nMust have `manage_system` permission.\n\n__Minimum server version__: 5.11",
  input: ListChannelsGroupsInput,
  output: ListChannelsGroupsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/channels/{channel_id}/groups", data) as any
  },
})
