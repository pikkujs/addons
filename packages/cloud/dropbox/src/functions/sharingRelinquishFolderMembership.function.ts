import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingRelinquishFolderMembershipInput = z.object({
  shared_folder_id: z.string().optional().describe("The ID for the shared folder."),
  leave_a_copy: z.boolean().optional().describe("Keep a copy of the folder's contents upon relinquishing membership."),
})

export const SharingRelinquishFolderMembershipOutput = z.object({
  ".tag": z.enum(["async_job_id", "complete"]).optional(),
  async_job_id: z.string().optional().describe("This response indicates that the processing is asynchronous. The string is an id that can be used to obtain the status of the asynchronous job."),
}).describe("Result returned by methods that may either launch an asynchronous job or complete synchronously. Upon synchronous completion of the job, no additional information is returned.\nasync_job_id: This response indicates that the processing is asynchronous. The string is an id that can be used to obtain the status of the asynchronous job.\ncomplete: The job finished synchronously and successfully.\n")

export const sharingRelinquishFolderMembership = pikkuSessionlessFunc({
  description: "The current user relinquishes their membership in the designated shared folder and will no longer have access to the folder.  A folder owner cannot relinquish membership in their own folder.\nThis will run synchronously if leave_a_copy is false, and asynchronously if leave_a_copy is true. Apps must have full Dropbox access to use this endpoint.",
  input: SharingRelinquishFolderMembershipInput,
  output: SharingRelinquishFolderMembershipOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/relinquish_folder_membership", data) as any
  },
})
