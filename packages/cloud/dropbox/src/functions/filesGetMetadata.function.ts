import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesGetMetadataInput = z.object({
  path: z.string().optional().describe("The path of a file or folder on Dropbox."),
  include_has_explicit_shared_members: z.boolean().optional().describe("If true, the results will include a flag for each file indicating whether or not  that file has any explicit members."),
  include_property_groups: z.object({
  filter_some: z.array(z.string()).optional().describe("Only templates with an ID in the supplied list will be returned (a subset of templates will be returned)."),
  ".tag": z.enum(["filter_some", "other"]).optional(),
}).optional().describe("filter_some: Only templates with an ID in the supplied list will be returned (a subset of templates will be returned).\nother: None\n"),
  include_deleted: z.boolean().optional().describe("If true, :type:`DeletedMetadata` will be returned for deleted file or folder, otherwise :field:`LookupError.not_found` will be returned."),
  include_media_info: z.boolean().optional().describe("If true, :field:`FileMetadata.media_info` is set for photo and video."),
})

export const FilesGetMetadataOutput = z.object({
  parent_shared_folder_id: z.string().optional().describe("Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead."),
  name: z.string().optional().describe("The last component of the path (including extension). This never contains a slash."),
  path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted."),
  path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted."),
}).describe("Metadata for a file or folder.\nname: The last component of the path (including extension). This never contains a slash.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted.\npath_display: The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted.\nparent_shared_folder_id: Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead.\n")

export const filesGetMetadata = pikkuSessionlessFunc({
  description: "Returns the metadata for a file or folder.\nNote: Metadata for the root folder is unsupported.",
  input: FilesGetMetadataInput,
  output: FilesGetMetadataOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/get_metadata", data) as any
  },
})
