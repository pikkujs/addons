import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CompanyGetAllInput = z.object({
  limit: z.number().int().optional(),
  offset: z.number().int().optional(),
})

export const CompanyGetAllOutput = z.record(z.string(), z.unknown())

export const companyGetAll = pikkuSessionlessFunc({
  description: "List companies",
  input: CompanyGetAllInput,
  output: CompanyGetAllOutput,
  func: async ({ keap }, data) => {
    return keap.call("GET", "/companies", data) as any
  },
})
