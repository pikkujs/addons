import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProgramAffiliateAddInput = z.object({
  programId: z.string(),
  affiliateId: z.string().optional(),
})

export const ProgramAffiliateAddOutput = z.record(z.string(), z.unknown())

export const programAffiliateAdd = pikkuSessionlessFunc({
  description: "Add an affiliate to a program",
  input: ProgramAffiliateAddInput,
  output: ProgramAffiliateAddOutput,
  func: async ({ tapfiliate }, data) => {
    return tapfiliate.call("POST", "/programs/{programId}/affiliates/", data) as any
  },
})
