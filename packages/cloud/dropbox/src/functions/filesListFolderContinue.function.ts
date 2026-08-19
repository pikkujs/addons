import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesListFolderContinueInput = z.object({
  cursor: z.string().optional().describe("The cursor returned by your last call to :route:`list_folder` or :route:`list_folder/continue`."),
})

export const FilesListFolderContinueOutput = z.object({
  cursor: z.string().optional().describe("Pass the cursor into :route:`list_folder/continue` to see what's changed in the folder since your previous query."),
  has_more: z.boolean().optional().describe("If true, then there are more entries available. Pass the cursor to :route:`list_folder/continue` to retrieve the rest."),
  entries: z.array(z.object({
    parent_shared_folder_id: z.string().optional().describe("Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead."),
    name: z.string().optional().describe("The last component of the path (including extension). This never contains a slash."),
    path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted."),
    path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted."),
  })).optional().describe("The files and (direct) subfolders in the folder."),
}).describe("entries: The files and (direct) subfolders in the folder.\ncursor: Pass the cursor into :route:`list_folder/continue` to see what's changed in the folder since your previous query.\nhas_more: If true, then there are more entries available. Pass the cursor to :route:`list_folder/continue` to retrieve the rest.\n")

export const filesListFolderContinue = pikkuSessionlessFunc({
  description: "Once a cursor has been retrieved from :route:`list_folder`, use this to paginate through all files and retrieve updates to the folder, following the same rules as documented for :route:`list_folder`.",
  input: FilesListFolderContinueInput,
  output: FilesListFolderContinueOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/list_folder/continue", data) as any
  },
})
