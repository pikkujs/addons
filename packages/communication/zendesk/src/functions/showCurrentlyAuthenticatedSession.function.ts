import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowCurrentlyAuthenticatedSessionOutput = z.object({
  session: z.array(z.object({
    authenticated_at: z.string().nullable().optional().describe("When the session was created"),
    id: z.number().int().describe("Automatically assigned when the session is created"),
    last_seen_at: z.string().nullable().optional().describe("The last approximate time this session was seen. This does not update on every request."),
    url: z.string().nullable().optional().describe("The API URL of this session"),
    user_id: z.number().int().nullable().optional().describe("The id of the user"),
  })).optional(),
})

export const showCurrentlyAuthenticatedSession = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins, Agents, End users",
  output: ShowCurrentlyAuthenticatedSessionOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/users/me/session") as any
  },
})
