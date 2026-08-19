import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AffiliateGetInput = z.object({
  affiliateId: z.string(),
})

export const AffiliateGetOutput = z.record(z.string(), z.unknown())

export const affiliateGet = pikkuSessionlessFunc({
  description: "Get an affiliate",
  input: AffiliateGetInput,
  output: AffiliateGetOutput,
  func: async ({ tapfiliate }, data) => {
    return tapfiliate.call("GET", "/affiliates/{affiliateId}/", data) as any
  },
})
