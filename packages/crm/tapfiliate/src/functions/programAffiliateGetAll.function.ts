import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProgramAffiliateGetAllInput = z.object({
  programId: z.string(),
  page: z.number().int().optional(),
})

export const ProgramAffiliateGetAllOutput = z.array(z.record(z.string(), z.unknown()))

export const programAffiliateGetAll = pikkuSessionlessFunc({
  description: "List affiliates in a program",
  input: ProgramAffiliateGetAllInput,
  output: ProgramAffiliateGetAllOutput,
  func: async ({ tapfiliate }, data) => {
    return tapfiliate.call("GET", "/programs/{programId}/affiliates/", data) as any
  },
})
