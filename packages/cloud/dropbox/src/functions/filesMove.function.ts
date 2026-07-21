import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesMoveInput = z.object({
  allow_ownership_transfer: z.boolean().optional().describe("Allow moves by owner even if it would result in an ownership transfer for the content being moved. This does not apply to copies."),
  from_path: z.string().optional().describe("Path in the user's Dropbox to be copied or moved."),
  to_path: z.string().optional().describe("Path in the user's Dropbox that is the destination."),
  autorename: z.boolean().optional().describe("If there's a conflict, have the Dropbox server try to autorename the file to avoid the conflict."),
  allow_shared_folder: z.boolean().optional().describe("If true, :route:`copy` will copy contents in shared folder, otherwise :field:`RelocationError.cant_copy_shared_folder` will be returned if :field:`from_path` contains shared folder. This field is always true for :route:`move`."),
})

export const FilesMoveOutput = z.object({
  parent_shared_folder_id: z.string().optional().describe("Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead."),
  name: z.string().optional().describe("The last component of the path (including extension). This never contains a slash."),
  path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted."),
  path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted."),
}).describe("Metadata for a file or folder.\nname: The last component of the path (including extension). This never contains a slash.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted.\npath_display: The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted.\nparent_shared_folder_id: Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead.\n")

export const filesMove = pikkuSessionlessFunc({
  description: "Move a file or folder to a different location in the user's Dropbox.\nIf the source path is a folder all its contents will be moved.",
  input: FilesMoveInput,
  output: FilesMoveOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/move", data) as any
  },
})
