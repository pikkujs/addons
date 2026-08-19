import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesListLabelsInput = z.object({
  fileId: z.string().describe("The ID of the file."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  maxResults: z.number().int().min(1).max(100).optional().describe("The maximum number of labels to return per page. When not set, this defaults to 100."),
  pageToken: z.string().optional().describe("The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response."),
})

export const FilesListLabelsOutput = z.object({
  kind: z.string().optional().default("drive#labelList").describe("This is always drive#labelList"),
  labels: z.array(z.object({
    fields: z.record(z.string(), z.object({
      dateString: z.array(z.string().date()).optional().describe("Only present if valueType is dateString. RFC 3339 formatted date: YYYY-MM-DD."),
      id: z.string().optional().describe("The identifier of this field."),
      integer: z.array(z.string()).optional().describe("Only present if valueType is integer."),
      kind: z.string().optional().default("drive#labelField").describe("This is always drive#labelField."),
      selection: z.array(z.string()).optional().describe("Only present if valueType is selection."),
      text: z.array(z.string()).optional().describe("Only present if valueType is text."),
      user: z.array(z.object({
        displayName: z.string().optional().describe("A plain text displayable name for this user."),
        emailAddress: z.string().optional().describe("The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester."),
        kind: z.string().optional().default("drive#user").describe("Identifies what kind of resource this is. Value: the fixed string \"drive#user\"."),
        me: z.boolean().optional().describe("Whether this user is the requesting user."),
        permissionId: z.string().optional().describe("The user's ID as visible in Permission resources."),
        photoLink: z.string().optional().describe("A link to the user's profile photo, if available."),
      })).optional().describe("Only present if valueType is user."),
      valueType: z.string().optional().describe("The field type. While new values may be supported in the future, the following are currently allowed:  \n- dateString \n- integer \n- selection \n- text \n- user"),
    }).describe("Representation of a label field.")).optional().describe("A map of the label's fields keyed by the field ID."),
    id: z.string().optional().describe("The ID of the label."),
    kind: z.string().optional().default("drive#label").describe("This is always drive#label"),
    revisionId: z.string().optional().describe("The revision ID of the label."),
  })).optional().describe("The list of labels."),
  nextPageToken: z.string().optional().describe("The page token for the next page of labels. This field will be absent if the end of the list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results."),
}).describe("A list of labels.")

export const filesListLabels = pikkuSessionlessFunc({
  description: "Lists the labels on a file.",
  input: FilesListLabelsInput,
  output: FilesListLabelsOutput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("GET", "/files/{fileId}/listLabels", data) as any
  },
})
