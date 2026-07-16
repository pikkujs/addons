import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesCreateFolderBatchCheckInput = z.object({
  async_job_id: z.string().optional().describe("Id of the asynchronous job. This is the value of a response returned from the method that launched the job."),
})

export const FilesCreateFolderBatchCheckOutput = z.object({
  failed: z.object({
    ".tag": z.enum(["too_many_files", "other"]).optional(),
  }).optional().describe("too_many_files: The operation would involve too many files or folders.\nother: None\n"),
  ".tag": z.enum(["in_progress", "complete", "failed", "other"]).optional(),
  complete: z.object({
    entries: z.array(z.object({
      failure: z.object({
        path: z.object({
          malformed_path: z.string().optional(),
          ".tag": z.enum(["malformed_path", "conflict", "no_write_permission", "insufficient_space", "disallowed_name", "team_folder", "too_many_write_operations", "other"]).optional(),
          conflict: z.object({
            ".tag": z.enum(["file", "folder", "file_ancestor", "other"]).optional(),
          }).optional().describe("file: There's a file in the way.\nfolder: There's a folder in the way.\nfile_ancestor: There's a file at an ancestor path, so we couldn't create the required parent folders.\nother: None\n"),
        }).optional().describe("malformed_path: None\nconflict: Couldn't write to the target path because there was something in the way.\nno_write_permission: The user doesn't have permissions to write to the target location.\ninsufficient_space: The user doesn't have enough available space (bytes) to write more data.\ndisallowed_name: Dropbox will not save the file or folder because of its name.\nteam_folder: This endpoint cannot move or delete team folders.\ntoo_many_write_operations: There are too many write operations in user's Dropbox. Please retry this request.\nother: None\n"),
        ".tag": z.enum(["path", "other"]).optional(),
      }).optional().describe("path: None\nother: None\n"),
      ".tag": z.enum(["success", "failure"]).optional(),
      success: z.object({
        metadata: z.object({
          parent_shared_folder_id: z.string().optional().describe("Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead."),
          name: z.string().optional().describe("The last component of the path (including extension). This never contains a slash."),
          path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted."),
          shared_folder_id: z.string().optional().describe("Please use :field:`sharing_info` instead."),
          path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted."),
          sharing_info: z.object({
            read_only: z.boolean().optional().describe("True if the file or folder is inside a read-only shared folder."),
            parent_shared_folder_id: z.string().optional().describe("Set if the folder is contained by a shared folder."),
            traverse_only: z.boolean().optional().describe("Specifies that the folder can only be traversed and the user can only see a limited subset of the contents of this folder because they don't have read access to this folder. They do, however, have access to some sub folder."),
            shared_folder_id: z.string().optional().describe("If this folder is a shared folder mount point, the ID of the shared folder mounted at this location."),
            no_access: z.boolean().optional().describe("Specifies that the folder cannot be accessed by the user."),
          }).optional().describe("Sharing info for a folder which is contained in a shared folder or is a shared folder mount point.\nread_only: True if the file or folder is inside a read-only shared folder.\nparent_shared_folder_id: Set if the folder is contained by a shared folder.\nshared_folder_id: If this folder is a shared folder mount point, the ID of the shared folder mounted at this location.\ntraverse_only: Specifies that the folder can only be traversed and the user can only see a limited subset of the contents of this folder because they don't have read access to this folder. They do, however, have access to some sub folder.\nno_access: Specifies that the folder cannot be accessed by the user.\n"),
          property_groups: z.array(z.object({
            fields: z.array(z.object({
              name: z.string().optional().describe("Key of the property field associated with a file and template. Keys can be up to 256 bytes."),
              value: z.string().optional().describe("Value of the property field associated with a file and template. Values can be up to 1024 bytes."),
            })).optional().describe("The actual properties associated with the template. There can be up to 32 property types per template."),
            template_id: z.string().optional().describe("A unique identifier for the associated template."),
          })).optional().describe("Additional information if the file has custom properties with the property template specified. Note that only properties associated with user-owned templates, not team-owned templates, can be attached to folders."),
          id: z.string().optional().describe("A unique identifier for the folder."),
        }).optional().describe("name: The last component of the path (including extension). This never contains a slash.\nid: A unique identifier for the folder.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted.\npath_display: The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted.\nparent_shared_folder_id: Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead.\nshared_folder_id: Please use :field:`sharing_info` instead.\nsharing_info: Set if the folder is contained in a shared folder or is a shared folder mount point.\nproperty_groups: Additional information if the file has custom properties with the property template specified. Note that only properties associated with user-owned templates, not team-owned templates, can be attached to folders.\n"),
      }).optional().describe("metadata: Metadata of the created folder.\n"),
    })).optional(),
  }).optional().describe("entries: None\n"),
}).describe("in_progress: The asynchronous job is still in progress.\ncomplete: The batch create folder has finished.\nfailed: The batch create folder has failed.\nother: None\n")

export const filesCreateFolderBatchCheck = pikkuSessionlessFunc({
  description: "Returns the status of an asynchronous job for :route:`create_folder_batch`. If success, it returns list of result for each entry.",
  input: FilesCreateFolderBatchCheckInput,
  output: FilesCreateFolderBatchCheckOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/create_folder_batch/check", data) as any
  },
})
