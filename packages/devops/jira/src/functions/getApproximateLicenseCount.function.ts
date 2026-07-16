// License metrics — This resource represents license metrics. Use it to get available metrics for Jira licences.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetApproximateLicenseCountOutput = z.object({
  key: z.string().optional().describe("The key of the license metric."),
  value: z.string().optional().describe("The value for the license metric."),
}).describe("A license metric")

export const getApproximateLicenseCount = pikkuSessionlessFunc({
  description: "Returns the total approximate user account across all jira licenced application keys. Please note this information is cached with a 7-day lifecycle and could be stale at the time of call.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  output: GetApproximateLicenseCountOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/license/approximateLicenseCount") as any
  },
})
