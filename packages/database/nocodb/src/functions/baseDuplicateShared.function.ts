import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const BaseDuplicateSharedInput = z.object({
  workspaceId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Workspace ID"),
  sharedBaseId: z.string().describe("Unique Shared Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  options: z.object({
  excludeData: z.boolean().optional(),
  excludeViews: z.boolean().optional(),
}).optional(),
  base: z.record(z.string(), z.unknown()).optional(),
})

export const BaseDuplicateSharedOutput = z.object({
  name: z.string().optional(),
  id: z.string().optional(),
})

export const baseDuplicateShared = pikkuSessionlessFunc({
  description: "Duplicate a shared base",
  input: BaseDuplicateSharedInput,
  output: BaseDuplicateSharedOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/meta/duplicate/{workspaceId}/shared/{sharedBaseId}", data) as any
  },
})
