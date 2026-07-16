import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SharingAddFolderMemberInput = z.object({
  shared_folder_id: z.string().optional().describe("The ID for the shared folder."),
  quiet: z.boolean().optional().describe("Whether added members should be notified via email and device notifications of their invite."),
  members: z.array(z.object({
  member: z.object({
    ".tag": z.enum(["dropbox_id", "email", "other"]).optional(),
    dropbox_id: z.string().optional().describe("Dropbox account, team member, or group ID of member."),
    email: z.string().optional().describe("E-mail address of member."),
  }).optional().describe("Includes different ways to identify a member of a shared folder.\ndropbox_id: Dropbox account, team member, or group ID of member.\nemail: E-mail address of member.\nother: None\n"),
  permission_level: z.object({
    ".tag": z.enum(["edit", "view_and_comment", "other"]).optional(),
  }).optional().describe("edit: User will be granted edit permissions.\nview_and_comment: User will be granted view and comment permissions.\nother: None\n"),
})).optional().describe("The intended list of members to add.  Added members will receive invites to join the shared folder."),
  custom_message: z.string().optional().describe("Optional message to display to added members in their invitation."),
})

export const SharingAddFolderMemberOutput = z.unknown()

export const sharingAddFolderMember = pikkuSessionlessFunc({
  description: "Allows an owner or editor (if the ACL update policy allows) of a shared folder to add another member.\nFor the new member to get access to all the functionality for this folder, you will need to call :route:`mount_folder` on their behalf.\nApps must have full Dropbox access to use this endpoint.",
  input: SharingAddFolderMemberInput,
  output: SharingAddFolderMemberOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/add_folder_member", data) as any
  },
})
