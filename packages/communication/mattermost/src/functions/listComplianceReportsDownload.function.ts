// compliance — Endpoints for creating, getting and downloading compliance reports.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListComplianceReportsDownloadInput = z.object({
  report_id: z.string().describe("Compliance report GUID"),
})

export const listComplianceReportsDownload = pikkuSessionlessFunc({
  description: "Download the full contents of a report as a file.\n##### Permissions\nMust have `manage_system` permission.",
  input: ListComplianceReportsDownloadInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/compliance/reports/{report_id}/download", data)
  },
})
