import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PaperDocsUsersAddInput = z.object({
  doc_id: z.string().optional().describe("The Paper doc ID."),
  quiet: z.boolean().optional().describe("Clients should set this to true if no email message shall be sent to added users."),
  members: z.array(z.object({
  member: z.object({
    ".tag": z.enum(["dropbox_id", "email", "other"]).optional(),
    dropbox_id: z.string().optional().describe("Dropbox account, team member, or group ID of member."),
    email: z.string().optional().describe("E-mail address of member."),
  }).optional().describe("Includes different ways to identify a member of a shared folder.\ndropbox_id: Dropbox account, team member, or group ID of member.\nemail: E-mail address of member.\nother: None\n"),
  permission_level: z.object({
    ".tag": z.enum(["edit", "view_and_comment", "other"]).optional(),
  }).optional().describe("edit: User will be granted edit permissions.\nview_and_comment: User will be granted view and comment permissions.\nother: None\n"),
})).optional().describe("User which should be added to the Paper doc. Specify only email address or Dropbox account ID."),
  custom_message: z.string().optional().describe("A personal message that will be emailed to each successfully added member."),
})

export const PaperDocsUsersAddOutput = z.array(z.object({
  member: z.object({
    ".tag": z.enum(["dropbox_id", "email", "other"]).optional(),
    dropbox_id: z.string().optional().describe("Dropbox account, team member, or group ID of member."),
    email: z.string().optional().describe("E-mail address of member."),
  }).optional().describe("Includes different ways to identify a member of a shared folder.\ndropbox_id: Dropbox account, team member, or group ID of member.\nemail: E-mail address of member.\nother: None\n"),
  result: z.object({
    ".tag": z.enum(["success", "unknown_error", "sharing_outside_team_disabled", "daily_limit_reached", "user_is_owner", "failed_user_data_retrieval", "permission_already_granted", "other"]).optional(),
  }).optional().describe("success: User was successfully added to the Paper doc.\nunknown_error: Something unexpected happened when trying to add the user to the Paper doc.\nsharing_outside_team_disabled: The Paper doc can be shared only with team members.\ndaily_limit_reached: The daily limit of how many users can be added to the Paper doc was reached.\nuser_is_owner: Owner's permissions cannot be changed.\nfailed_user_data_retrieval: User data could not be retrieved. Clients should retry.\npermission_already_granted: This user already has the correct permission to the Paper doc.\nother: None\n"),
}))

export const paperDocsUsersAdd = pikkuSessionlessFunc({
  description: "Allows an owner or editor to add users to a Paper doc or change their permissions using their email address or Dropbox account ID.\n\nNote: The Doc owner's permissions cannot be changed.",
  input: PaperDocsUsersAddInput,
  output: PaperDocsUsersAddOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/users/add", data) as any
  },
})
