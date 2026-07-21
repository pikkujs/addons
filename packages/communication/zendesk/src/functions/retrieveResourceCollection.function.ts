import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RetrieveResourceCollectionInput = z.object({
  resource_collection_id: z.number().int().describe("The id of the resource collection. Example: 10002"),
})

export const RetrieveResourceCollectionOutput = z.object({
  resource_collection: z.object({
    created_at: z.string().datetime().optional().describe("When the resource collection was created"),
    id: z.number().int().optional().describe("id for the resource collection. Automatically assigned upon creation"),
    resources: z.array(z.object({
      deleted: z.boolean().optional(),
      identifier: z.string().optional(),
      resource_id: z.number().int().optional(),
      type: z.string().optional(),
    })).optional().describe("Array of resource metadata objects. See [Resource objects](#resource-objects)"),
    updated_at: z.string().datetime().optional().describe("Last time the resource collection was updated"),
  }).optional(),
})

export const retrieveResourceCollection = pikkuSessionlessFunc({
  description: "Retrieves details for a specified resource collection.\n\n#### Allowed for\n\n* Admins",
  input: RetrieveResourceCollectionInput,
  output: RetrieveResourceCollectionOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/resource_collections/{resource_collection_id}", data) as any
  },
})
