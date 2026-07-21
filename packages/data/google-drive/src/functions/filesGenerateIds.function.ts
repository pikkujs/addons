import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesGenerateIdsInput = z.object({
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  count: z.number().int().min(1).max(1000).optional().describe("The number of IDs to return."),
  space: z.string().optional().describe("The space in which the IDs can be used to create new files. Supported values are 'drive' and 'appDataFolder'. (Default: 'drive')"),
  type: z.string().optional().describe("The type of items which the IDs can be used for. Supported values are 'files' and 'shortcuts'. Note that 'shortcuts' are only supported in the drive 'space'. (Default: 'files')"),
})

export const FilesGenerateIdsOutput = z.object({
  ids: z.array(z.string()).optional().describe("The IDs generated for the requesting user in the specified space."),
  kind: z.string().optional().default("drive#generatedIds").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#generatedIds\"."),
  space: z.string().optional().describe("The type of file that can be created with these IDs."),
}).describe("A list of generated file IDs which can be provided in create requests.")

export const filesGenerateIds = pikkuSessionlessFunc({
  description: "Generates a set of file IDs which can be provided in create or copy requests.",
  input: FilesGenerateIdsInput,
  output: FilesGenerateIdsOutput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("GET", "/files/generateIds", data) as any
  },
})
