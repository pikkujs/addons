import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyGetAllInput = z.object({
  limit: z.number().int().optional(),
  start: z.number().int().optional(),
})

export const CompanyGetAllOutput = z.record(z.string(), z.unknown())

export const companyGetAll = pikkuSessionlessFunc({
  description: "List companies",
  input: CompanyGetAllInput,
  output: CompanyGetAllOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("GET", "/companies", data) as any
  },
})
