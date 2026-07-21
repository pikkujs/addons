import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesDeleteInput = z.object({
  path: z.string().optional().describe("Path in the user's Dropbox to delete."),
  parent_rev: z.string().optional().describe("Perform delete if given \"rev\" matches the existing file's latest \"rev\". This field does not support deleting a folder."),
})

export const FilesDeleteOutput = z.object({
  parent_shared_folder_id: z.string().optional().describe("Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead."),
  name: z.string().optional().describe("The last component of the path (including extension). This never contains a slash."),
  path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted."),
  path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted."),
}).describe("Metadata for a file or folder.\nname: The last component of the path (including extension). This never contains a slash.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted.\npath_display: The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted.\nparent_shared_folder_id: Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead.\n")

export const filesDelete = pikkuSessionlessFunc({
  description: "Delete the file or folder at a given path.\nIf the path is a folder, all its contents will be deleted too.\nA successful response indicates that the file or folder was deleted. The returned metadata will be the corresponding :type:`FileMetadata` or :type:`FolderMetadata` for the item at time of deletion, and not a :type:`DeletedMetadata` object.",
  input: FilesDeleteInput,
  output: FilesDeleteOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/delete", data) as any
  },
})
