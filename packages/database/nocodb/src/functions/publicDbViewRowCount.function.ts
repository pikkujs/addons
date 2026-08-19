import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PublicDbViewRowCountInput = z.object({
  sharedViewUuid: z.string().describe("Shared View UUID"),
  where: z.string().optional(),
  nested: z.unknown().optional().describe("Query params for nested data"),
  "xc-password": z.string().optional().describe("Shared view password"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const PublicDbViewRowCountOutput = z.object({
  count: z.number().optional(),
})

export const publicDbViewRowCount = pikkuSessionlessFunc({
  description: "Count how many rows in the given Table View",
  input: PublicDbViewRowCountInput,
  output: PublicDbViewRowCountOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/public/shared-view/{sharedViewUuid}/count", data) as any
  },
})
