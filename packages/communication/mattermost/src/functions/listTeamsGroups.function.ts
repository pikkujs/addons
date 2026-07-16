// groups — Endpoints related to LDAP groups.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListTeamsGroupsInput = z.object({
  team_id: z.string().describe("Team GUID"),
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of groups per page."),
})

export const ListTeamsGroupsOutput = z.array(z.object({
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

export const listTeamsGroups = pikkuSessionlessFunc({
  description: "Retrieve the list of groups associated with a given team.\n\n##### Permissions\nMust have `manage_system` permission.\n\n__Minimum server version__: 5.11",
  input: ListTeamsGroupsInput,
  output: ListTeamsGroupsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/teams/{team_id}/groups", data) as any
  },
})
