import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PermissionsDeleteInput = z.object({
  fileId: z.string().describe("The ID of the file or shared drive."),
  permissionId: z.string().describe("The ID of the permission."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  supportsAllDrives: z.boolean().optional().describe("Whether the requesting application supports both My Drives and shared drives."),
  supportsTeamDrives: z.boolean().optional().describe("Deprecated use supportsAllDrives instead."),
  useDomainAdminAccess: z.boolean().optional().describe("Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs."),
})

export const permissionsDelete = pikkuSessionlessFunc({
  description: "Deletes a permission.",
  input: PermissionsDeleteInput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("DELETE", "/files/{fileId}/permissions/{permissionId}", data)
  },
})
