import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomVerificationEmailGetAllInput = z.object({
  limit: z.number().optional(),
})

export const CustomVerificationEmailGetAllOutput = z.record(z.string(), z.unknown())

export const customVerificationEmailGetAll = pikkuSessionlessFunc({
  description: "Get many custom verification email templates",
  input: CustomVerificationEmailGetAllInput,
  output: CustomVerificationEmailGetAllOutput,
  func: async ({ awsSes }, data) => {
    return awsSes.call("GET", "/customVerificationEmail/list", data) as any
  },
})
