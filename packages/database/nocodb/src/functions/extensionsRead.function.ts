import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExtensionsReadInput = z.object({
  extensionId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Extension ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const ExtensionsReadOutput = z.record(z.string(), z.unknown())

export const extensionsRead = pikkuSessionlessFunc({
  description: "Get extension details",
  input: ExtensionsReadInput,
  output: ExtensionsReadOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/extensions/{extensionId}", data) as any
  },
})
