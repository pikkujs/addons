import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AffiliateCreateInput = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().optional(),
})

export const AffiliateCreateOutput = z.record(z.string(), z.unknown())

export const affiliateCreate = pikkuSessionlessFunc({
  description: "Create an affiliate",
  input: AffiliateCreateInput,
  output: AffiliateCreateOutput,
  func: async ({ tapfiliate }, data) => {
    return tapfiliate.call("POST", "/affiliates/", data) as any
  },
})
