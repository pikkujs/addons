// Filter sharing — This resource represents options for sharing [filters](#api-group-Filters). Use it to get share scopes as well as add and remove share scopes from filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const SetDefaultShareScopeInput = z.object({
  scope: z.enum(["GLOBAL", "AUTHENTICATED", "PRIVATE"]).describe("The scope of the default sharing for new filters and dashboards:\n\n *  `AUTHENTICATED` Shared with all logged-in users.\n *  `GLOBAL` Shared with all logged-in users. This shows as `AUTHENTICATED` in the response.\n *  `PRIVATE` Not shared with any users."),
})

export const SetDefaultShareScopeOutput = z.object({
  scope: z.enum(["GLOBAL", "AUTHENTICATED", "PRIVATE"]).describe("The scope of the default sharing for new filters and dashboards:\n\n *  `AUTHENTICATED` Shared with all logged-in users.\n *  `GLOBAL` Shared with all logged-in users. This shows as `AUTHENTICATED` in the response.\n *  `PRIVATE` Not shared with any users."),
}).describe("Details of the scope of the default sharing for new filters and dashboards.")

export const setDefaultShareScope = pikkuSessionlessFunc({
  description: "Sets the default sharing for new filters and dashboards for a user.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: SetDefaultShareScopeInput,
  output: SetDefaultShareScopeOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/filter/defaultShareScope", data) as any
  },
})
