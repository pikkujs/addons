import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CompanyContactAddInput = z.object({
  companyId: z.string(),
  contactId: z.string(),
})

export const CompanyContactAddOutput = z.record(z.string(), z.unknown())

export const companyContactAdd = pikkuSessionlessFunc({
  description: "Add a contact to a company",
  input: CompanyContactAddInput,
  output: CompanyContactAddOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("POST", "/companies/{companyId}/contact/{contactId}/add", data) as any
  },
})
