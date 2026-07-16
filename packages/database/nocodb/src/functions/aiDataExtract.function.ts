import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AiDataExtractInput = z.object({
  modelId: z.string().describe("Model ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  input: z.string(),
})

export const AiDataExtractOutput = z.array(z.unknown())

export const aiDataExtract = pikkuSessionlessFunc({
  description: "Extract AI data from the input",
  input: AiDataExtractInput,
  output: AiDataExtractOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/ai/tables/{modelId}/extract", data) as any
  },
})
