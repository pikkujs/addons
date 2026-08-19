import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListUserSessionsInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const ListUserSessionsOutput = z.object({
  sessions: z.array(z.object({
    authenticated_at: z.string().nullable().optional().describe("When the session was created"),
    id: z.number().int().describe("Automatically assigned when the session is created"),
    last_seen_at: z.string().nullable().optional().describe("The last approximate time this session was seen. This does not update on every request."),
    url: z.string().nullable().optional().describe("The API URL of this session"),
    user_id: z.number().int().nullable().optional().describe("The id of the user"),
  })).optional(),
})

export const listUserSessions = pikkuSessionlessFunc({
  description: "Lists all sessions for a specific user.\n\n#### Pagination\n\n- Cursor pagination (recommended)\n- Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\n#### Allowed For\n\n* Admins, Agents, End users",
  input: ListUserSessionsInput,
  output: ListUserSessionsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/sessions", data) as any
  },
})
