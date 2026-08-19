import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesCopyReferenceSaveInput = z.object({
  path: z.string().optional().describe("Path in the user's Dropbox that is the destination."),
  copy_reference: z.string().optional().describe("A copy reference returned by :route:`copy_reference/get`."),
})

export const FilesCopyReferenceSaveOutput = z.object({
  metadata: z.object({
    parent_shared_folder_id: z.string().optional().describe("Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead."),
    name: z.string().optional().describe("The last component of the path (including extension). This never contains a slash."),
    path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted."),
    path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted."),
  }).optional().describe("Metadata for a file or folder.\nname: The last component of the path (including extension). This never contains a slash.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted.\npath_display: The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted.\nparent_shared_folder_id: Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead.\n"),
}).describe("metadata: The metadata of the saved file or folder in the user's Dropbox.\n")

export const filesCopyReferenceSave = pikkuSessionlessFunc({
  description: "Save a copy reference returned by :route:`copy_reference/get` to the user's Dropbox.",
  input: FilesCopyReferenceSaveInput,
  output: FilesCopyReferenceSaveOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/copy_reference/save", data) as any
  },
})
