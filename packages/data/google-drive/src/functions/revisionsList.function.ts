import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RevisionsListInput = z.object({
  fileId: z.string().describe("The ID of the file."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  pageSize: z.number().int().min(1).max(1000).optional().describe("The maximum number of revisions to return per page."),
  pageToken: z.string().optional().describe("The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response."),
})

export const RevisionsListOutput = z.object({
  kind: z.string().optional().default("drive#revisionList").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#revisionList\"."),
  nextPageToken: z.string().optional().describe("The page token for the next page of revisions. This will be absent if the end of the revisions list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results."),
  revisions: z.array(z.object({
    exportLinks: z.record(z.string(), z.string().describe("A mapping from export format to URL")).optional().describe("Links for exporting Docs Editors files to specific formats."),
    id: z.string().optional().describe("The ID of the revision."),
    keepForever: z.boolean().optional().describe("Whether to keep this revision forever, even if it is no longer the head revision. If not set, the revision will be automatically purged 30 days after newer content is uploaded. This can be set on a maximum of 200 revisions for a file.\nThis field is only applicable to files with binary content in Drive."),
    kind: z.string().optional().default("drive#revision").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#revision\"."),
    lastModifyingUser: z.object({
      displayName: z.string().optional().describe("A plain text displayable name for this user."),
      emailAddress: z.string().optional().describe("The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester."),
      kind: z.string().optional().default("drive#user").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#user\"."),
      me: z.boolean().optional().describe("Whether this user is the requesting user."),
      permissionId: z.string().optional().describe("The user's ID as visible in Permission resources."),
      photoLink: z.string().optional().describe("A link to the user's profile photo, if available."),
    }).optional().describe("The last user to modify this revision."),
    md5Checksum: z.string().optional().describe("The MD5 checksum of the revision's content. This is only applicable to files with binary content in Drive."),
    mimeType: z.string().optional().describe("The MIME type of the revision."),
    modifiedTime: z.string().datetime().optional().describe("The last time the revision was modified (RFC 3339 date-time)."),
    originalFilename: z.string().optional().describe("The original filename used to create this revision. This is only applicable to files with binary content in Drive."),
    publishAuto: z.boolean().optional().describe("Whether subsequent revisions will be automatically republished. This is only applicable to Docs Editors files."),
    published: z.boolean().optional().describe("Whether this revision is published. This is only applicable to Docs Editors files."),
    publishedLink: z.string().optional().describe("A link to the published revision. This is only populated for Google Sites files."),
    publishedOutsideDomain: z.boolean().optional().describe("Whether this revision is published outside the domain. This is only applicable to Docs Editors files."),
    size: z.string().optional().describe("The size of the revision's content in bytes. This is only applicable to files with binary content in Drive."),
  })).optional().describe("The list of revisions. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched."),
}).describe("A list of revisions of a file.")

export const revisionsList = pikkuSessionlessFunc({
  description: "Lists a file's revisions.",
  input: RevisionsListInput,
  output: RevisionsListOutput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("GET", "/files/{fileId}/revisions", data) as any
  },
})
