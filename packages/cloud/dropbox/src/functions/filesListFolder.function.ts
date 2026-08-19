import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesListFolderInput = z.object({
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

export const FilesListFolderOutput = z.object({
  cursor: z.string().optional().describe("Pass the cursor into :route:`list_folder/continue` to see what's changed in the folder since your previous query."),
  has_more: z.boolean().optional().describe("If true, then there are more entries available. Pass the cursor to :route:`list_folder/continue` to retrieve the rest."),
  entries: z.array(z.object({
    parent_shared_folder_id: z.string().optional().describe("Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead."),
    name: z.string().optional().describe("The last component of the path (including extension). This never contains a slash."),
    path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted."),
    path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted."),
  })).optional().describe("The files and (direct) subfolders in the folder."),
}).describe("entries: The files and (direct) subfolders in the folder.\ncursor: Pass the cursor into :route:`list_folder/continue` to see what's changed in the folder since your previous query.\nhas_more: If true, then there are more entries available. Pass the cursor to :route:`list_folder/continue` to retrieve the rest.\n")

export const filesListFolder = pikkuSessionlessFunc({
  description: "Starts returning the contents of a folder. If the result's :field:`ListFolderResult.has_more` field is :val:`true`, call :route:`list_folder/continue` with the returned :field:`ListFolderResult.cursor` to retrieve more entries.\nIf you're using :field:`ListFolderArg.recursive` set to :val:`true` to keep a local cache of the contents of a Dropbox account, iterate through each entry in order and process them as follows to keep your local state in sync:\nFor each :type:`FileMetadata`, store the new entry at the given path in your local state. If the required parent folders don't exist yet, create them. If there's already something else at the given path, replace it and remove all its children.\nFor each :type:`FolderMetadata`, store the new entry at the given path in your local state. If the required parent folders don't exist yet, create them. If there's already something else at the given path, replace it but leave the children as they are. Check the new entry's :field:`FolderSharingInfo.read_only` and set all its children's read-only statuses to match.\nFor each :type:`DeletedMetadata`, if your local state has something at the given path, remove it and all its children. If there's nothing at the given path, ignore this entry.\nNote: :type:`auth.RateLimitError` may be returned if multiple :route:`list_folder` or :route:`list_folder/continue` calls with same parameters are made simultaneously by same API app for same user. If your app implements retry logic, please hold off the retry until the previous request finishes.",
  input: FilesListFolderInput,
  output: FilesListFolderOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/list_folder", data) as any
  },
})
