import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AffiliateDeleteInput = z.object({
  affiliateId: z.string(),
})

export const AffiliateDeleteOutput = z.record(z.string(), z.unknown())

export const affiliateDelete = pikkuSessionlessFunc({
  description: "Delete an affiliate",
  input: AffiliateDeleteInput,
  output: AffiliateDeleteOutput,
  func: async ({ tapfiliate }, data) => {
    return tapfiliate.call("DELETE", "/affiliates/{affiliateId}/", data) as any
  },
})
