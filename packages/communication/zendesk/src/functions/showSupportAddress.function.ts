import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowSupportAddressInput = z.object({
  support_address_id: z.number().int().describe("The ID of the support address. Example: 33"),
})

export const ShowSupportAddressOutput = z.object({
  recipient_address: z.object({
    brand_id: z.number().int().optional().describe("The ID of the [brand](/api-reference/ticketing/account-configuration/brands/)"),
    cname_status: z.enum(["unknown", "verified", "failed"]).optional().describe("Whether all of the required CNAME records are set. Possible values: \"unknown\", \"verified\", \"failed\""),
    created_at: z.string().datetime().optional().describe("When the address was created"),
    default: z.boolean().optional().describe("Whether the address is the account's default support address"),
    dns_results: z.enum(["verified", "failed"]).optional().describe("Verification statuses for the domain and CNAME records. Possible types: \"verified\", \"failed\""),
    domain_verification_code: z.string().optional().describe("Verification string to be added as a TXT record to the domain. Possible types: string or null."),
    domain_verification_status: z.enum(["unknown", "verified", "failed"]).optional().describe("Whether the domain verification record is valid. Possible values: \"unknown\", \"verified\", \"failed\""),
    email: z.string().describe("The email address. You can't change the email address of an existing support address."),
    forwarding_status: z.enum(["unknown", "waiting", "verified", "failed"]).optional().describe("Status of email forwarding. Possible values: \"unknown\", \"waiting\", \"verified\", or \"failed\""),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    name: z.string().optional().describe("The name for the address"),
    spf_status: z.enum(["unknown", "verified", "failed"]).optional().describe("Whether the SPF record is set up correctly. Possible values: \"unknown\", \"verified\", \"failed\""),
    updated_at: z.string().datetime().optional().describe("When the address was updated"),
  }).optional(),
})

export const showSupportAddress = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins\n* Agents",
  input: ShowSupportAddressInput,
  output: ShowSupportAddressOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/recipient_addresses/{support_address_id}", data) as any
  },
})
