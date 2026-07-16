import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProgramAffiliateApproveInput = z.object({
  programId: z.string(),
  affiliateId: z.string(),
})

export const ProgramAffiliateApproveOutput = z.record(z.string(), z.unknown())

export const programAffiliateApprove = pikkuSessionlessFunc({
  description: "Approve an affiliate for a program",
  input: ProgramAffiliateApproveInput,
  output: ProgramAffiliateApproveOutput,
  func: async ({ tapfiliate }, data) => {
    return tapfiliate.call("PUT", "/programs/{programId}/affiliates/{affiliateId}/approved/", data) as any
  },
})
