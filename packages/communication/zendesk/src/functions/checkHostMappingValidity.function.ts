import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CheckHostMappingValidityInput = z.object({
  host_mapping: z.string().describe("The hostmapping to a brand, if any (only admins view this key). Example: \"brand1.com\""),
  subdomain: z.string().describe("Subdomain for a given Zendesk account address. Example: \"Brand1\""),
})

export const CheckHostMappingValidityOutput = z.object({
  cname: z.string().optional().describe("The canonical name record for a host mapping"),
  expected_cnames: z.array(z.string()).optional().describe("Array of expected CNAME records for host mapping(s) of a given brand"),
  is_valid: z.boolean().optional().describe("Whether a host mapping is valid or not for a given brand"),
  reason: z.string().optional().describe("Reason why a host mapping is valid or not"),
})

export const checkHostMappingValidity = pikkuSessionlessFunc({
  description: "Returns a JSON object determining whether a host mapping is valid for a given subdomain.\n\n#### Allowed for\n\n* Admins",
  input: CheckHostMappingValidityInput,
  output: CheckHostMappingValidityOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/brands/check_host_mapping", data) as any
  },
})
