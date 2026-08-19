import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProgramAffiliateGetInput = z.object({
  programId: z.string(),
  affiliateId: z.string(),
})

export const ProgramAffiliateGetOutput = z.record(z.string(), z.unknown())

export const programAffiliateGet = pikkuSessionlessFunc({
  description: "Get an affiliate in a program",
  input: ProgramAffiliateGetInput,
  output: ProgramAffiliateGetOutput,
  func: async ({ tapfiliate }, data) => {
    return tapfiliate.call("GET", "/programs/{programId}/affiliates/{affiliateId}/", data) as any
  },
})
