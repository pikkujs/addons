import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CountAuditsForTicketInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const CountAuditsForTicketOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countAuditsForTicket = pikkuSessionlessFunc({
  description: "Returns an approximate count of audits for a specified ticket. If the count exceeds 100,000, the count will return a cached result.  This cached result will update every 24 hours.\n\nThe `count[refreshed_at]` property is a timestamp that indicates when the count was last updated.\n\n**Note**: If the total number of audits for a ticket exceeds 100,000, this endpoint returns a count of 100,000 with a `count[refreshed_at]` value of null. This value is cached for 24 hours, during which any requests returns the same count and timestamp. After 24 hours, the endpoint temporarily shows the same count again before providing an updated total.\n\n#### Allowed for\n\n* Agents",
  input: CountAuditsForTicketInput,
  output: CountAuditsForTicketOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/audits/count", data) as any
  },
})
