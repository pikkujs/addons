import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DrivesDeleteInput = z.object({
  driveId: z.string().describe("The ID of the shared drive."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  allowItemDeletion: z.boolean().optional().describe("Whether any items inside the shared drive should also be deleted. This option is only supported when useDomainAdminAccess is also set to true."),
  useDomainAdminAccess: z.boolean().optional().describe("Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs."),
})

export const drivesDelete = pikkuSessionlessFunc({
  description: "Permanently deletes a shared drive for which the user is an organizer. The shared drive cannot contain any untrashed items.",
  input: DrivesDeleteInput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("DELETE", "/drives/{driveId}", data)
  },
})
