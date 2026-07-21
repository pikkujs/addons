import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AiDataFillInput = z.object({
  modelId: z.string().describe("Model ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  rows: z.array(z.unknown()).optional(),
  numRows: z.number(),
  generateIds: z.array(z.string()),
})

export const AiDataFillOutput = z.array(z.unknown())

export const aiDataFill = pikkuSessionlessFunc({
  description: "Fill AI data for specified rows",
  input: AiDataFillInput,
  output: AiDataFillOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/ai/tables/{modelId}/rows/fill", data) as any
  },
})
