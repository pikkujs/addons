import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AnalyzeSentimentInput = z.object({
  encodingType: z.string().optional(),
  document: z.object({
  type: z.string().optional(),
  content: z.string().optional(),
  gcsContentUri: z.string().optional(),
  language: z.string().optional(),
}).optional(),
})

export const AnalyzeSentimentOutput = z.object({
  language: z.string().optional(),
})

export const analyzeSentiment = pikkuSessionlessFunc({
  description: "Analyze the sentiment of a document",
  input: AnalyzeSentimentInput,
  output: AnalyzeSentimentOutput,
  func: async ({ googleCloudNaturalLanguage }, data) => {
    return googleCloudNaturalLanguage.call("POST", "/documents:analyzeSentiment", data) as any
  },
})
