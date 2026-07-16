import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateManyViewsOutput = z.object({
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  views: z.array(z.object({
    active: z.boolean().optional().describe("Whether the view is active"),
    conditions: z.record(z.string(), z.unknown()).optional().describe("Describes how the view is constructed. See [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference)"),
    created_at: z.string().datetime().optional().describe("The time the view was created"),
    default: z.boolean().optional().describe("If true, the view is a default view"),
    description: z.string().optional().describe("The description of the view"),
    execution: z.record(z.string(), z.unknown()).optional().describe("Describes how the view should be executed. See [Execution](#execution)"),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    position: z.number().int().optional().describe("The position of the view"),
    restriction: z.record(z.string(), z.unknown()).optional().describe("Who may access this view. Is null when everyone in the account can access it"),
    title: z.string().optional().describe("The title of the view"),
    updated_at: z.string().datetime().optional().describe("The time the view was last updated"),
  })).optional(),
})

export const updateManyViews = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents\n\n#### Request Parameters\n\nThe PUT request expects a `views` object that lists the views to update.\n\nEach view may have the following properties:\n\n| Name     | Mandatory | Description\n| -------- | --------- | -----------\n| id       | yes       | The ID of the view to update\n| position | no        | The new position of the view\n| active   | no        | The active status of the view (true or false)\n\n#### Example Request Body\n\n```js\n{\n  \"views\": [\n    {\"id\": 25, \"position\": 3},\n    {\"id\": 23, \"position\": 5},\n    {\"id\": 27, \"position\": 9},\n    {\"id\": 22, \"position\": 7}\n  ]\n}\n```",
  output: UpdateManyViewsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("PUT", "/api/v2/views/update_many") as any
  },
})
