import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesCopyBatchInput = z.object({
  allow_ownership_transfer: z.boolean().optional().describe("Allow moves by owner even if it would result in an ownership transfer for the content being moved. This does not apply to copies."),
  allow_shared_folder: z.boolean().optional().describe("If true, :route:`copy_batch` will copy contents in shared folder, otherwise :field:`RelocationError.cant_copy_shared_folder` will be returned if :field:`RelocationPath.from_path` contains shared folder.  This field is always true for :route:`move_batch`."),
  autorename: z.boolean().optional().describe("If there's a conflict with any file, have the Dropbox server try to autorename that file to avoid the conflict."),
  entries: z.array(z.object({
  from_path: z.string().optional().describe("Path in the user's Dropbox to be copied or moved."),
  to_path: z.string().optional().describe("Path in the user's Dropbox that is the destination."),
})).optional().describe("List of entries to be moved or copied. Each entry is :type:`RelocationPath`."),
})

export const FilesCopyBatchOutput = z.object({
  ".tag": z.enum(["async_job_id", "complete", "other"]).optional(),
  async_job_id: z.string().optional().describe("This response indicates that the processing is asynchronous. The string is an id that can be used to obtain the status of the asynchronous job."),
  complete: z.object({
    entries: z.array(z.object({
      metadata: z.object({
        parent_shared_folder_id: z.string().optional().describe("Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead."),
        name: z.string().optional().describe("The last component of the path (including extension). This never contains a slash."),
        path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted."),
        path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted."),
      }).optional().describe("Metadata for a file or folder.\nname: The last component of the path (including extension). This never contains a slash.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted.\npath_display: The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted.\nparent_shared_folder_id: Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead.\n"),
    })).optional(),
  }).optional().describe("entries: None\n"),
}).describe("Result returned by :route:`copy_batch` or :route:`move_batch` that may either launch an asynchronous job or complete synchronously.\nasync_job_id: This response indicates that the processing is asynchronous. The string is an id that can be used to obtain the status of the asynchronous job.\ncomplete: None\nother: None\n")

export const filesCopyBatch = pikkuSessionlessFunc({
  description: "Copy multiple files or folders to different locations at once in the user's Dropbox.\nIf :field:`RelocationBatchArg.allow_shared_folder` is false, this route is atomic. If on entry failes, the whole transaction will abort. If :field:`RelocationBatchArg.allow_shared_folder` is true, not atomicity is guaranteed, but you will be able to copy the contents of shared folders to new locations.\nThis route will return job ID immediately and do the async copy job in background. Please use :route:`copy_batch/check` to check the job status.",
  input: FilesCopyBatchInput,
  output: FilesCopyBatchOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/copy_batch", data) as any
  },
})
