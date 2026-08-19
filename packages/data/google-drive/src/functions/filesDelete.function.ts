import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesDeleteInput = z.object({
  fileId: z.string().describe("The ID of the file."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  enforceSingleParent: z.boolean().optional().describe("Deprecated. If an item is not in a shared drive and its last parent is deleted but the item itself is not, the item will be placed under its owner's root."),
  supportsAllDrives: z.boolean().optional().describe("Whether the requesting application supports both My Drives and shared drives."),
  supportsTeamDrives: z.boolean().optional().describe("Deprecated use supportsAllDrives instead."),
})

export const filesDelete = pikkuSessionlessFunc({
  description: "Permanently deletes a file owned by the user without moving it to the trash. If the file belongs to a shared drive the user must be an organizer on the parent. If the target is a folder, all descendants owned by the user are also deleted.",
  input: FilesDeleteInput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("DELETE", "/files/{fileId}", data)
  },
})
