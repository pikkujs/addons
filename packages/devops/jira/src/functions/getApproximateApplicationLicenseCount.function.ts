// License metrics — This resource represents license metrics. Use it to get available metrics for Jira licences.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetApproximateApplicationLicenseCountInput = z.object({
  applicationKey: z.string(),
})

export const GetApproximateApplicationLicenseCountOutput = z.object({
  key: z.string().optional().describe("The key of the license metric."),
  value: z.string().optional().describe("The value for the license metric."),
}).describe("A license metric")

export const getApproximateApplicationLicenseCount = pikkuSessionlessFunc({
  description: "Returns the total approximate user account for a specific `jira licence application key`. Please note this information is cached with a 7-day lifecycle and could be stale at the time of call.\n\n#### Application Key ####\n\nAn application key represents a specific version of Jira. See \\{@link ApplicationKey\\} for details\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetApproximateApplicationLicenseCountInput,
  output: GetApproximateApplicationLicenseCountOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/license/approximateLicenseCount/product/{applicationKey}", data) as any
  },
})
