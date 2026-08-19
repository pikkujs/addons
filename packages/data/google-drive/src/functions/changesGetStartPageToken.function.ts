import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChangesGetStartPageTokenInput = z.object({
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  driveId: z.string().optional().describe("The ID of the shared drive for which the starting pageToken for listing future changes from that shared drive is returned."),
  supportsAllDrives: z.boolean().optional().describe("Whether the requesting application supports both My Drives and shared drives."),
  supportsTeamDrives: z.boolean().optional().describe("Deprecated use supportsAllDrives instead."),
  teamDriveId: z.string().optional().describe("Deprecated use driveId instead."),
})

export const ChangesGetStartPageTokenOutput = z.object({
  kind: z.string().optional().default("drive#startPageToken").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#startPageToken\"."),
  startPageToken: z.string().optional().describe("The starting page token for listing changes."),
})

export const changesGetStartPageToken = pikkuSessionlessFunc({
  description: "Gets the starting pageToken for listing future changes.",
  input: ChangesGetStartPageTokenInput,
  output: ChangesGetStartPageTokenOutput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("GET", "/changes/startPageToken", data) as any
  },
})
