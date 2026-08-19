import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CheckHostMappingValidityForExistingBrandInput = z.object({
  brand_id: z.number().int().describe("The ID of the brand. Example: 360002783572"),
})

export const CheckHostMappingValidityForExistingBrandOutput = z.object({
  cname: z.string().optional().describe("The canonical name record for a host mapping"),
  expected_cnames: z.array(z.string()).optional().describe("Array of expected CNAME records for host mapping(s) of a given brand"),
  is_valid: z.boolean().optional().describe("Whether a host mapping is valid or not for a given brand"),
  reason: z.string().optional().describe("Reason why a host mapping is valid or not"),
})

export const checkHostMappingValidityForExistingBrand = pikkuSessionlessFunc({
  description: "Returns a JSON object determining whether a host mapping is valid for the given brand.\n\n#### Allowed for\n- Admins",
  input: CheckHostMappingValidityForExistingBrandInput,
  output: CheckHostMappingValidityForExistingBrandOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/brands/{brand_id}/check_host_mapping", data) as any
  },
})
