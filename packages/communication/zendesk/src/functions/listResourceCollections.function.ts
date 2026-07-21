import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListResourceCollectionsInput = z.object({
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
})

export const ListResourceCollectionsOutput = z.object({
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  resource_collections: z.array(z.object({
    created_at: z.string().datetime().optional().describe("When the resource collection was created"),
    id: z.number().int().optional().describe("id for the resource collection. Automatically assigned upon creation"),
    resources: z.array(z.object({
      deleted: z.boolean().optional(),
      identifier: z.string().optional(),
      resource_id: z.number().int().optional(),
      type: z.string().optional(),
    })).optional().describe("Array of resource metadata objects. See [Resource objects](#resource-objects)"),
    updated_at: z.string().datetime().optional().describe("Last time the resource collection was updated"),
  })).optional(),
})

export const listResourceCollections = pikkuSessionlessFunc({
  description: "Lists resource collections for the account.\n\n#### Allowed for\n\n* Admins",
  input: ListResourceCollectionsInput,
  output: ListResourceCollectionsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/resource_collections", data) as any
  },
})
