import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilesCreateFolderInput = z.object({
  path: z.string().optional().describe("Path in the user's Dropbox to create."),
  autorename: z.boolean().optional().describe("If there's a conflict, have the Dropbox server try to autorename the folder to avoid the conflict."),
})

export const FilesCreateFolderOutput = z.object({
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
}).describe("name: The last component of the path (including extension). This never contains a slash.\nid: A unique identifier for the folder.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted.\npath_display: The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted.\nparent_shared_folder_id: Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead.\nshared_folder_id: Please use :field:`sharing_info` instead.\nsharing_info: Set if the folder is contained in a shared folder or is a shared folder mount point.\nproperty_groups: Additional information if the file has custom properties with the property template specified. Note that only properties associated with user-owned templates, not team-owned templates, can be attached to folders.\n")

export const filesCreateFolder = pikkuSessionlessFunc({
  description: "Create a folder at a given path.",
  input: FilesCreateFolderInput,
  output: FilesCreateFolderOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/create_folder", data) as any
  },
})
