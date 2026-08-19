import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BulkRestoreDeletedTicketsInput = z.object({
  ids: z.string().describe("Comma-separated list of ticket ids. Example: \"35436,35437\""),
})

export const BulkRestoreDeletedTicketsOutput = z.string().describe("Empty response")

export const bulkRestoreDeletedTickets = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: BulkRestoreDeletedTicketsInput,
  output: BulkRestoreDeletedTicketsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/deleted_tickets/restore_many", data) as any
  },
})
