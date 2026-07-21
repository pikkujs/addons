import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PutTagsTicketInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const PutTagsTicketOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const putTagsTicket = pikkuSessionlessFunc({
  description: "You can also add tags to multiple tickets with the [Update Many\nTickets](/api-reference/ticketing/tickets/tickets/#update-many-tickets) endpoint.\n\n#### Safe Update\n\nIf the same ticket is updated by multiple API requests at\nthe same time, some tags could be lost because of ticket\nupdate collisions. Include `updated_stamp` and `safe_update`\nproperties in the request body to make a safe update.\n\nFor `updated_stamp`, retrieve and specify the ticket's\nlatest `updated_at` timestamp. The tag update only occurs\nif the `updated_stamp` timestamp matches the ticket's\nactual `updated_at` timestamp at the time of the request.\nIf the timestamps don't match (in other words, if the\nticket was updated since you retrieved the ticket's\nlast `updated_at` timestamp), the request returns a\n409 Conflict error.\n\n#### Example\n\n```js\n{\n  \"tags\": [\"customer\"],\n  \"updated_stamp\":\"2019-09-12T21:45:16Z\",\n  \"safe_update\":\"true\"\n}\n```\n\nFor details, see [Protecting against ticket update collisions](/api-reference/ticketing/tickets/tickets/#protecting-against-ticket-update-collisions).\n\n#### Allowed For\n\n* Agents",
  input: PutTagsTicketInput,
  output: PutTagsTicketOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/tickets/{ticket_id}/tags", data) as any
  },
})
