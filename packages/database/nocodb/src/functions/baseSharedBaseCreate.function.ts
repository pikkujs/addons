import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const BaseSharedBaseCreateInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  password: z.string().min(8).optional().describe("Password to protect the base"),
  roles: z.enum(["commenter", "editor", "viewer"]).optional().describe("The role given the target user"),
})

export const BaseSharedBaseCreateOutput = z.object({
  uuid: z.union([z.string(), z.unknown()]).optional().describe("Model for StringOrNull"),
  roles: z.union([z.string(), z.unknown()]).optional().describe("Model for StringOrNull"),
})

export const baseSharedBaseCreate = pikkuSessionlessFunc({
  description: "Create Base Shared Base",
  input: BaseSharedBaseCreateInput,
  output: BaseSharedBaseCreateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/projects/{baseId}/shared", data) as any
  },
})
