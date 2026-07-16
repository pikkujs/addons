import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DetectEntitiesInput = z.object({
  Text: z.string().optional(),
  LanguageCode: z.string().optional(),
  EndpointArn: z.string().optional(),
})

export const DetectEntitiesOutput = z.record(z.string(), z.unknown())

export const detectEntities = pikkuSessionlessFunc({
  description: "Detect named entities in a text",
  input: DetectEntitiesInput,
  output: DetectEntitiesOutput,
  func: async ({ awsComprehend }, data) => {
    return awsComprehend.call("POST", "/detectEntities", data) as any
  },
})
