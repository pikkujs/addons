// compliance — Endpoints for creating, getting and downloading compliance reports.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListComplianceReportsInput = z.object({
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of reports per page."),
})

export const ListComplianceReportsOutput = z.array(z.object({
  id: z.string().optional(),
  create_at: z.number().int().optional(),
  user_id: z.string().optional(),
  status: z.string().optional(),
  count: z.number().int().optional(),
  desc: z.string().optional(),
  type: z.string().optional(),
  start_at: z.number().int().optional(),
  end_at: z.number().int().optional(),
  keywords: z.string().optional(),
  emails: z.string().optional(),
}))

export const listComplianceReports = pikkuSessionlessFunc({
  description: "Get a list of compliance reports previously created by page, selected with `page` and `per_page` query parameters.\n##### Permissions\nMust have `manage_system` permission.",
  input: ListComplianceReportsInput,
  output: ListComplianceReportsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/compliance/reports", data) as any
  },
})
