// compliance — Endpoints for creating, getting and downloading compliance reports.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetComplianceReportInput = z.object({
  report_id: z.string().describe("Compliance report GUID"),
})

export const GetComplianceReportOutput = z.object({
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
})

export const getComplianceReport = pikkuSessionlessFunc({
  description: "Get a compliance reports previously created.\n##### Permissions\nMust have `manage_system` permission.",
  input: GetComplianceReportInput,
  output: GetComplianceReportOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/compliance/reports/{report_id}", data) as any
  },
})
