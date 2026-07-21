import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DrivesHideInput = z.object({
  driveId: z.string().describe("The ID of the shared drive."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
})

export const DrivesHideOutput = z.object({
  backgroundImageFile: z.object({
    id: z.string().optional().describe("The ID of an image file in Google Drive to use for the background image."),
    width: z.number().optional().describe("The width of the cropped image in the closed range of 0 to 1. This value represents the width of the cropped image divided by the width of the entire image. The height is computed by applying a width to height aspect ratio of 80 to 9. The resulting image must be at least 1280 pixels wide and 144 pixels high."),
    xCoordinate: z.number().optional().describe("The X coordinate of the upper left corner of the cropping area in the background image. This is a value in the closed range of 0 to 1. This value represents the horizontal distance from the left side of the entire image to the left side of the cropping area divided by the width of the entire image."),
    yCoordinate: z.number().optional().describe("The Y coordinate of the upper left corner of the cropping area in the background image. This is a value in the closed range of 0 to 1. This value represents the vertical distance from the top side of the entire image to the top side of the cropping area divided by the height of the entire image."),
  }).optional().describe("An image file and cropping parameters from which a background image for this shared drive is set. This is a write-only field; it can only be set on drive.drives.update requests that don't set themeId. When specified, all fields of the backgroundImageFile must be set."),
  backgroundImageLink: z.string().optional().describe("A short-lived link to this shared drive's background image."),
  capabilities: z.object({
    canAddChildren: z.boolean().optional().describe("Whether the current user can add children to folders in this shared drive."),
    canChangeCopyRequiresWriterPermissionRestriction: z.boolean().optional().describe("Whether the current user can change the copyRequiresWriterPermission restriction of this shared drive."),
    canChangeDomainUsersOnlyRestriction: z.boolean().optional().describe("Whether the current user can change the domainUsersOnly restriction of this shared drive."),
    canChangeDriveBackground: z.boolean().optional().describe("Whether the current user can change the background of this shared drive."),
    canChangeDriveMembersOnlyRestriction: z.boolean().optional().describe("Whether the current user can change the driveMembersOnly restriction of this shared drive."),
    canChangeSharingFoldersRequiresOrganizerPermissionRestriction: z.boolean().optional().describe("Whether the current user can change the sharingFoldersRequiresOrganizerPermission restriction of this shared drive."),
    canComment: z.boolean().optional().describe("Whether the current user can comment on files in this shared drive."),
    canCopy: z.boolean().optional().describe("Whether the current user can copy files in this shared drive."),
    canDeleteChildren: z.boolean().optional().describe("Whether the current user can delete children from folders in this shared drive."),
    canDeleteDrive: z.boolean().optional().describe("Whether the current user can delete this shared drive. Attempting to delete the shared drive may still fail if there are untrashed items inside the shared drive."),
    canDownload: z.boolean().optional().describe("Whether the current user can download files in this shared drive."),
    canEdit: z.boolean().optional().describe("Whether the current user can edit files in this shared drive"),
    canListChildren: z.boolean().optional().describe("Whether the current user can list the children of folders in this shared drive."),
    canManageMembers: z.boolean().optional().describe("Whether the current user can add members to this shared drive or remove them or change their role."),
    canReadRevisions: z.boolean().optional().describe("Whether the current user can read the revisions resource of files in this shared drive."),
    canRename: z.boolean().optional().describe("Whether the current user can rename files or folders in this shared drive."),
    canRenameDrive: z.boolean().optional().describe("Whether the current user can rename this shared drive."),
    canResetDriveRestrictions: z.boolean().optional().describe("Whether the current user can reset the shared drive restrictions to defaults."),
    canShare: z.boolean().optional().describe("Whether the current user can share files or folders in this shared drive."),
    canTrashChildren: z.boolean().optional().describe("Whether the current user can trash children from folders in this shared drive."),
  }).optional().describe("Capabilities the current user has on this shared drive."),
  colorRgb: z.string().optional().describe("The color of this shared drive as an RGB hex string. It can only be set on drive.drives.update requests that don't set themeId."),
  createdTime: z.string().datetime().optional().describe("The time at which the shared drive was created (RFC 3339 date-time)."),
  hidden: z.boolean().optional().describe("Whether the shared drive is hidden from default view."),
  id: z.string().optional().describe("The ID of this shared drive which is also the ID of the top level folder of this shared drive."),
  kind: z.string().optional().default("drive#drive").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#drive\"."),
  name: z.string().optional().describe("The name of this shared drive."),
  orgUnitId: z.string().optional().describe("The organizational unit of this shared drive. This field is only populated on drives.list responses when the useDomainAdminAccess parameter is set to true."),
  restrictions: z.object({
    adminManagedRestrictions: z.boolean().optional().describe("Whether administrative privileges on this shared drive are required to modify restrictions."),
    copyRequiresWriterPermission: z.boolean().optional().describe("Whether the options to copy, print, or download files inside this shared drive, should be disabled for readers and commenters. When this restriction is set to true, it will override the similarly named field to true for any file inside this shared drive."),
    domainUsersOnly: z.boolean().optional().describe("Whether access to this shared drive and items inside this shared drive is restricted to users of the domain to which this shared drive belongs. This restriction may be overridden by other sharing policies controlled outside of this shared drive."),
    driveMembersOnly: z.boolean().optional().describe("Whether access to items inside this shared drive is restricted to its members."),
    sharingFoldersRequiresOrganizerPermission: z.boolean().optional().describe("If true, only users with the organizer role can share folders. If false, users with either the organizer role or the file organizer role can share folders."),
  }).optional().describe("A set of restrictions that apply to this shared drive or items inside this shared drive."),
  themeId: z.string().optional().describe("The ID of the theme from which the background image and color are set. The set of possible driveThemes can be retrieved from a drive.about.get response. When not specified on a drive.drives.create request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set colorRgb or backgroundImageFile."),
}).describe("Representation of a shared drive.")

export const drivesHide = pikkuSessionlessFunc({
  description: "Hides a shared drive from the default view.",
  input: DrivesHideInput,
  output: DrivesHideOutput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("POST", "/drives/{driveId}/hide", data) as any
  },
})
