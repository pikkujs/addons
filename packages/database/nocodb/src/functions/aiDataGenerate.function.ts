import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AiDataGenerateInput = z.object({
  modelId: z.string().describe("Model ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  rowIds: z.array(z.string()),
  column: z.union([z.string(), z.object({
  title: z.string(),
  prompt_raw: z.string(),
  fk_integration_id: z.string(),
  uidt: z.string(),
  model: z.string().optional(),
  output_column_ids: z.string().optional(),
})]).optional(),
  preview: z.boolean().optional(),
})

export const AiDataGenerateOutput = z.array(z.unknown())

export const aiDataGenerate = pikkuSessionlessFunc({
  description: "Generate AI data for specified rows",
  input: AiDataGenerateInput,
  output: AiDataGenerateOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/ai/tables/{modelId}/rows/generate", data) as any
  },
})
