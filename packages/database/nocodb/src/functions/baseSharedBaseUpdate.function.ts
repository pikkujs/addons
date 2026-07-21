import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const BaseSharedBaseUpdateInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.object({
  password: z.string().min(8).optional().describe("Password to protect the base"),
  roles: z.enum(["commenter", "editor", "viewer"]).optional().describe("The role given the target user"),
  custom_url_path: z.union([z.string(), z.unknown()]).optional().describe("Custom url path"),
}),
})

export const BaseSharedBaseUpdateOutput = z.object({
  uuid: z.string().uuid().optional(),
  url: z.string().url().optional(),
  roles: z.string().optional(),
  fk_custom_url_id: z.union([z.string(), z.unknown()]).optional().describe("ID of custom url"),
})

export const baseSharedBaseUpdate = pikkuSessionlessFunc({
  description: "Update Base Shared Base",
  input: BaseSharedBaseUpdateInput,
  output: BaseSharedBaseUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/projects/{baseId}/shared", data) as any
  },
})
