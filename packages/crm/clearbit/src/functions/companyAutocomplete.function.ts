import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CompanyAutocompleteInput = z.object({
  query: z.string(),
})

export const CompanyAutocompleteOutput = z.record(z.string(), z.unknown())

export const companyAutocomplete = pikkuSessionlessFunc({
  description: "Autocomplete a company",
  input: CompanyAutocompleteInput,
  output: CompanyAutocompleteOutput,
  func: async ({ clearbit }, data) => {
    return clearbit.call("GET", "/v1/companies/suggest", data) as any
  },
})
