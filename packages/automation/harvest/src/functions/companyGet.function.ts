import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyGetOutput = z.record(z.string(), z.unknown())

export const companyGet = pikkuSessionlessFunc({
  description: "Get company",
  output: CompanyGetOutput,
  func: async ({ harvest }) => {
    return harvest.call("GET", "/company") as any
  },
})
