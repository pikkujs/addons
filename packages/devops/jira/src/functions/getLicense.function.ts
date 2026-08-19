// Instance information — This resource represents information about the Jira instance. Use it to get license details.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetLicenseOutput = z.object({
  applications: z.array(z.object({
    id: z.string().describe("The ID of the application."),
    plan: z.enum(["UNLICENSED", "FREE", "PAID"]).describe("The licensing plan."),
  })).describe("The applications under this license."),
}).describe("Details about a license for the Jira instance.")

export const getLicense = pikkuSessionlessFunc({
  description: "Returns licensing information about the Jira instance.\n\n**[Permissions](#permissions) required:** None.",
  output: GetLicenseOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/instance/license") as any
  },
})
