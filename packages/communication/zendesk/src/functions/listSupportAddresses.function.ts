import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListSupportAddressesInput = z.object({
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
  include: z.string().optional().describe("A comma-separated list of sideloads to include in the response.\n"),
})

export const ListSupportAddressesOutput = z.object({
  recipient_addresses: z.array(z.object({
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
  })).optional(),
})

export const listSupportAddresses = pikkuSessionlessFunc({
  description: "Lists all the support addresses for the account.\n\n#### Pagination\n\n- Cursor pagination (recommended)\n- Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Admins\n* Agents",
  input: ListSupportAddressesInput,
  output: ListSupportAddressesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/recipient_addresses", data) as any
  },
})
