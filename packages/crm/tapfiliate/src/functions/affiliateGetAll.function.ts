import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AffiliateGetAllInput = z.object({
  page: z.number().int().optional(),
})

export const AffiliateGetAllOutput = z.array(z.record(z.string(), z.unknown()))

export const affiliateGetAll = pikkuSessionlessFunc({
  description: "List affiliates",
  input: AffiliateGetAllInput,
  output: AffiliateGetAllOutput,
  func: async ({ tapfiliate }, data) => {
    return tapfiliate.call("GET", "/affiliates/", data) as any
  },
})
