import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CommentsListInput = z.object({
  fileId: z.string().describe("The ID of the file."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  includeDeleted: z.boolean().optional().describe("Whether to include deleted comments. Deleted comments will not include their original content."),
  pageSize: z.number().int().min(1).max(100).optional().describe("The maximum number of comments to return per page."),
  pageToken: z.string().optional().describe("The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response."),
  startModifiedTime: z.string().optional().describe("The minimum value of 'modifiedTime' for the result comments (RFC 3339 date-time)."),
})

export const CommentsListOutput = z.object({
  comments: z.array(z.object({
    anchor: z.string().optional().describe("A region of the document represented as a JSON string. For details on defining anchor properties, refer to  Add comments and replies."),
    author: z.object({
      displayName: z.string().optional().describe("A plain text displayable name for this user."),
      emailAddress: z.string().optional().describe("The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester."),
      kind: z.string().optional().default("drive#user").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#user\"."),
      me: z.boolean().optional().describe("Whether this user is the requesting user."),
      permissionId: z.string().optional().describe("The user's ID as visible in Permission resources."),
      photoLink: z.string().optional().describe("A link to the user's profile photo, if available."),
    }).optional().describe("The author of the comment. The author's email address and permission ID will not be populated."),
    content: z.string().optional().describe("The plain text content of the comment. This field is used for setting the content, while htmlContent should be displayed."),
    createdTime: z.string().datetime().optional().describe("The time at which the comment was created (RFC 3339 date-time)."),
    deleted: z.boolean().optional().describe("Whether the comment has been deleted. A deleted comment has no content."),
    htmlContent: z.string().optional().describe("The content of the comment with HTML formatting."),
    id: z.string().optional().describe("The ID of the comment."),
    kind: z.string().optional().default("drive#comment").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#comment\"."),
    modifiedTime: z.string().datetime().optional().describe("The last time the comment or any of its replies was modified (RFC 3339 date-time)."),
    quotedFileContent: z.object({
      mimeType: z.string().optional().describe("The MIME type of the quoted content."),
      value: z.string().optional().describe("The quoted content itself. This is interpreted as plain text if set through the API."),
    }).optional().describe("The file content to which the comment refers, typically within the anchor region. For a text file, for example, this would be the text at the location of the comment."),
    replies: z.array(z.object({
      action: z.string().optional().describe("The action the reply performed to the parent comment. Valid values are:  \n- resolve \n- reopen"),
      author: z.object({
        displayName: z.string().optional().describe("A plain text displayable name for this user."),
        emailAddress: z.string().optional().describe("The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester."),
        kind: z.string().optional().default("drive#user").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#user\"."),
        me: z.boolean().optional().describe("Whether this user is the requesting user."),
        permissionId: z.string().optional().describe("The user's ID as visible in Permission resources."),
        photoLink: z.string().optional().describe("A link to the user's profile photo, if available."),
      }).optional().describe("The author of the reply. The author's email address and permission ID will not be populated."),
      content: z.string().optional().describe("The plain text content of the reply. This field is used for setting the content, while htmlContent should be displayed. This is required on creates if no action is specified."),
      createdTime: z.string().datetime().optional().describe("The time at which the reply was created (RFC 3339 date-time)."),
      deleted: z.boolean().optional().describe("Whether the reply has been deleted. A deleted reply has no content."),
      htmlContent: z.string().optional().describe("The content of the reply with HTML formatting."),
      id: z.string().optional().describe("The ID of the reply."),
      kind: z.string().optional().default("drive#reply").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#reply\"."),
      modifiedTime: z.string().datetime().optional().describe("The last time the reply was modified (RFC 3339 date-time)."),
    })).optional().describe("The full list of replies to the comment in chronological order."),
    resolved: z.boolean().optional().describe("Whether the comment has been resolved by one of its replies."),
  })).optional().describe("The list of comments. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched."),
  kind: z.string().optional().default("drive#commentList").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#commentList\"."),
  nextPageToken: z.string().optional().describe("The page token for the next page of comments. This will be absent if the end of the comments list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results."),
}).describe("A list of comments on a file.")

export const commentsList = pikkuSessionlessFunc({
  description: "Lists a file's comments.",
  input: CommentsListInput,
  output: CommentsListOutput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("GET", "/files/{fileId}/comments", data) as any
  },
})
