// compliance — Endpoints for creating, getting and downloading compliance reports.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateComplianceReportsOutput = z.object({
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

export const createComplianceReports = pikkuSessionlessFunc({
  description: "Create and save a compliance report.\n##### Permissions\nMust have `manage_system` permission.",
  output: CreateComplianceReportsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/compliance/reports") as any
  },
})
