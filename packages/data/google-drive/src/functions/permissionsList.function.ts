import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PermissionsListInput = z.object({
  fileId: z.string().describe("The ID of the file or shared drive."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  includePermissionsForView: z.string().optional().describe("Specifies which additional view's permissions to include in the response. Only 'published' is supported."),
  pageSize: z.number().int().min(1).max(100).optional().describe("The maximum number of permissions to return per page. When not set for files in a shared drive, at most 100 results will be returned. When not set for files that are not in a shared drive, the entire list will be returned."),
  pageToken: z.string().optional().describe("The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response."),
  supportsAllDrives: z.boolean().optional().describe("Whether the requesting application supports both My Drives and shared drives."),
  supportsTeamDrives: z.boolean().optional().describe("Deprecated use supportsAllDrives instead."),
  useDomainAdminAccess: z.boolean().optional().describe("Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs."),
})

export const PermissionsListOutput = z.object({
  kind: z.string().optional().default("drive#permissionList").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#permissionList\"."),
  nextPageToken: z.string().optional().describe("The page token for the next page of permissions. This field will be absent if the end of the permissions list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results."),
  permissions: z.array(z.object({
    allowFileDiscovery: z.boolean().optional().describe("Whether the permission allows the file to be discovered through search. This is only applicable for permissions of type domain or anyone."),
    deleted: z.boolean().optional().describe("Whether the account associated with this permission has been deleted. This field only pertains to user and group permissions."),
    displayName: z.string().optional().describe("The \"pretty\" name of the value of the permission. The following is a list of examples for each type of permission:  \n- user - User's full name, as defined for their Google Account, such as \"Joe Smith.\" \n- group - Name of the Google Group, such as \"The Company Administrators.\" \n- domain - String domain name, such as \"your-company.com.\" \n- anyone - No displayName is present."),
    domain: z.string().optional().describe("The domain to which this permission refers. The following options are currently allowed:  \n- The entire domain, such as \"your-company.com.\" \n- A target audience, such as \"ID.audience.googledomains.com.\""),
    emailAddress: z.string().optional().describe("The email address of the user or group to which this permission refers."),
    expirationTime: z.string().datetime().optional().describe("The time at which this permission will expire (RFC 3339 date-time). Expiration times have the following restrictions:  \n- They cannot be set on shared drive items. \n- They can only be set on user and group permissions. \n- The time must be in the future. \n- The time cannot be more than one year in the future."),
    id: z.string().optional().describe("The ID of this permission. This is a unique identifier for the grantee, and is published in User resources as permissionId. IDs should be treated as opaque values."),
    kind: z.string().optional().default("drive#permission").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#permission\"."),
    pendingOwner: z.boolean().optional().describe("Whether the account associated with this permission is a pending owner. Only populated for user type permissions for files that aren't in a shared drive."),
    permissionDetails: z.array(z.object({
      inherited: z.boolean().optional().describe("Whether this permission is inherited. This field is always populated. This is an output-only field."),
      inheritedFrom: z.string().optional().describe("The ID of the item from which this permission is inherited. This is an output-only field."),
      permissionType: z.string().optional().describe("The permission type for this user. While new values may be added in future, the following are currently allowed:  \n- file \n- member"),
      role: z.string().optional().describe("The primary role for this user. While new values may be added in the future, the following are currently allowed:  \n- organizer \n- fileOrganizer \n- writer \n- commenter \n- reader"),
    })).optional().describe("Details of whether the permissions on this shared drive item are inherited or are directly on this item. This is an output-only field that's present only for shared drive items."),
    photoLink: z.string().optional().describe("A link to the user's profile photo, if available."),
    role: z.string().optional().describe("The role granted by this permission. While new values may be supported in the future, the following are currently allowed:  \n- owner \n- organizer \n- fileOrganizer \n- writer \n- commenter \n- reader"),
    teamDrivePermissionDetails: z.array(z.object({
      inherited: z.boolean().optional().describe("Deprecated - use permissionDetails/inherited instead."),
      inheritedFrom: z.string().optional().describe("Deprecated - use permissionDetails/inheritedFrom instead."),
      role: z.string().optional().describe("Deprecated - use permissionDetails/role instead."),
      teamDrivePermissionType: z.string().optional().describe("Deprecated - use permissionDetails/permissionType instead."),
    })).optional().describe("Deprecated - use permissionDetails instead."),
    type: z.string().optional().describe("The type of the grantee. Valid values are:  \n- user \n- group \n- domain \n- anyone  When creating a permission, if type is user or group, you must provide an emailAddress for the user or group. When type is domain, you must provide a domain. There isn't extra information required for the anyone type."),
    view: z.string().optional().describe("Indicates the view for this permission. Only populated for permissions that belong to a view. published is the only supported value."),
  })).optional().describe("The list of permissions. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched."),
}).describe("A list of permissions for a file.")

export const permissionsList = pikkuSessionlessFunc({
  description: "Lists a file's or shared drive's permissions.",
  input: PermissionsListInput,
  output: PermissionsListOutput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("GET", "/files/{fileId}/permissions", data) as any
  },
})
