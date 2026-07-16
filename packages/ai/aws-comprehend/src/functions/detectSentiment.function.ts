import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DetectSentimentInput = z.object({
  Text: z.string().optional(),
  LanguageCode: z.string().optional(),
})

export const DetectSentimentOutput = z.record(z.string(), z.unknown())

export const detectSentiment = pikkuSessionlessFunc({
  description: "Analyze the sentiment of a text",
  input: DetectSentimentInput,
  output: DetectSentimentOutput,
  func: async ({ awsComprehend }, data) => {
    return awsComprehend.call("POST", "/detectSentiment", data) as any
  },
})
