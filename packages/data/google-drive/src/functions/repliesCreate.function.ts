import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RepliesCreateInput = z.object({
  fileId: z.string().describe("The ID of the file."),
  commentId: z.string().describe("The ID of the comment."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
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
})

export const RepliesCreateOutput = z.object({
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
}).describe("A reply to a comment on a file.")

export const repliesCreate = pikkuSessionlessFunc({
  description: "Creates a reply to a comment.",
  input: RepliesCreateInput,
  output: RepliesCreateOutput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("POST", "/files/{fileId}/comments/{commentId}/replies", data) as any
  },
})
