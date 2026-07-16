import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListLocalesForAgentOutput = z.object({
  locales: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The ISO 8601 formatted date-time the locale was created"),
    id: z.number().int().optional().describe("The unique ID of the locale"),
    locale: z.string().optional().describe("The name of the locale"),
    name: z.string().optional().describe("The name of the language"),
    updated_at: z.string().datetime().optional().describe("The ISO 8601 formatted date-time when the locale was last updated"),
    url: z.string().optional().describe("The URL of the locale record"),
  })).optional(),
})

export const listLocalesForAgent = pikkuSessionlessFunc({
  description: "Lists the translation locales that have been localized for agents on a specific account.\n\n#### Allowed For\n\n* Anyone",
  output: ListLocalesForAgentOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/locales/agent") as any
  },
})
