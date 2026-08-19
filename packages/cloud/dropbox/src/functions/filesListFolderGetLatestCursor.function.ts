import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesListFolderGetLatestCursorInput = z.object({
  shared_link: z.object({
  url: z.string().optional().describe("Shared link url."),
  password: z.string().optional().describe("Password for the shared link."),
}).optional().describe("url: Shared link url.\npassword: Password for the shared link.\n"),
  include_property_groups: z.object({
  filter_some: z.array(z.string()).optional().describe("Only templates with an ID in the supplied list will be returned (a subset of templates will be returned)."),
  ".tag": z.enum(["filter_some", "other"]).optional(),
}).optional().describe("filter_some: Only templates with an ID in the supplied list will be returned (a subset of templates will be returned).\nother: None\n"),
  recursive: z.boolean().optional().describe("If true, the list folder operation will be applied recursively to all subfolders and the response will contain contents of all subfolders."),
  include_has_explicit_shared_members: z.boolean().optional().describe("If true, the results will include a flag for each file indicating whether or not  that file has any explicit members."),
  include_deleted: z.boolean().optional().describe("If true, the results will include entries for files and folders that used to exist but were deleted."),
  limit: z.number().optional().describe("The maximum number of results to return per request. Note: This is an approximate number and there can be slightly more entries returned in some cases."),
  include_media_info: z.boolean().optional().describe("If true, :field:`FileMetadata.media_info` is set for photo and video."),
  include_mounted_folders: z.boolean().optional().describe("If true, the results will include entries under mounted folders which includes app folder, shared folder and team folder."),
  path: z.string().optional().describe("A unique identifier for the file."),
})

export const FilesListFolderGetLatestCursorOutput = z.object({
  cursor: z.string().optional().describe("Pass the cursor into :route:`list_folder/continue` to see what's changed in the folder since your previous query."),
}).describe("cursor: Pass the cursor into :route:`list_folder/continue` to see what's changed in the folder since your previous query.\n")

export const filesListFolderGetLatestCursor = pikkuSessionlessFunc({
  description: "A way to quickly get a cursor for the folder's state. Unlike :route:`list_folder`, :route:`list_folder/get_latest_cursor` doesn't return any entries. This endpoint is for app which only needs to know about new files and modifications and doesn't need to know about files that already exist in Dropbox.",
  input: FilesListFolderGetLatestCursorInput,
  output: FilesListFolderGetLatestCursorOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/list_folder/get_latest_cursor", data) as any
  },
})
