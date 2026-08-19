import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesEmptyTrashInput = z.object({
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  driveId: z.string().optional().describe("If set, empties the trash of the provided shared drive."),
  enforceSingleParent: z.boolean().optional().describe("Deprecated. If an item is not in a shared drive and its last parent is deleted but the item itself is not, the item will be placed under its owner's root."),
})

export const filesEmptyTrash = pikkuSessionlessFunc({
  description: "Permanently deletes all of the user's trashed files.",
  input: FilesEmptyTrashInput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("DELETE", "/files/trash", data)
  },
})
