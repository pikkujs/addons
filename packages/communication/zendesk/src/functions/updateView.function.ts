import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateViewInput = z.object({
  view_id: z.number().int().describe("The ID of the view. Example: 25"),
})

export const UpdateViewOutput = z.object({
  columns: z.array(z.record(z.string(), z.unknown())).optional(),
  groups: z.array(z.record(z.string(), z.unknown())).optional(),
  rows: z.array(z.record(z.string(), z.unknown())).optional(),
  view: z.object({
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
  }).optional(),
})

export const updateView = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents\n\n#### JSON Format\n\n The PUT request takes one property, a `view` object that lists the values to update. All properties are optional.\n\n**Note**: Updating a condition updates the containing array, clearing the other conditions. Include all your conditions when updating any condition.\n\n| Name        | Description\n| ----------- | -----------\n| title       | The title of the view\n| all         | An array of one or more conditions. A ticket must meet all the conditions to be included in the view. The PUT request replaces all existing conditions. See [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference)\n| any         | An array of one or more conditions. A ticket must meet any of them to be included in the view. At least one `all` condition must be defined with the `any` conditions. The PUT request replaces all existing `any` conditions. See [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference)\n| active      | Allowed values are true or false. Determines if the view is displayed or not\n| output      | An object that specifies the columns to display. Example: `\"output\": {\"columns\": [\"status\", \"description,\" \"priority\"]}`. See [View columns](#view-columns)\n| restriction | An object that describes who can access the view. To give all agents access to the view, omit this property\n\nThe `restriction` object has the following properties.\n\n| Name | Comment\n| ---- | -------\n| type | Allowed values are \"Group\" or \"User\"\n| id   | The numeric ID of a single group or user\n| ids  | The numeric IDs of a single or more groups. Recommended for \"Group\" `type`\n\nIf `type` is \"Group\", the `ids` property is the preferred method of specifying the group id or ids.\n\nYou can also update how items are sorted and grouped. See [View sorting](#view-sorting) in Create View.\n\n#### Example Request Body\n\n```js\n{\n  \"view\": {\n    \"title\": \"Code red tickets\",\n    \"restriction\": {\n      \"type\": \"Group\",\n      \"ids\": [10052, 10057, 10062, 10002]\n    },\n    \"all\": [\n      {\n        \"field\": \"priority\",\n        \"operator\": \"is\",\n        \"value\": \"urgent\"\n      }\n    ],\n    \"output\": {\n      \"columns\": [\"status\", \"requester\", \"assignee\", \"updated\"]\n    }\n  }\n}\n```",
  input: UpdateViewInput,
  output: UpdateViewOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/views/{view_id}", data) as any
  },
})
