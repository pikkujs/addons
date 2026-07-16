import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesSearchInput = z.object({
  start: z.number().optional().describe("The starting index within the search results (used for paging)."),
  max_results: z.number().optional().describe("The maximum number of search results to return."),
  path: z.string().optional().describe("The path in the user's Dropbox to search. Should probably be a folder."),
  mode: z.object({
  ".tag": z.enum(["filename", "filename_and_content", "deleted_filename"]).optional(),
}).optional().describe("filename: Search file and folder names.\nfilename_and_content: Search file and folder names as well as file contents.\ndeleted_filename: Search for deleted file and folder names.\n"),
  query: z.string().optional().describe("The string to search for. The search string is split on spaces into multiple tokens. For file name searching, the last token is used for prefix matching (i.e. \"bat c\" matches \"bat cave\" but not \"batman car\")."),
})

export const FilesSearchOutput = z.object({
  matches: z.array(z.object({
    match_type: z.object({
      ".tag": z.enum(["filename", "content", "both"]).optional(),
    }).optional().describe("Indicates what type of match was found for a given item.\nfilename: This item was matched on its file or folder name.\ncontent: This item was matched based on its file contents.\nboth: This item was matched based on both its contents and its file name.\n"),
    metadata: z.object({
      parent_shared_folder_id: z.string().optional().describe("Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead."),
      name: z.string().optional().describe("The last component of the path (including extension). This never contains a slash."),
      path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted."),
      path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted."),
    }).optional().describe("Metadata for a file or folder.\nname: The last component of the path (including extension). This never contains a slash.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted.\npath_display: The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted.\nparent_shared_folder_id: Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead.\n"),
  })).optional().describe("A list (possibly empty) of matches for the query."),
  start: z.number().optional().describe("Used for paging. Value to set the start argument to when calling :route:`search` to fetch the next page of results."),
  more: z.boolean().optional().describe("Used for paging. If true, indicates there is another page of results available that can be fetched by calling :route:`search` again."),
}).describe("matches: A list (possibly empty) of matches for the query.\nmore: Used for paging. If true, indicates there is another page of results available that can be fetched by calling :route:`search` again.\nstart: Used for paging. Value to set the start argument to when calling :route:`search` to fetch the next page of results.\n")

export const filesSearch = pikkuSessionlessFunc({
  description: "Searches for files and folders.\nNote: Recent changes may not immediately be reflected in search results due to a short delay in indexing.",
  input: FilesSearchInput,
  output: FilesSearchOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/search", data) as any
  },
})
