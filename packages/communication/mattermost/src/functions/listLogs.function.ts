// system — General endpoints for interating with the server, such as configuration and logging.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError } from '@pikku/core/errors'

export const ListLogsInput = z.object({
  page: z.string().optional().default("0").describe("The page to select."),
  logs_per_page: z.string().optional().default("10000").describe("The number of logs per page. There is a maximum limit of 10000 logs per page."),
})

export const ListLogsOutput = z.array(z.string())

export const listLogs = pikkuSessionlessFunc({
  description: "Get a page of server logs, selected with `page` and `logs_per_page` query parameters.\n##### Permissions\nMust have `manage_system` permission.",
  input: ListLogsInput,
  output: ListLogsOutput,
  errors: [ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/logs", data) as any
  },
})
