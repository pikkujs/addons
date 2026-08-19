import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesDeleteBatchCheckInput = z.object({
  async_job_id: z.string().optional().describe("Id of the asynchronous job. This is the value of a response returned from the method that launched the job."),
})

export const FilesDeleteBatchCheckOutput = z.object({
  failed: z.object({
    ".tag": z.enum(["too_many_write_operations", "other"]).optional(),
  }).optional().describe("too_many_write_operations: Use :field:`DeleteError.too_many_write_operations`. :route:`delete_batch` now provides smaller granularity about which entry has failed because of this.\nother: None\n"),
  ".tag": z.enum(["in_progress", "complete", "failed", "other"]).optional(),
  complete: z.object({
    entries: z.array(z.object({
      failure: z.object({
        path_lookup: z.object({
          malformed_path: z.string().optional(),
          ".tag": z.enum(["malformed_path", "not_found", "not_file", "not_folder", "restricted_content", "other"]).optional(),
        }).optional().describe("malformed_path: None\nnot_found: There is nothing at the given path.\nnot_file: We were expecting a file, but the given path refers to something that isn't a file.\nnot_folder: We were expecting a folder, but the given path refers to something that isn't a folder.\nrestricted_content: The file cannot be transferred because the content is restricted.  For example, sometimes there are legal restrictions due to copyright claims.\nother: None\n"),
        ".tag": z.enum(["path_lookup", "path_write", "too_many_write_operations", "too_many_files", "other"]).optional(),
        path_write: z.object({
          malformed_path: z.string().optional(),
          ".tag": z.enum(["malformed_path", "conflict", "no_write_permission", "insufficient_space", "disallowed_name", "team_folder", "too_many_write_operations", "other"]).optional(),
          conflict: z.object({
            ".tag": z.enum(["file", "folder", "file_ancestor", "other"]).optional(),
          }).optional().describe("file: There's a file in the way.\nfolder: There's a folder in the way.\nfile_ancestor: There's a file at an ancestor path, so we couldn't create the required parent folders.\nother: None\n"),
        }).optional().describe("malformed_path: None\nconflict: Couldn't write to the target path because there was something in the way.\nno_write_permission: The user doesn't have permissions to write to the target location.\ninsufficient_space: The user doesn't have enough available space (bytes) to write more data.\ndisallowed_name: Dropbox will not save the file or folder because of its name.\nteam_folder: This endpoint cannot move or delete team folders.\ntoo_many_write_operations: There are too many write operations in user's Dropbox. Please retry this request.\nother: None\n"),
      }).optional().describe("path_lookup: None\npath_write: None\ntoo_many_write_operations: There are too many write operations in user's Dropbox. Please retry this request.\ntoo_many_files: There are too many files in one request. Please retry with fewer files.\nother: None\n"),
      ".tag": z.enum(["success", "failure"]).optional(),
      success: z.object({
        metadata: z.object({
          parent_shared_folder_id: z.string().optional().describe("Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead."),
          name: z.string().optional().describe("The last component of the path (including extension). This never contains a slash."),
          path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted."),
          path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted."),
        }).optional().describe("Metadata for a file or folder.\nname: The last component of the path (including extension). This never contains a slash.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted.\npath_display: The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted.\nparent_shared_folder_id: Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead.\n"),
      }).optional().describe("metadata: Metadata of the deleted object.\n"),
    })).optional(),
  }).optional().describe("entries: None\n"),
}).describe("in_progress: The asynchronous job is still in progress.\ncomplete: The batch delete has finished.\nfailed: The batch delete has failed.\nother: None\n")

export const filesDeleteBatchCheck = pikkuSessionlessFunc({
  description: "Returns the status of an asynchronous job for :route:`delete_batch`. If success, it returns list of result for each entry.",
  input: FilesDeleteBatchCheckInput,
  output: FilesDeleteBatchCheckOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/delete_batch/check", data) as any
  },
})
