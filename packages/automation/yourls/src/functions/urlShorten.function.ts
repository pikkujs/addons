import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UrlShortenInput = z.object({
  body: z.string().optional(),
})

export const UrlShortenOutput = z.record(z.string(), z.unknown())

export const urlShorten = pikkuSessionlessFunc({
  description: "Url shorten",
  input: UrlShortenInput,
  output: UrlShortenOutput,
  func: async ({ yourls }, data) => {
    return yourls.call("POST", "/yourls-api-shorten", data) as any
  },
})
