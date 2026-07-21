import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AboutGetInput = z.object({
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
})

export const AboutGetOutput = z.object({
  appInstalled: z.boolean().optional().describe("Whether the user has installed the requesting app."),
  canCreateDrives: z.boolean().optional().describe("Whether the user can create shared drives."),
  canCreateTeamDrives: z.boolean().optional().describe("Deprecated - use canCreateDrives instead."),
  driveThemes: z.array(z.object({
    backgroundImageLink: z.string().optional().describe("A link to this theme's background image."),
    colorRgb: z.string().optional().describe("The color of this theme as an RGB hex string."),
    id: z.string().optional().describe("The ID of the theme."),
  })).optional().describe("A list of themes that are supported for shared drives."),
  exportFormats: z.record(z.string(), z.array(z.string())).optional().describe("A map of source MIME type to possible targets for all supported exports."),
  folderColorPalette: z.array(z.string()).optional().describe("The currently supported folder colors as RGB hex strings."),
  importFormats: z.record(z.string(), z.array(z.string())).optional().describe("A map of source MIME type to possible targets for all supported imports."),
  kind: z.string().optional().default("drive#about").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#about\"."),
  maxImportSizes: z.record(z.string(), z.string()).optional().describe("A map of maximum import sizes by MIME type, in bytes."),
  maxUploadSize: z.string().optional().describe("The maximum upload size in bytes."),
  storageQuota: z.object({
    limit: z.string().optional().describe("The usage limit, if applicable. This will not be present if the user has unlimited storage."),
    usage: z.string().optional().describe("The total usage across all services."),
    usageInDrive: z.string().optional().describe("The usage by all files in Google Drive."),
    usageInDriveTrash: z.string().optional().describe("The usage by trashed files in Google Drive."),
  }).optional().describe("The user's storage quota limits and usage. All fields are measured in bytes."),
  teamDriveThemes: z.array(z.object({
    backgroundImageLink: z.string().optional().describe("Deprecated - use driveThemes/backgroundImageLink instead."),
    colorRgb: z.string().optional().describe("Deprecated - use driveThemes/colorRgb instead."),
    id: z.string().optional().describe("Deprecated - use driveThemes/id instead."),
  })).optional().describe("Deprecated - use driveThemes instead."),
  user: z.object({
    displayName: z.string().optional().describe("A plain text displayable name for this user."),
    emailAddress: z.string().optional().describe("The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester."),
    kind: z.string().optional().default("drive#user").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#user\"."),
    me: z.boolean().optional().describe("Whether this user is the requesting user."),
    permissionId: z.string().optional().describe("The user's ID as visible in Permission resources."),
    photoLink: z.string().optional().describe("A link to the user's profile photo, if available."),
  }).optional().describe("The authenticated user."),
}).describe("Information about the user, the user's Drive, and system capabilities.")

export const aboutGet = pikkuSessionlessFunc({
  description: "Gets information about the user, the user's Drive, and system capabilities.",
  input: AboutGetInput,
  output: AboutGetOutput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("GET", "/about", data) as any
  },
})
