import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PaperDocsFolderUsersListInput = z.object({
  limit: z.number().optional().describe("Size limit per batch. The maximum number of users that can be retrieved per batch is 1000. Higher value results in invalid arguments error."),
  doc_id: z.string().optional().describe("The Paper doc ID."),
})

export const PaperDocsFolderUsersListOutput = z.object({
  cursor: z.object({
    expiration: z.string().optional().describe("Expiration time of :field:`value`.\nSome cursors might have expiration time assigned. This is a UTC value after which the cursor is no longer valid and the API starts returning an error. If cursor expires a new one needs to be obtained and pagination needs to be restarted. Some cursors might be short-lived some cursors might be long-lived.\nThis really depends on the sorting type and order, e.g.:\n1. on one hand, listing docs created by the user, sorted by the created time ascending will have undefinite expiration because the results cannot change while the iteration is happening. This cursor would be suitable for long term polling.\n2. on the other hand, listing docs sorted by the last modified time will have a very short expiration as docs do get modified very often and the modified time can be changed while the iteration is happening thus altering the results."),
    value: z.string().optional().describe("The actual cursor value."),
  }).optional().describe("value: The actual cursor value.\nexpiration: Expiration time of :field:`value`.\nSome cursors might have expiration time assigned. This is a UTC value after which the cursor is no longer valid and the API starts returning an error. If cursor expires a new one needs to be obtained and pagination needs to be restarted. Some cursors might be short-lived some cursors might be long-lived.\nThis really depends on the sorting type and order, e.g.:\n1. on one hand, listing docs created by the user, sorted by the created time ascending will have undefinite expiration because the results cannot change while the iteration is happening. This cursor would be suitable for long term polling.\n2. on the other hand, listing docs sorted by the last modified time will have a very short expiration as docs do get modified very often and the modified time can be changed while the iteration is happening thus altering the results.\n"),
  has_more: z.boolean().optional().describe("Will be set to True if a subsequent call with the provided cursor to :route:`docs/folder_users/list/continue` returns immediately with some results. If set to False please allow some delay before making another call to :route:`docs/folder_users/list/continue`."),
  users: z.array(z.object({
    email: z.string().optional().describe("Email address of user."),
    team_member_id: z.string().optional().describe("The team member ID of the shared folder member. Only present if :field:`same_team` is true."),
    display_name: z.string().optional().describe("The display name of the user."),
    account_id: z.string().optional().describe("The account ID of the user."),
    same_team: z.boolean().optional().describe("If the user is in the same team as current user."),
  })).optional().describe("List of users that are invited on the Paper folder."),
  invitees: z.array(z.object({
    ".tag": z.enum(["email", "other"]).optional(),
    email: z.string().optional().describe("E-mail address of invited user."),
  })).optional().describe("List of email addresses that are invited on the Paper folder."),
}).describe("invitees: List of email addresses that are invited on the Paper folder.\nusers: List of users that are invited on the Paper folder.\ncursor: Pass the cursor into :route:`docs/folder_users/list/continue` to paginate through all users. The cursor preserves all properties as specified in the original call to :route:`docs/folder_users/list`.\nhas_more: Will be set to True if a subsequent call with the provided cursor to :route:`docs/folder_users/list/continue` returns immediately with some results. If set to False please allow some delay before making another call to :route:`docs/folder_users/list/continue`.\n")

export const paperDocsFolderUsersList = pikkuSessionlessFunc({
  description: "Lists the users who are explicitly invited to the Paper folder in which the Paper doc is contained. For private folders all users (including owner) shared on the folder are listed and for team folders all non-team users shared on the folder are returned.",
  input: PaperDocsFolderUsersListInput,
  output: PaperDocsFolderUsersListOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/folder_users/list", data) as any
  },
})
