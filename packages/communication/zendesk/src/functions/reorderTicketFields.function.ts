import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReorderTicketFieldsOutput = z.string().describe("Empty response")

export const reorderTicketFields = pikkuSessionlessFunc({
  description: "#### Allowed For\n* Admins\n\n#### Request Parameters\n\nYou can pass in the following parameter in the payload:\n\n| Name                | Type   | Comment\n| ------------------- | ------ | --------\n| ticket_field_ids    | array  | An array of ticket field ids. Example: \"[2, 23, 46, 50]\". Not all ticket_field_ids are necessary in the payload; only those provided will be assigned to the first positions. Missing IDs will be assigned incremental positions automatically.",
  output: ReorderTicketFieldsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("PUT", "/api/v2/ticket_fields/reorder") as any
  },
})
