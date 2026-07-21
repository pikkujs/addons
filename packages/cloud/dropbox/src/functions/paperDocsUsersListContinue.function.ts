import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PaperDocsUsersListContinueInput = z.object({
  cursor: z.string().optional().describe("The cursor obtained from :route:`docs/users/list` or :route:`docs/users/list/continue`. Allows for pagination."),
  doc_id: z.string().optional().describe("The Paper doc ID."),
})

export const PaperDocsUsersListContinueOutput = z.object({
  cursor: z.object({
    expiration: z.string().optional().describe("Expiration time of :field:`value`.\nSome cursors might have expiration time assigned. This is a UTC value after which the cursor is no longer valid and the API starts returning an error. If cursor expires a new one needs to be obtained and pagination needs to be restarted. Some cursors might be short-lived some cursors might be long-lived.\nThis really depends on the sorting type and order, e.g.:\n1. on one hand, listing docs created by the user, sorted by the created time ascending will have undefinite expiration because the results cannot change while the iteration is happening. This cursor would be suitable for long term polling.\n2. on the other hand, listing docs sorted by the last modified time will have a very short expiration as docs do get modified very often and the modified time can be changed while the iteration is happening thus altering the results."),
    value: z.string().optional().describe("The actual cursor value."),
  }).optional().describe("value: The actual cursor value.\nexpiration: Expiration time of :field:`value`.\nSome cursors might have expiration time assigned. This is a UTC value after which the cursor is no longer valid and the API starts returning an error. If cursor expires a new one needs to be obtained and pagination needs to be restarted. Some cursors might be short-lived some cursors might be long-lived.\nThis really depends on the sorting type and order, e.g.:\n1. on one hand, listing docs created by the user, sorted by the created time ascending will have undefinite expiration because the results cannot change while the iteration is happening. This cursor would be suitable for long term polling.\n2. on the other hand, listing docs sorted by the last modified time will have a very short expiration as docs do get modified very often and the modified time can be changed while the iteration is happening thus altering the results.\n"),
  has_more: z.boolean().optional().describe("Will be set to True if a subsequent call with the provided cursor to :route:`docs/users/list/continue` returns immediately with some results. If set to False please allow some delay before making another call to :route:`docs/users/list/continue`."),
  doc_owner: z.object({
    email: z.string().optional().describe("Email address of user."),
    team_member_id: z.string().optional().describe("The team member ID of the shared folder member. Only present if :field:`same_team` is true."),
    display_name: z.string().optional().describe("The display name of the user."),
    account_id: z.string().optional().describe("The account ID of the user."),
    same_team: z.boolean().optional().describe("If the user is in the same team as current user."),
  }).optional().describe("Basic information about a user. Use :route:`users.get_account` and :route:`users.get_account_batch` to obtain more detailed information.\naccount_id: The account ID of the user.\nemail: Email address of user.\ndisplay_name: The display name of the user.\nsame_team: If the user is in the same team as current user.\nteam_member_id: The team member ID of the shared folder member. Only present if :field:`same_team` is true.\n"),
  users: z.array(z.object({
    permission_level: z.object({
      ".tag": z.enum(["edit", "view_and_comment", "other"]).optional(),
    }).optional().describe("edit: User will be granted edit permissions.\nview_and_comment: User will be granted view and comment permissions.\nother: None\n"),
    user: z.object({
      email: z.string().optional().describe("Email address of user."),
      team_member_id: z.string().optional().describe("The team member ID of the shared folder member. Only present if :field:`same_team` is true."),
      display_name: z.string().optional().describe("The display name of the user."),
      account_id: z.string().optional().describe("The account ID of the user."),
      same_team: z.boolean().optional().describe("If the user is in the same team as current user."),
    }).optional().describe("Basic information about a user. Use :route:`users.get_account` and :route:`users.get_account_batch` to obtain more detailed information.\naccount_id: The account ID of the user.\nemail: Email address of user.\ndisplay_name: The display name of the user.\nsame_team: If the user is in the same team as current user.\nteam_member_id: The team member ID of the shared folder member. Only present if :field:`same_team` is true.\n"),
  })).optional().describe("List of users with their respective permission levels that are invited on the Paper folder."),
  invitees: z.array(z.object({
    permission_level: z.object({
      ".tag": z.enum(["edit", "view_and_comment", "other"]).optional(),
    }).optional().describe("edit: User will be granted edit permissions.\nview_and_comment: User will be granted view and comment permissions.\nother: None\n"),
    invitee: z.object({
      ".tag": z.enum(["email", "other"]).optional(),
      email: z.string().optional().describe("E-mail address of invited user."),
    }).optional().describe("Information about the recipient of a shared content invitation.\nemail: E-mail address of invited user.\nother: None\n"),
  })).optional().describe("List of email addresses with their respective permission levels that are invited on the Paper doc."),
}).describe("invitees: List of email addresses with their respective permission levels that are invited on the Paper doc.\nusers: List of users with their respective permission levels that are invited on the Paper folder.\ndoc_owner: The Paper doc owner. This field is populated on every single response.\ncursor: Pass the cursor into :route:`docs/users/list/continue` to paginate through all users. The cursor preserves all properties as specified in the original call to :route:`docs/users/list`.\nhas_more: Will be set to True if a subsequent call with the provided cursor to :route:`docs/users/list/continue` returns immediately with some results. If set to False please allow some delay before making another call to :route:`docs/users/list/continue`.\n")

export const paperDocsUsersListContinue = pikkuSessionlessFunc({
  description: "Once a cursor has been retrieved from :route:`docs/users/list`, use this to paginate through all users on the Paper doc.",
  input: PaperDocsUsersListContinueInput,
  output: PaperDocsUsersListContinueOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/users/list/continue", data) as any
  },
})
