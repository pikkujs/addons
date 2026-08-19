import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingRemoveFolderMemberInput = z.object({
  member: z.object({
  ".tag": z.enum(["dropbox_id", "email", "other"]).optional(),
  dropbox_id: z.string().optional().describe("Dropbox account, team member, or group ID of member."),
  email: z.string().optional().describe("E-mail address of member."),
}).optional().describe("Includes different ways to identify a member of a shared folder.\ndropbox_id: Dropbox account, team member, or group ID of member.\nemail: E-mail address of member.\nother: None\n"),
  shared_folder_id: z.string().optional().describe("The ID for the shared folder."),
  leave_a_copy: z.boolean().optional().describe("If true, the removed user will keep their copy of the folder after it's unshared, assuming it was mounted. Otherwise, it will be removed from their Dropbox. Also, this must be set to false when kicking a group."),
})

export const SharingRemoveFolderMemberOutput = z.object({
  ".tag": z.literal("async_job_id").optional(),
  async_job_id: z.string().optional().describe("This response indicates that the processing is asynchronous. The string is an id that can be used to obtain the status of the asynchronous job."),
}).describe("Result returned by methods that launch an asynchronous job.\nA method who may either launch an asynchronous job, or complete the request synchronously, can use this union by extending it, and adding a 'complete' field with the type of the synchronous response.\nSee :type:`LaunchEmptyResult` for an example.\nasync_job_id: This response indicates that the processing is asynchronous. The string is an id that can be used to obtain the status of the asynchronous job.\n")

export const sharingRemoveFolderMember = pikkuSessionlessFunc({
  description: "Allows an owner or editor (if the ACL update policy allows) of a shared folder to remove another member.\nApps must have full Dropbox access to use this endpoint.",
  input: SharingRemoveFolderMemberInput,
  output: SharingRemoveFolderMemberOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/remove_folder_member", data) as any
  },
})
