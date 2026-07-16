import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyContactRemoveInput = z.object({
  companyId: z.string(),
  contactId: z.string(),
})

export const CompanyContactRemoveOutput = z.record(z.string(), z.unknown())

export const companyContactRemove = pikkuSessionlessFunc({
  description: "Remove a contact from a company",
  input: CompanyContactRemoveInput,
  output: CompanyContactRemoveOutput,
  func: async ({ mautic }, data) => {
    return mautic.call("POST", "/companies/{companyId}/contact/{contactId}/remove", data) as any
  },
})
