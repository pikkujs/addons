import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesGetThumbnailInput = z.object({
  path: z.string().optional().describe("The path to the image file you want to thumbnail."),
  size: z.object({
  ".tag": z.enum(["w32h32", "w64h64", "w128h128", "w256h256", "w480h320", "w640h480", "w960h640", "w1024h768", "w2048h1536"]).optional(),
}).optional().describe("w32h32: 32 by 32 px.\nw64h64: 64 by 64 px.\nw128h128: 128 by 128 px.\nw256h256: 256 by 256 px.\nw480h320: 480 by 320 px.\nw640h480: 640 by 480 px.\nw960h640: 960 by 640 px.\nw1024h768: 1024 by 768 px.\nw2048h1536: 2048 by 1536 px.\n"),
  mode: z.object({
  ".tag": z.enum(["strict", "bestfit", "fitone_bestfit"]).optional(),
}).optional().describe("strict: Scale down the image to fit within the given size.\nbestfit: Scale down the image to fit within the given size or its transpose.\nfitone_bestfit: Scale down the image to completely cover the given size or its transpose.\n"),
  format: z.object({
  ".tag": z.enum(["jpeg", "png"]).optional(),
}).optional().describe("jpeg: None\npng: None\n"),
})

export const FilesGetThumbnailOutput = z.object({
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
}).describe("name: The last component of the path (including extension). This never contains a slash.\nid: A unique identifier for the file.\nclient_modified: For files, this is the modification time set by the desktop client when the file was added to Dropbox. Since this time is not verified (the Dropbox server stores whatever the desktop client sends up), this should only be used for display purposes (such as sorting) and not, for example, to determine if a file has changed or not.\nserver_modified: The last time the file was modified on Dropbox.\nrev: A unique identifier for the current revision of a file. This field is the same rev as elsewhere in the API and can be used to detect changes and avoid conflicts.\nsize: The file size in bytes.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted.\npath_display: The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted.\nparent_shared_folder_id: Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead.\nmedia_info: Additional information if the file is a photo or video.\nsymlink_info: Set if this file is a symlink.\nsharing_info: Set if this file is contained in a shared folder.\nproperty_groups: Additional information if the file has custom properties with the property template specified.\nhas_explicit_shared_members: This flag will only be present if include_has_explicit_shared_members  is true in :route:`list_folder` or :route:`get_metadata`. If this  flag is present, it will be true if this file has any explicit shared  members. This is different from sharing_info in that this could be true  in the case where a file has explicit members but is not contained within  a shared folder.\ncontent_hash: A hash of the file content. This field can be used to verify data integrity. For more information see our :link:`Content hash /developers/reference/content-hash` page.\n")

export const filesGetThumbnail = pikkuSessionlessFunc({
  description: "Get a thumbnail for an image.\nThis method currently supports files with the following file extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos that are larger than 20MB in size won't be converted to a thumbnail.",
  input: FilesGetThumbnailInput,
  output: FilesGetThumbnailOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/get_thumbnail", data) as any
  },
})
