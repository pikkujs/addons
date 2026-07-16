import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListOrganizationMembershipsInput = z.object({
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
  include: z.string().optional().describe("Sideloads to include in the response. Accepts a comma-separated list of values.\nValid values: `users`, `organizations`.\n. Example: \"organizations\""),
})

export const ListOrganizationMembershipsOutput = z.object({
  organization_memberships: z.array(z.object({
    created_at: z.string().datetime().optional().describe("When this record was created"),
    default: z.boolean().nullable().describe("Denotes whether this is the default organization membership for the user. If false, returns `null`"),
    id: z.number().int().optional().describe("Automatically assigned when the membership is created"),
    organization_id: z.number().int().describe("The ID of the organization associated with this user, in this membership"),
    organization_name: z.string().optional().describe("The name of the organization associated with this user, in this membership"),
    updated_at: z.string().datetime().optional().describe("When this record last got updated"),
    url: z.string().optional().describe("The API url of this membership"),
    user_id: z.number().int().describe("The ID of the user for whom this membership belongs"),
    view_tickets: z.boolean().optional().describe("Denotes whether the user can or cannot have access to all organization's tickets."),
  })).optional(),
})

export const listOrganizationMemberships = pikkuSessionlessFunc({
  description: "Returns a list of organization memberships for the account, user or organization in question.\n\n**Note**: When returning organization memberships for a user, organization memberships are sorted with the default organization first, and then by organization name.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n- Agents\n- End users",
  input: ListOrganizationMembershipsInput,
  output: ListOrganizationMembershipsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organization_memberships", data) as any
  },
})
