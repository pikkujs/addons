import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExtensionsUpdateInput = z.object({
  extensionId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Extension ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.record(z.string(), z.unknown()),
})

export const ExtensionsUpdateOutput = z.unknown()

export const extensionsUpdate = pikkuSessionlessFunc({
  description: "Update extension details",
  input: ExtensionsUpdateInput,
  output: ExtensionsUpdateOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v2/extensions/{extensionId}", data) as any
  },
})
