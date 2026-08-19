import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingUnshareFolderInput = z.object({
  shared_folder_id: z.string().optional().describe("The ID for the shared folder."),
  leave_a_copy: z.boolean().optional().describe("If true, members of this shared folder will get a copy of this folder after it's unshared. Otherwise, it will be removed from their Dropbox. The current user, who is an owner, will always retain their copy."),
})

export const SharingUnshareFolderOutput = z.object({
  ".tag": z.enum(["async_job_id", "complete"]).optional(),
  async_job_id: z.string().optional().describe("This response indicates that the processing is asynchronous. The string is an id that can be used to obtain the status of the asynchronous job."),
}).describe("Result returned by methods that may either launch an asynchronous job or complete synchronously. Upon synchronous completion of the job, no additional information is returned.\nasync_job_id: This response indicates that the processing is asynchronous. The string is an id that can be used to obtain the status of the asynchronous job.\ncomplete: The job finished synchronously and successfully.\n")

export const sharingUnshareFolder = pikkuSessionlessFunc({
  description: "Allows a shared folder owner to unshare the folder.\nYou'll need to call :route:`check_job_status` to determine if the action has completed successfully.\nApps must have full Dropbox access to use this endpoint.",
  input: SharingUnshareFolderInput,
  output: SharingUnshareFolderOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/unshare_folder", data) as any
  },
})
