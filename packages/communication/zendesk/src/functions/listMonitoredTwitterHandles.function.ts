import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListMonitoredTwitterHandlesOutput = z.object({
  monitored_twitter_handles: z.array(z.object({
    allow_reply: z.boolean().optional().describe("If replies are allowed for this handle"),
    avatar_url: z.string().optional().describe("The profile image url of the handle"),
    brand_id: z.number().int().optional().describe("What brand the handle is associated with"),
    can_reply: z.boolean().optional().describe("If replies are allowed for this handle"),
    created_at: z.string().datetime().optional().describe("The time the handle was created"),
    id: z.number().int().describe("Automatically assigned upon creation"),
    name: z.string().optional().describe("The profile name of the handle"),
    screen_name: z.string().describe("The X handle"),
    twitter_user_id: z.number().int().describe("The country's code"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the handle"),
  })).optional(),
})

export const listMonitoredTwitterHandles = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins\n* Agents",
  output: ListMonitoredTwitterHandlesOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/channels/twitter/monitored_twitter_handles") as any
  },
})
