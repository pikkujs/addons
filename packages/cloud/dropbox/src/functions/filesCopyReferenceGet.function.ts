import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesCopyReferenceGetInput = z.object({
  path: z.string().optional().describe("The path to the file or folder you want to get a copy reference to."),
})

export const FilesCopyReferenceGetOutput = z.object({
  expires: z.string().optional().describe("The expiration date of the copy reference. This value is currently set to be far enough in the future so that expiration is effectively not an issue."),
  copy_reference: z.string().optional().describe("A copy reference to the file or folder."),
  metadata: z.object({
    parent_shared_folder_id: z.string().optional().describe("Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead."),
    name: z.string().optional().describe("The last component of the path (including extension). This never contains a slash."),
    path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted."),
    path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted."),
  }).optional().describe("Metadata for a file or folder.\nname: The last component of the path (including extension). This never contains a slash.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted.\npath_display: The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted.\nparent_shared_folder_id: Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead.\n"),
}).describe("metadata: Metadata of the file or folder.\ncopy_reference: A copy reference to the file or folder.\nexpires: The expiration date of the copy reference. This value is currently set to be far enough in the future so that expiration is effectively not an issue.\n")

export const filesCopyReferenceGet = pikkuSessionlessFunc({
  description: "Get a copy reference to a file or folder. This reference string can be used to save that file or folder to another user's Dropbox by passing it to :route:`copy_reference/save`.",
  input: FilesCopyReferenceGetInput,
  output: FilesCopyReferenceGetOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/copy_reference/get", data) as any
  },
})
