import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExtractionScrapeInput = z.object({
  sessionId: z.string(),
  windowId: z.string(),
})

export const ExtractionScrapeOutput = z.record(z.string(), z.unknown())

export const extractionScrape = pikkuSessionlessFunc({
  description: "Scrape page content",
  input: ExtractionScrapeInput,
  output: ExtractionScrapeOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/sessions/{sessionId}/windows/{windowId}/scrape-content", data) as any
  },
})
