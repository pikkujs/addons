import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IncrementalSkilBasedRoutingAttributeValuesExportOutput = z.object({
  attribute_values: z.array(z.object({
    attribute_id: z.string().optional().describe("Id of the associated attribute"),
    id: z.string().optional().describe("Automatically assigned when an attribute value is created"),
    name: z.string().optional().describe("The name of the attribute value"),
    time: z.string().datetime().optional().describe("The time the attribute value was created, updated, or deleted"),
    type: z.string().optional().describe("One of \"create\", \"update\", or \"delete\""),
  })).optional().describe("Routing attribute values"),
  attributes: z.array(z.object({
    id: z.string().optional().describe("Automatically assigned when an attribute is created"),
    name: z.string().optional().describe("The name of the attribute"),
    time: z.string().datetime().optional().describe("The time the attribute was created, updated, or deleted"),
    type: z.string().optional().describe("One of \"create\", \"update\", or \"delete\""),
  })).optional().describe("Routing attributes"),
  count: z.number().int().optional().describe("The number of results returned for the current request"),
  end_time: z.number().int().optional().describe("The most recent resource creation time present in this result set in Unix epoch time"),
  instance_values: z.array(z.object({
    attribute_value_id: z.string().optional().describe("Id of the associated attribute value"),
    id: z.string().optional().describe("Automatically assigned when an instance value is created"),
    instance_id: z.string().optional().describe("Id of the associated agent or ticket"),
    time: z.string().datetime().optional().describe("The time the instance value was created or deleted"),
    type: z.string().optional().describe("One of \"associate_agent\", \"unassociate_agent\", \"associate_ticket\", or \"unassociate_ticket\""),
  })).optional().describe("Routing instance values"),
  next_page: z.string().optional().describe("The URL that should be called to get the next set of results"),
})

export const incrementalSkilBasedRoutingAttributeValuesExport = pikkuSessionlessFunc({
  description: "Returns a stream of changes that occurred on routing attribute values.\n\n#### Allowed For\n\n* Admins\n\n#### Parameters\n\nOptional\n\n| Name   | Type   | Comment\n| ------ | ------ | -------\n| cursor | string | The `cursor` parameter is a non-human-readable argument you can use to move forward or backward in time. The cursor is a read-only URL parameter that's only available in API responses. See [Pagination](#pagination).",
  output: IncrementalSkilBasedRoutingAttributeValuesExportOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/incremental/routing/attribute_values") as any
  },
})
