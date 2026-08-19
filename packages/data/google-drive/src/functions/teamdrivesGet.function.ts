import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TeamdrivesGetInput = z.object({
  teamDriveId: z.string().describe("The ID of the Team Drive"),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  useDomainAdminAccess: z.boolean().optional().describe("Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs."),
})

export const TeamdrivesGetOutput = z.object({
  backgroundImageFile: z.object({
    id: z.string().optional().describe("The ID of an image file in Drive to use for the background image."),
    width: z.number().optional().describe("The width of the cropped image in the closed range of 0 to 1. This value represents the width of the cropped image divided by the width of the entire image. The height is computed by applying a width to height aspect ratio of 80 to 9. The resulting image must be at least 1280 pixels wide and 144 pixels high."),
    xCoordinate: z.number().optional().describe("The X coordinate of the upper left corner of the cropping area in the background image. This is a value in the closed range of 0 to 1. This value represents the horizontal distance from the left side of the entire image to the left side of the cropping area divided by the width of the entire image."),
    yCoordinate: z.number().optional().describe("The Y coordinate of the upper left corner of the cropping area in the background image. This is a value in the closed range of 0 to 1. This value represents the vertical distance from the top side of the entire image to the top side of the cropping area divided by the height of the entire image."),
  }).optional().describe("An image file and cropping parameters from which a background image for this Team Drive is set. This is a write only field; it can only be set on drive.teamdrives.update requests that don't set themeId. When specified, all fields of the backgroundImageFile must be set."),
  backgroundImageLink: z.string().optional().describe("A short-lived link to this Team Drive's background image."),
  capabilities: z.object({
    canAddChildren: z.boolean().optional().describe("Whether the current user can add children to folders in this Team Drive."),
    canChangeCopyRequiresWriterPermissionRestriction: z.boolean().optional().describe("Whether the current user can change the copyRequiresWriterPermission restriction of this Team Drive."),
    canChangeDomainUsersOnlyRestriction: z.boolean().optional().describe("Whether the current user can change the domainUsersOnly restriction of this Team Drive."),
    canChangeSharingFoldersRequiresOrganizerPermissionRestriction: z.boolean().optional().describe("Whether the current user can change the sharingFoldersRequiresOrganizerPermission restriction of this Team Drive."),
    canChangeTeamDriveBackground: z.boolean().optional().describe("Whether the current user can change the background of this Team Drive."),
    canChangeTeamMembersOnlyRestriction: z.boolean().optional().describe("Whether the current user can change the teamMembersOnly restriction of this Team Drive."),
    canComment: z.boolean().optional().describe("Whether the current user can comment on files in this Team Drive."),
    canCopy: z.boolean().optional().describe("Whether the current user can copy files in this Team Drive."),
    canDeleteChildren: z.boolean().optional().describe("Whether the current user can delete children from folders in this Team Drive."),
    canDeleteTeamDrive: z.boolean().optional().describe("Whether the current user can delete this Team Drive. Attempting to delete the Team Drive may still fail if there are untrashed items inside the Team Drive."),
    canDownload: z.boolean().optional().describe("Whether the current user can download files in this Team Drive."),
    canEdit: z.boolean().optional().describe("Whether the current user can edit files in this Team Drive"),
    canListChildren: z.boolean().optional().describe("Whether the current user can list the children of folders in this Team Drive."),
    canManageMembers: z.boolean().optional().describe("Whether the current user can add members to this Team Drive or remove them or change their role."),
    canReadRevisions: z.boolean().optional().describe("Whether the current user can read the revisions resource of files in this Team Drive."),
    canRemoveChildren: z.boolean().optional().describe("Deprecated - use canDeleteChildren or canTrashChildren instead."),
    canRename: z.boolean().optional().describe("Whether the current user can rename files or folders in this Team Drive."),
    canRenameTeamDrive: z.boolean().optional().describe("Whether the current user can rename this Team Drive."),
    canResetTeamDriveRestrictions: z.boolean().optional().describe("Whether the current user can reset the Team Drive restrictions to defaults."),
    canShare: z.boolean().optional().describe("Whether the current user can share files or folders in this Team Drive."),
    canTrashChildren: z.boolean().optional().describe("Whether the current user can trash children from folders in this Team Drive."),
  }).optional().describe("Capabilities the current user has on this Team Drive."),
  colorRgb: z.string().optional().describe("The color of this Team Drive as an RGB hex string. It can only be set on a drive.teamdrives.update request that does not set themeId."),
  createdTime: z.string().datetime().optional().describe("The time at which the Team Drive was created (RFC 3339 date-time)."),
  id: z.string().optional().describe("The ID of this Team Drive which is also the ID of the top level folder of this Team Drive."),
  kind: z.string().optional().default("drive#teamDrive").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#teamDrive\"."),
  name: z.string().optional().describe("The name of this Team Drive."),
  orgUnitId: z.string().optional().describe("The organizational unit of this shared drive. This field is only populated on drives.list responses when the useDomainAdminAccess parameter is set to true."),
  restrictions: z.object({
    adminManagedRestrictions: z.boolean().optional().describe("Whether administrative privileges on this Team Drive are required to modify restrictions."),
    copyRequiresWriterPermission: z.boolean().optional().describe("Whether the options to copy, print, or download files inside this Team Drive, should be disabled for readers and commenters. When this restriction is set to true, it will override the similarly named field to true for any file inside this Team Drive."),
    domainUsersOnly: z.boolean().optional().describe("Whether access to this Team Drive and items inside this Team Drive is restricted to users of the domain to which this Team Drive belongs. This restriction may be overridden by other sharing policies controlled outside of this Team Drive."),
    sharingFoldersRequiresOrganizerPermission: z.boolean().optional().describe("If true, only users with the organizer role can share folders. If false, users with either the organizer role or the file organizer role can share folders."),
    teamMembersOnly: z.boolean().optional().describe("Whether access to items inside this Team Drive is restricted to members of this Team Drive."),
  }).optional().describe("A set of restrictions that apply to this Team Drive or items inside this Team Drive."),
  themeId: z.string().optional().describe("The ID of the theme from which the background image and color will be set. The set of possible teamDriveThemes can be retrieved from a drive.about.get response. When not specified on a drive.teamdrives.create request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set colorRgb or backgroundImageFile."),
}).describe("Deprecated: use the drive collection instead.")

export const teamdrivesGet = pikkuSessionlessFunc({
  description: "Deprecated use drives.get instead.",
  input: TeamdrivesGetInput,
  output: TeamdrivesGetOutput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("GET", "/teamdrives/{teamDriveId}", data) as any
  },
})
