import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AiSchemaCreateInput = z.object({
  workspaceId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Workspace ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  operation: z.string().optional(),
  input: z.unknown(),
})

export const AiSchemaCreateOutput = z.unknown()

export const aiSchemaCreate = pikkuSessionlessFunc({
  description: "AI Schema",
  input: AiSchemaCreateInput,
  output: AiSchemaCreateOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/ai/workspaces/{workspaceId}/bases", data) as any
  },
})
