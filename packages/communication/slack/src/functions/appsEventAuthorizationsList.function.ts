import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppsEventAuthorizationsListInput = z.object({
  event_context: z.string(),
  cursor: z.string().optional(),
  limit: z.number().int().optional(),
  token: z.string().describe("Authentication token. Requires scope: `authorizations:read`"),
})

export const AppsEventAuthorizationsListOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const appsEventAuthorizationsList = pikkuSessionlessFunc({
  description: "Get a list of authorizations for the given event context. Each authorization represents an app installation that the event is visible to.",
  input: AppsEventAuthorizationsListInput,
  output: AppsEventAuthorizationsListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/apps.event.authorizations.list", data) as any
  },
})
