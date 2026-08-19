import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExtensionsListInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const ExtensionsListOutput = z.object({
  list: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const extensionsList = pikkuSessionlessFunc({
  description: "Get all extensions for a given base",
  input: ExtensionsListInput,
  output: ExtensionsListOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/extensions/{baseId}", data) as any
  },
})
