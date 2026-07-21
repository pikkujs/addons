import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListDeletedUsersInput = z.object({
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
})

export const ListDeletedUsersOutput = z.object({
  deleted_users: z.array(z.object({
    active: z.boolean(),
    created_at: z.string(),
    email: z.string(),
    id: z.number().int(),
    locale: z.string(),
    locale_id: z.number().int(),
    name: z.string(),
    organization_id: z.number().int(),
    phone: z.string().nullable(),
    photo: z.record(z.string(), z.unknown()).nullable(),
    role: z.string(),
    separation: z.object({
      brand_id: z.number().int().optional(),
      scope: z.enum(["account", "brand"]).optional(),
    }).nullable().optional().describe("Brand separation information for the deleted user"),
    shared_phone_number: z.string().nullable(),
    time_zone: z.string(),
    updated_at: z.string(),
    url: z.string(),
  })).optional(),
})

export const listDeletedUsers = pikkuSessionlessFunc({
  description: "Returns deleted users, including permanently deleted users.\n\nIf the results contains permanently deleted users, the users' properties\nthat normally contain personal data, such as `email` and `phone`,\nare null. The `name` property is \"Permanently Deleted User\".\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Agents",
  input: ListDeletedUsersInput,
  output: ListDeletedUsersOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/deleted_users", data) as any
  },
})
