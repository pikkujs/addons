import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesCopyBatchCheckInput = z.object({
  async_job_id: z.string().optional().describe("Id of the asynchronous job. This is the value of a response returned from the method that launched the job."),
})

export const FilesCopyBatchCheckOutput = z.object({
  failed: z.object({
    to: z.object({
      malformed_path: z.string().optional(),
      ".tag": z.enum(["malformed_path", "conflict", "no_write_permission", "insufficient_space", "disallowed_name", "team_folder", "too_many_write_operations", "other"]).optional(),
      conflict: z.object({
        ".tag": z.enum(["file", "folder", "file_ancestor", "other"]).optional(),
      }).optional().describe("file: There's a file in the way.\nfolder: There's a folder in the way.\nfile_ancestor: There's a file at an ancestor path, so we couldn't create the required parent folders.\nother: None\n"),
    }).optional().describe("malformed_path: None\nconflict: Couldn't write to the target path because there was something in the way.\nno_write_permission: The user doesn't have permissions to write to the target location.\ninsufficient_space: The user doesn't have enough available space (bytes) to write more data.\ndisallowed_name: Dropbox will not save the file or folder because of its name.\nteam_folder: This endpoint cannot move or delete team folders.\ntoo_many_write_operations: There are too many write operations in user's Dropbox. Please retry this request.\nother: None\n"),
    from_lookup: z.object({
      malformed_path: z.string().optional(),
      ".tag": z.enum(["malformed_path", "not_found", "not_file", "not_folder", "restricted_content", "other"]).optional(),
    }).optional().describe("malformed_path: None\nnot_found: There is nothing at the given path.\nnot_file: We were expecting a file, but the given path refers to something that isn't a file.\nnot_folder: We were expecting a folder, but the given path refers to something that isn't a folder.\nrestricted_content: The file cannot be transferred because the content is restricted.  For example, sometimes there are legal restrictions due to copyright claims.\nother: None\n"),
    ".tag": z.enum(["from_lookup", "from_write", "to", "cant_copy_shared_folder", "cant_nest_shared_folder", "cant_move_folder_into_itself", "too_many_files", "duplicated_or_nested_paths", "cant_transfer_ownership", "insufficient_quota", "other", "too_many_write_operations"]).optional(),
    from_write: z.object({
      malformed_path: z.string().optional(),
      ".tag": z.enum(["malformed_path", "conflict", "no_write_permission", "insufficient_space", "disallowed_name", "team_folder", "too_many_write_operations", "other"]).optional(),
      conflict: z.object({
        ".tag": z.enum(["file", "folder", "file_ancestor", "other"]).optional(),
      }).optional().describe("file: There's a file in the way.\nfolder: There's a folder in the way.\nfile_ancestor: There's a file at an ancestor path, so we couldn't create the required parent folders.\nother: None\n"),
    }).optional().describe("malformed_path: None\nconflict: Couldn't write to the target path because there was something in the way.\nno_write_permission: The user doesn't have permissions to write to the target location.\ninsufficient_space: The user doesn't have enough available space (bytes) to write more data.\ndisallowed_name: Dropbox will not save the file or folder because of its name.\nteam_folder: This endpoint cannot move or delete team folders.\ntoo_many_write_operations: There are too many write operations in user's Dropbox. Please retry this request.\nother: None\n"),
  }).optional().describe("from_lookup: None\nfrom_write: None\nto: None\ncant_copy_shared_folder: Shared folders can't be copied.\ncant_nest_shared_folder: Your move operation would result in nested shared folders.  This is not allowed.\ncant_move_folder_into_itself: You cannot move a folder into itself.\ntoo_many_files: The operation would involve more than 10,000 files and folders.\nduplicated_or_nested_paths: There are duplicated/nested paths among :field:`RelocationArg.from_path` and :field:`RelocationArg.to_path`.\ncant_transfer_ownership: Your move operation would result in an ownership transfer. You may reissue the request with the field :field:`RelocationArg.allow_ownership_transfer` to true.\ninsufficient_quota: The current user does not have enough space to move or copy the files.\nother: None\ntoo_many_write_operations: There are too many write operations in user's Dropbox. Please retry this request.\n"),
  ".tag": z.enum(["in_progress", "complete", "failed"]).optional(),
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
}).describe("in_progress: The asynchronous job is still in progress.\ncomplete: The copy or move batch job has finished.\nfailed: The copy or move batch job has failed with exception.\n")

export const filesCopyBatchCheck = pikkuSessionlessFunc({
  description: "Returns the status of an asynchronous job for :route:`copy_batch`. If success, it returns list of results for each entry.",
  input: FilesCopyBatchCheckInput,
  output: FilesCopyBatchCheckOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/copy_batch/check", data) as any
  },
})
