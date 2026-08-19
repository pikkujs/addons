import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowSessionInput = z.object({
  session_id: z.number().int().describe("The ID of the session. Example: 14"),
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const ShowSessionOutput = z.object({
  session: z.array(z.object({
    authenticated_at: z.string().nullable().optional().describe("When the session was created"),
    id: z.number().int().describe("Automatically assigned when the session is created"),
    last_seen_at: z.string().nullable().optional().describe("The last approximate time this session was seen. This does not update on every request."),
    url: z.string().nullable().optional().describe("The API URL of this session"),
    user_id: z.number().int().nullable().optional().describe("The id of the user"),
  })).optional(),
})

export const showSession = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins, Agents, End users",
  input: ShowSessionInput,
  output: ShowSessionOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/sessions/{session_id}", data) as any
  },
})
