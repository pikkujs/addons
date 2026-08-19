import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DomainSearchInput = z.object({
  domain: z.string(),
  type: z.string().optional(),
  seniority: z.string().optional(),
  department: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
})

export const DomainSearchOutput = z.record(z.string(), z.unknown())

export const domainSearch = pikkuSessionlessFunc({
  description: "Get every email address found on the internet using a given domain name",
  input: DomainSearchInput,
  output: DomainSearchOutput,
  func: async ({ hunter }, data) => {
    return hunter.call("GET", "/domain-search", data) as any
  },
})
