import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListAccountAttributesInput = z.object({
  include: z.string().optional().describe("Sideloads to include in the response. Accepts a comma-separated list of values.\nSee [Sideloading](/api-reference/ticketing/ticket-management/skill_based_routing/#sideloads).\n. Example: \"attribute_values\""),
})

export const ListAccountAttributesOutput = z.object({
  attributes: z.array(z.object({
    created_at: z.string().datetime().optional().describe("When this record was created"),
    id: z.string().optional().describe("Automatically assigned when an attribute is created"),
    name: z.string().describe("The name of the attribute"),
    updated_at: z.string().datetime().optional().describe("When this record was last updated"),
    url: z.string().optional().describe("URL of the attribute"),
  })).optional(),
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
})

export const listAccountAttributes = pikkuSessionlessFunc({
  description: "Returns a list of attributes for the account.\n\n#### Sideloads\n\nThe following sideloads are supported:\n\n| Name             | Will sideload\n| ---------------- | -------------\n| attribute_values | The attribute values available on the account\n\n#### Allowed For\n\n* Agents and admins",
  input: ListAccountAttributesInput,
  output: ListAccountAttributesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/routing/attributes", data) as any
  },
})
