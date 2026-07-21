import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProgramAffiliateDisapproveInput = z.object({
  programId: z.string(),
  affiliateId: z.string(),
})

export const ProgramAffiliateDisapproveOutput = z.record(z.string(), z.unknown())

export const programAffiliateDisapprove = pikkuSessionlessFunc({
  description: "Disapprove an affiliate for a program",
  input: ProgramAffiliateDisapproveInput,
  output: ProgramAffiliateDisapproveOutput,
  func: async ({ tapfiliate }, data) => {
    return tapfiliate.call("DELETE", "/programs/{programId}/affiliates/{affiliateId}/approved/", data) as any
  },
})
