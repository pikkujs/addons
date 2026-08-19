import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DetectBestLocaleOutput = z.object({
  locale: z.object({
    created_at: z.string().datetime().optional().describe("The ISO 8601 formatted date-time the locale was created"),
    id: z.number().int().optional().describe("The unique ID of the locale"),
    locale: z.string().optional().describe("The name of the locale"),
    name: z.string().optional().describe("The name of the language"),
    updated_at: z.string().datetime().optional().describe("The ISO 8601 formatted date-time when the locale was last updated"),
    url: z.string().optional().describe("The URL of the locale record"),
  }).optional(),
})

export const detectBestLocale = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Anyone",
  output: DetectBestLocaleOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/locales/detect_best_locale") as any
  },
})
