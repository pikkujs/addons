// system — General endpoints for interating with the server, such as configuration and logging.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError } from '@pikku/core/errors'

export const ListAuditsInput = z.object({
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of audits per page."),
})

export const ListAuditsOutput = z.array(z.object({
  id: z.string().optional(),
  create_at: z.number().int().optional().describe("The time in milliseconds a audit was created"),
  user_id: z.string().optional(),
  action: z.string().optional(),
  extra_info: z.string().optional(),
  ip_address: z.string().optional(),
  session_id: z.string().optional(),
}))

export const listAudits = pikkuSessionlessFunc({
  description: "Get a page of audits for all users on the system, selected with `page` and `per_page` query parameters.\n##### Permissions\nMust have `manage_system` permission.",
  input: ListAuditsInput,
  output: ListAuditsOutput,
  errors: [ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/audits", data) as any
  },
})
