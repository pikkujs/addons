import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UrlStatsInput = z.object({
  q: z.string().optional(),
})

export const UrlStatsOutput = z.record(z.string(), z.unknown())

export const urlStats = pikkuSessionlessFunc({
  description: "Url stats",
  input: UrlStatsInput,
  output: UrlStatsOutput,
  func: async ({ yourls }, data) => {
    return yourls.call("GET", "/yourls-api-stats", data) as any
  },
})
