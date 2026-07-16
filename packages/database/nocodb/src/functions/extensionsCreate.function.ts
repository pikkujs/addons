import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExtensionsCreateInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.record(z.string(), z.unknown()),
})

export const ExtensionsCreateOutput = z.unknown()

export const extensionsCreate = pikkuSessionlessFunc({
  description: "Create a new extension for a given base",
  input: ExtensionsCreateInput,
  output: ExtensionsCreateOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/extensions/{baseId}", data) as any
  },
})
