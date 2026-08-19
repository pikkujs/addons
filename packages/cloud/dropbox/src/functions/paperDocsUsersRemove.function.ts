import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PaperDocsUsersRemoveInput = z.object({
  member: z.object({
  ".tag": z.enum(["dropbox_id", "email", "other"]).optional(),
  dropbox_id: z.string().optional().describe("Dropbox account, team member, or group ID of member."),
  email: z.string().optional().describe("E-mail address of member."),
}).optional().describe("Includes different ways to identify a member of a shared folder.\ndropbox_id: Dropbox account, team member, or group ID of member.\nemail: E-mail address of member.\nother: None\n"),
  doc_id: z.string().optional().describe("The Paper doc ID."),
})

export const PaperDocsUsersRemoveOutput = z.unknown()

export const paperDocsUsersRemove = pikkuSessionlessFunc({
  description: "Allows an owner or editor to remove users from a Paper doc using their email address or Dropbox account ID.\n\nNote: Doc owner cannot be removed.",
  input: PaperDocsUsersRemoveInput,
  output: PaperDocsUsersRemoveOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/users/remove", data) as any
  },
})
