import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CompanyGetAllInput = z.object({
  page_number: z.number().optional(),
  page_size: z.number().optional(),
})

export const CompanyGetAllOutput = z.record(z.string(), z.unknown())

export const companyGetAll = pikkuSessionlessFunc({
  description: "List companies",
  input: CompanyGetAllInput,
  output: CompanyGetAllOutput,
  func: async ({ copper }, data) => {
    return copper.call("POST", "/companies/search", data) as any
  },
})
