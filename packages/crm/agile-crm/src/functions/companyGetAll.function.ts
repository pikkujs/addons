import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyGetAllInput = z.object({
  filterJson: z.string().optional(),
  page_size: z.number().optional(),
})

export const CompanyGetAllOutput = z.record(z.string(), z.unknown())

export const companyGetAll = pikkuSessionlessFunc({
  description: "Get many companies",
  input: CompanyGetAllInput,
  output: CompanyGetAllOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("POST", "/api/filters/filter/company-dynamic-filter", data) as any
  },
})
