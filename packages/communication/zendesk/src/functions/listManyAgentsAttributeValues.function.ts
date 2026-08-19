import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const ListManyAgentsAttributeValuesInput = z.object({
  "filter[agent_ids]": z.string().describe("A comma-separated list of agent ids. Example: \"224,225\""),
  "page[before]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.before_cursor` value from a previous request.\n"),
  "page[after]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.after_cursor` value from a previous request.\n"),
  "page[size]": z.number().int().min(1).max(100).optional().describe("The number of items to return per page"),
})

export const ListManyAgentsAttributeValuesOutput = z.object({
  count: z.number().int().optional().describe("The number of instance values returned"),
  instance_values: z.array(z.object({
    agent_id: z.number().int().optional().describe("Id of the associated agent"),
    agent_skill_priority: z.enum(["NORMAL", "HIGH"]).optional().describe("The priority of the agent skill for this attribute value"),
    attribute_id: z.string().optional().describe("Id of the associated attribute"),
    attribute_value_id: z.string().optional().describe("Id of the associated attribute value"),
    created_at: z.string().datetime().optional().describe("The time of creation of the instance value"),
    id: z.string().optional().describe("Automatically assigned when an instance value is created"),
    name: z.string().optional().describe("Name of the associated attribute value"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the instance value"),
    url: z.string().optional().describe("The URL of the associated attribute value"),
  })).optional(),
  next_page: z.string().nullable().optional().describe("The URL for the next page of results"),
  previous_page: z.string().nullable().optional().describe("The URL for the previous page of results"),
})

export const listManyAgentsAttributeValues = pikkuSessionlessFunc({
  description: "Accepts a comma-separated list of up to 100 agent ids and returns attribute values for each agent in the list.\n\n#### Allowed For\n* Admins\n* [Agents in custom role with permission to manage skills](https://support.zendesk.com/hc/en-us/articles/4408882153882)\n\n#### Pagination\n* [Cursor pagination](/api-reference/introduction/pagination/#cursor-pagination) only.\nNote: `page[before]` and `page[after]` can't be used together in the same request.",
  input: ListManyAgentsAttributeValuesInput,
  output: ListManyAgentsAttributeValuesOutput,
  errors: [BadRequestError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/routing/agents/instance_values", data) as any
  },
})
