import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const OpenUsersProfileInAgentBrowserInput = z.object({
  agent_id: z.number().int().describe("ID of an agent"),
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const OpenUsersProfileInAgentBrowserOutput = z.string().describe("empty")

export const openUsersProfileInAgentBrowser = pikkuSessionlessFunc({
  description: "Allows you to instruct an agent's browser to open a user's profile.\n\nWhen the message is successfully delivered to an agent's browser:\n\n```http\nStatus: 200 OK\n```\n\nWhen `agent_id` or `user_id` is invalid:\n\n```http\nStatus: 404 Not Found\n```\n\n#### Allowed For\n* Agents",
  input: OpenUsersProfileInAgentBrowserInput,
  output: OpenUsersProfileInAgentBrowserOutput,
  errors: [NotFoundError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/channels/voice/agents/{agent_id}/users/{user_id}/display", data) as any
  },
})
