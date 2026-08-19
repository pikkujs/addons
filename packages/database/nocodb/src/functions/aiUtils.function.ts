import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AiUtilsInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  operation: z.string().optional(),
  input: z.unknown(),
})

export const AiUtilsOutput = z.unknown()

export const aiUtils = pikkuSessionlessFunc({
  description: "AI Utils",
  input: AiUtilsInput,
  output: AiUtilsOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/ai/bases/{baseId}/utils", data) as any
  },
})
