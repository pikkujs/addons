import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DetectDominantLanguageInput = z.object({
  Text: z.string().optional(),
})

export const DetectDominantLanguageOutput = z.record(z.string(), z.unknown())

export const detectDominantLanguage = pikkuSessionlessFunc({
  description: "Detect the dominant language of a text",
  input: DetectDominantLanguageInput,
  output: DetectDominantLanguageOutput,
  func: async ({ awsComprehend }, data) => {
    return awsComprehend.call("POST", "/detectDominantLanguage", data) as any
  },
})
