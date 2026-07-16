import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesListRevisionsInput = z.object({
  path: z.string().optional().describe("The path to the file you want to see the revisions of."),
  limit: z.number().optional().describe("The maximum number of revision entries returned."),
  mode: z.object({
  ".tag": z.enum(["path", "id", "other"]).optional(),
}).optional().describe("path: Returns revisions with the same file path as identified by the latest file entry at the given file path or id.\nid: Returns revisions with the same file id as identified by the latest file entry at the given file path or id.\nother: None\n"),
})

export const FilesListRevisionsOutput = z.object({
  is_deleted: z.boolean().optional().describe("If the file identified by the latest revision in the response is either deleted or moved."),
  server_deleted: z.string().optional().describe("The time of deletion if the file was deleted."),
  entries: z.array(z.object({
    parent_shared_folder_id: z.string().optional().describe("Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead."),
    name: z.string().optional().describe("The last component of the path (including extension). This never contains a slash."),
    property_groups: z.array(z.object({
      fields: z.array(z.object({
        name: z.string().optional().describe("Key of the property field associated with a file and template. Keys can be up to 256 bytes."),
        value: z.string().optional().describe("Value of the property field associated with a file and template. Values can be up to 1024 bytes."),
      })).optional().describe("The actual properties associated with the template. There can be up to 32 property types per template."),
      template_id: z.string().optional().describe("A unique identifier for the associated template."),
    })).optional().describe("Additional information if the file has custom properties with the property template specified."),
    rev: z.string().optional().describe("A unique identifier for the current revision of a file. This field is the same rev as elsewhere in the API and can be used to detect changes and avoid conflicts."),
    client_modified: z.string().optional().describe("For files, this is the modification time set by the desktop client when the file was added to Dropbox. Since this time is not verified (the Dropbox server stores whatever the desktop client sends up), this should only be used for display purposes (such as sorting) and not, for example, to determine if a file has changed or not."),
    symlink_info: z.object({
      target: z.string().optional().describe("The target this symlink points to."),
    }).optional().describe("target: The target this symlink points to.\n"),
    path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted."),
    has_explicit_shared_members: z.boolean().optional().describe("This flag will only be present if include_has_explicit_shared_members  is true in :route:`list_folder` or :route:`get_metadata`. If this  flag is present, it will be true if this file has any explicit shared  members. This is different from sharing_info in that this could be true  in the case where a file has explicit members but is not contained within  a shared folder."),
    path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted."),
    server_modified: z.string().optional().describe("The last time the file was modified on Dropbox."),
    sharing_info: z.object({
      read_only: z.boolean().optional().describe("True if the file or folder is inside a read-only shared folder."),
      parent_shared_folder_id: z.string().optional().describe("ID of shared folder that holds this file."),
      modified_by: z.string().optional().describe("The last user who modified the file. This field will be null if the user's account has been deleted."),
    }).optional().describe("Sharing info for a file which is contained by a shared folder.\nread_only: True if the file or folder is inside a read-only shared folder.\nparent_shared_folder_id: ID of shared folder that holds this file.\nmodified_by: The last user who modified the file. This field will be null if the user's account has been deleted.\n"),
    media_info: z.object({
      ".tag": z.enum(["pending", "metadata"]).optional(),
      metadata: z.object({
        dimensions: z.object({
          width: z.number().optional().describe("Width of the photo/video."),
          height: z.number().optional().describe("Height of the photo/video."),
        }).optional().describe("Dimensions for a photo or video.\nheight: Height of the photo/video.\nwidth: Width of the photo/video.\n"),
        location: z.object({
          latitude: z.number().optional().describe("Latitude of the GPS coordinates."),
          longitude: z.number().optional().describe("Longitude of the GPS coordinates."),
        }).optional().describe("GPS coordinates for a photo or video.\nlatitude: Latitude of the GPS coordinates.\nlongitude: Longitude of the GPS coordinates.\n"),
        time_taken: z.string().optional().describe("The timestamp when the photo/video is taken."),
      }).optional().describe("Metadata for a photo or video.\ndimensions: Dimension of the photo/video.\nlocation: The GPS coordinate of the photo/video.\ntime_taken: The timestamp when the photo/video is taken.\n"),
    }).optional().describe("pending: Indicate the photo/video is still under processing and metadata is not available yet.\nmetadata: The metadata for the photo/video.\n"),
    content_hash: z.string().optional().describe("A hash of the file content. This field can be used to verify data integrity. For more information see our :link:`Content hash /developers/reference/content-hash` page."),
    id: z.string().optional().describe("A unique identifier for the file."),
    size: z.number().optional().describe("The file size in bytes."),
  })).optional().describe("The revisions for the file. Only revisions that are not deleted will show up here."),
}).describe("is_deleted: If the file identified by the latest revision in the response is either deleted or moved.\nentries: The revisions for the file. Only revisions that are not deleted will show up here.\nserver_deleted: The time of deletion if the file was deleted.\n")

export const filesListRevisions = pikkuSessionlessFunc({
  description: "Returns revisions for files based on a file path or a file id. The file path or file id is identified from the latest file entry at the given file path or id. This end point allows your app to query either by file path or file id by setting the mode parameter appropriately.\nIn the :field:`ListRevisionsMode.path` (default) mode, all revisions at the same file path as the latest file entry are returned. If revisions with the same file id are desired, then mode must be set to :field:`ListRevisionsMode.id`. The :field:`ListRevisionsMode.id` mode is useful to retrieve revisions for a given file across moves or renames.",
  input: FilesListRevisionsInput,
  output: FilesListRevisionsOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/list_revisions", data) as any
  },
})
