import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const BaseMetaGetInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const BaseMetaGetOutput = z.object({
  Node: z.string().optional().describe("Node version"),
  Arch: z.string().optional().describe("Architecture type"),
  Platform: z.string().optional().describe("Platform type"),
  Docker: z.boolean().optional().describe("Is docker"),
  Database: z.string().optional().describe("Database type"),
  ProjectOnRootDB: z.boolean().optional().describe("Is base on rootdb"),
  RootDB: z.string().optional().describe("Root database type"),
  PackageVersion: z.string().optional().describe("Package version"),
})

export const baseMetaGet = pikkuSessionlessFunc({
  description: "Get info such as node version, arch, platform, is docker, rootdb and package version of a given base",
  input: BaseMetaGetInput,
  output: BaseMetaGetOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/projects/{baseId}/info", data) as any
  },
})
