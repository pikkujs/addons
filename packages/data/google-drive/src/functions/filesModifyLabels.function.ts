import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesModifyLabelsInput = z.object({
  fileId: z.string().describe("The ID of the file for which the labels are modified."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  kind: z.string().optional().default("drive#modifyLabelsRequest").describe("This is always drive#modifyLabelsRequest"),
  labelModifications: z.array(z.object({
  fieldModifications: z.array(z.object({
    fieldId: z.string().optional().describe("The ID of the Field to be modified."),
    kind: z.string().optional().default("drive#labelFieldModification").describe("This is always drive#labelFieldModification."),
    setDateValues: z.array(z.string().date()).optional().describe("Replaces a dateString field with these new values. The values must be strings in the RFC 3339 full-date format: YYYY-MM-DD."),
    setIntegerValues: z.array(z.string()).optional().describe("Replaces an integer field with these new values."),
    setSelectionValues: z.array(z.string()).optional().describe("Replaces a selection field with these new values."),
    setTextValues: z.array(z.string()).optional().describe("Replaces a text field with these new values."),
    setUserValues: z.array(z.string()).optional().describe("Replaces a user field with these new values. The values must be valid email addresses."),
    unsetValues: z.boolean().optional().describe("Unsets the values for this field."),
  })).optional().describe("The list of modifications to this label's fields."),
  kind: z.string().optional().default("drive#labelModification").describe("This is always drive#labelModification."),
  labelId: z.string().optional().describe("The ID of the label to modify."),
  removeLabel: z.boolean().optional().describe("If true, the label will be removed from the file."),
})).optional().describe("The list of modifications to apply to the labels on the file."),
})

export const FilesModifyLabelsOutput = z.object({
  kind: z.string().optional().default("drive#modifyLabelsResponse").describe("This is always drive#modifyLabelsResponse"),
  modifiedLabels: z.array(z.object({
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
  })).optional().describe("The list of labels which were added or updated by the request."),
}).describe("Response to a ModifyLabels request. This contains only those labels which were added or updated by the request.")

export const filesModifyLabels = pikkuSessionlessFunc({
  description: "Modifies the set of labels on a file.",
  input: FilesModifyLabelsInput,
  output: FilesModifyLabelsOutput,
  func: async ({ googleDrive }, data) => {
    return googleDrive.call("POST", "/files/{fileId}/modifyLabels", data) as any
  },
})
