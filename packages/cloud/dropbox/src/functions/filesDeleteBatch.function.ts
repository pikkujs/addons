import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesDeleteBatchInput = z.object({
  entries: z.array(z.object({
  path: z.string().optional().describe("Path in the user's Dropbox to delete."),
  parent_rev: z.string().optional().describe("Perform delete if given \"rev\" matches the existing file's latest \"rev\". This field does not support deleting a folder."),
})).optional(),
})

export const FilesDeleteBatchOutput = z.object({
  ".tag": z.enum(["async_job_id", "complete", "other"]).optional(),
  async_job_id: z.string().optional().describe("This response indicates that the processing is asynchronous. The string is an id that can be used to obtain the status of the asynchronous job."),
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
}).describe("Result returned by :route:`delete_batch` that may either launch an asynchronous job or complete synchronously.\nasync_job_id: This response indicates that the processing is asynchronous. The string is an id that can be used to obtain the status of the asynchronous job.\ncomplete: None\nother: None\n")

export const filesDeleteBatch = pikkuSessionlessFunc({
  description: "Delete multiple files/folders at once.\nThis route is asynchronous, which returns a job ID immediately and runs the delete batch asynchronously. Use :route:`delete_batch/check` to check the job status.",
  input: FilesDeleteBatchInput,
  output: FilesDeleteBatchOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/delete_batch", data) as any
  },
})
