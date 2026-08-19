import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AiCompletionInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  schema: z.record(z.string(), z.unknown()).optional(),
})

export const AiCompletionOutput = z.record(z.string(), z.unknown())

export const aiCompletion = pikkuSessionlessFunc({
  description: "AI Completion",
  input: AiCompletionInput,
  output: AiCompletionOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/ai/bases/{baseId}/completion", data) as any
  },
})
