import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExtensionsDeleteInput = z.object({
  extensionId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Extension ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const ExtensionsDeleteOutput = z.unknown()

export const extensionsDelete = pikkuSessionlessFunc({
  description: "Delete extension",
  input: ExtensionsDeleteInput,
  output: ExtensionsDeleteOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v2/extensions/{extensionId}", data) as any
  },
})
