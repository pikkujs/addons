import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const VerifySubdomainAvailabilityInput = z.object({
  subdomain: z.string().describe("Specify the name of the subdomain you want to verify. The name can't contain underscores, hyphens, or spaces.\n. Example: \"z3ndesk\""),
})

export const VerifySubdomainAvailabilityOutput = z.object({
  success: z.boolean().optional(),
})

export const verifySubdomainAvailability = pikkuSessionlessFunc({
  description: "Zendesk Support credentials are not required to access this endpoint. You can use any Zendesk Support subdomain.\n\nReturns \"true\" if the subdomain is available.",
  input: VerifySubdomainAvailabilityInput,
  output: VerifySubdomainAvailabilityOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/accounts/available", data) as any
  },
})
