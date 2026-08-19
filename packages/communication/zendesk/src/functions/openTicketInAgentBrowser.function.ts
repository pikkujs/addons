import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const OpenTicketInAgentBrowserInput = z.object({
  agent_id: z.number().int().describe("ID of an agent"),
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const OpenTicketInAgentBrowserOutput = z.string().describe("empty")

export const openTicketInAgentBrowser = pikkuSessionlessFunc({
  description: "Allows you to instruct an agent's browser to open a ticket.\n\nWhen the message is successfully delivered to an agent's browser:\n\n```http\nStatus: 200 OK\n```\n\nWhen `agent_id` or `ticket_id` is invalid:\n\n```http\nStatus: 404 Not Found\n```\n\n#### Allowed For\n* Agents",
  input: OpenTicketInAgentBrowserInput,
  output: OpenTicketInAgentBrowserOutput,
  errors: [NotFoundError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/channels/voice/agents/{agent_id}/tickets/{ticket_id}/display", data) as any
  },
})
