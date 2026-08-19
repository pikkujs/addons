import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowLocaleByIdInput = z.object({
  locale_id: z.string().describe("The ID or the [BCP-47 code](https://en.wikipedia.org/wiki/IETF_language_tag) of the locale. Examples: es-419, en-us, pr-br\n. Example: \"es-419\""),
})

export const ShowLocaleByIdOutput = z.object({
  locale: z.object({
    created_at: z.string().datetime().optional().describe("The ISO 8601 formatted date-time the locale was created"),
    id: z.number().int().optional().describe("The unique ID of the locale"),
    locale: z.string().optional().describe("The name of the locale"),
    name: z.string().optional().describe("The name of the language"),
    updated_at: z.string().datetime().optional().describe("The ISO 8601 formatted date-time when the locale was last updated"),
    url: z.string().optional().describe("The URL of the locale record"),
  }).optional(),
})

export const showLocaleById = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Anyone",
  input: ShowLocaleByIdInput,
  output: ShowLocaleByIdOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/locales/{locale_id}", data) as any
  },
})
