import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FilesUploadSessionFinishBatchInput = z.object({
  entries: z.array(z.object({
  cursor: z.object({
    session_id: z.string().optional().describe("The upload session ID (returned by :route:`upload_session/start`)."),
    offset: z.number().optional().describe("The amount of data that has been uploaded so far. We use this to make sure upload data isn't lost or duplicated in the event of a network error."),
  }).optional().describe("session_id: The upload session ID (returned by :route:`upload_session/start`).\noffset: The amount of data that has been uploaded so far. We use this to make sure upload data isn't lost or duplicated in the event of a network error.\n"),
  commit: z.object({
    autorename: z.boolean().optional().describe("If there's a conflict, as determined by :field:`mode`, have the Dropbox server try to autorename the file to avoid conflict."),
    mute: z.boolean().optional().describe("Normally, users are made aware of any file modifications in their Dropbox account via notifications in the client software. If :val:`true`, this tells the clients that this modification shouldn't result in a user notification."),
    client_modified: z.string().optional().describe("The value to store as the :field:`client_modified` timestamp. Dropbox automatically records the time at which the file was written to the Dropbox servers. It can also record an additional timestamp, provided by Dropbox desktop clients, mobile clients, and API apps of when the file was actually created or modified."),
    mode: z.object({
      ".tag": z.enum(["add", "overwrite", "update"]).optional(),
      update: z.string().optional().describe("Overwrite if the given \"rev\" matches the existing file's \"rev\". The autorename strategy is to append the string \"conflicted copy\" to the file name. For example, \"document.txt\" might become \"document (conflicted copy).txt\" or \"document (Panda's conflicted copy).txt\"."),
    }).optional().describe("Your intent when writing a file to some path. This is used to determine what constitutes a conflict and what the autorename strategy is.\nIn some situations, the conflict behavior is identical: (a) If the target path doesn't refer to anything, the file is always written; no conflict. (b) If the target path refers to a folder, it's always a conflict. (c) If the target path refers to a file with identical contents, nothing gets written; no conflict.\nThe conflict checking differs in the case where there's a file at the target path with contents different from the contents you're trying to write.\nadd: Do not overwrite an existing file if there is a conflict. The autorename strategy is to append a number to the file name. For example, \"document.txt\" might become \"document (2).txt\".\noverwrite: Always overwrite the existing file. The autorename strategy is the same as it is for :field:`add`.\nupdate: Overwrite if the given \"rev\" matches the existing file's \"rev\". The autorename strategy is to append the string \"conflicted copy\" to the file name. For example, \"document.txt\" might become \"document (conflicted copy).txt\" or \"document (Panda's conflicted copy).txt\".\n"),
    path: z.string().optional().describe("Path in the user's Dropbox to save the file."),
    property_groups: z.array(z.object({
      fields: z.array(z.object({
        name: z.string().optional().describe("Key of the property field associated with a file and template. Keys can be up to 256 bytes."),
        value: z.string().optional().describe("Value of the property field associated with a file and template. Values can be up to 1024 bytes."),
      })).optional().describe("The actual properties associated with the template. There can be up to 32 property types per template."),
      template_id: z.string().optional().describe("A unique identifier for the associated template."),
    })).optional().describe("List of custom properties to add to file."),
  }).optional().describe("path: Path in the user's Dropbox to save the file.\nmode: Selects what to do if the file already exists.\nautorename: If there's a conflict, as determined by :field:`mode`, have the Dropbox server try to autorename the file to avoid conflict.\nclient_modified: The value to store as the :field:`client_modified` timestamp. Dropbox automatically records the time at which the file was written to the Dropbox servers. It can also record an additional timestamp, provided by Dropbox desktop clients, mobile clients, and API apps of when the file was actually created or modified.\nmute: Normally, users are made aware of any file modifications in their Dropbox account via notifications in the client software. If :val:`true`, this tells the clients that this modification shouldn't result in a user notification.\nproperty_groups: List of custom properties to add to file.\n"),
})).optional().describe("Commit information for each file in the batch."),
})

export const FilesUploadSessionFinishBatchOutput = z.object({
  ".tag": z.enum(["async_job_id", "complete", "other"]).optional(),
  async_job_id: z.string().optional().describe("This response indicates that the processing is asynchronous. The string is an id that can be used to obtain the status of the asynchronous job."),
  complete: z.object({
    entries: z.array(z.object({
      failure: z.object({
        properties_error: z.object({
          path: z.object({
            malformed_path: z.string().optional(),
            ".tag": z.enum(["malformed_path", "not_found", "not_file", "not_folder", "restricted_content", "other"]).optional(),
          }).optional().describe("malformed_path: None\nnot_found: There is nothing at the given path.\nnot_file: We were expecting a file, but the given path refers to something that isn't a file.\nnot_folder: We were expecting a folder, but the given path refers to something that isn't a folder.\nrestricted_content: The file cannot be transferred because the content is restricted.  For example, sometimes there are legal restrictions due to copyright claims.\nother: None\n"),
          ".tag": z.enum(["template_not_found", "restricted_content", "other", "path", "unsupported_folder", "property_field_too_large", "does_not_fit_template"]).optional(),
          template_not_found: z.string().optional().describe("Template does not exist for the given identifier."),
        }).optional().describe("template_not_found: Template does not exist for the given identifier.\nrestricted_content: You do not have permission to modify this template.\nother: None\npath: None\nunsupported_folder: This folder cannot be tagged. Tagging folders is not supported for team-owned templates.\nproperty_field_too_large: One or more of the supplied property field values is too large.\ndoes_not_fit_template: One or more of the supplied property fields does not conform to the template specifications.\n"),
        path: z.object({
          malformed_path: z.string().optional(),
          ".tag": z.enum(["malformed_path", "conflict", "no_write_permission", "insufficient_space", "disallowed_name", "team_folder", "too_many_write_operations", "other"]).optional(),
          conflict: z.object({
            ".tag": z.enum(["file", "folder", "file_ancestor", "other"]).optional(),
          }).optional().describe("file: There's a file in the way.\nfolder: There's a folder in the way.\nfile_ancestor: There's a file at an ancestor path, so we couldn't create the required parent folders.\nother: None\n"),
        }).optional().describe("malformed_path: None\nconflict: Couldn't write to the target path because there was something in the way.\nno_write_permission: The user doesn't have permissions to write to the target location.\ninsufficient_space: The user doesn't have enough available space (bytes) to write more data.\ndisallowed_name: Dropbox will not save the file or folder because of its name.\nteam_folder: This endpoint cannot move or delete team folders.\ntoo_many_write_operations: There are too many write operations in user's Dropbox. Please retry this request.\nother: None\n"),
        ".tag": z.enum(["lookup_failed", "path", "properties_error", "too_many_shared_folder_targets", "too_many_write_operations", "other"]).optional(),
        lookup_failed: z.object({
          ".tag": z.enum(["not_found", "incorrect_offset", "closed", "not_closed", "too_large", "other"]).optional(),
          incorrect_offset: z.object({
            correct_offset: z.number().optional().describe("The offset up to which data has been collected."),
          }).optional().describe("correct_offset: The offset up to which data has been collected.\n"),
        }).optional().describe("not_found: The upload session ID was not found or has expired. Upload sessions are valid for 48 hours.\nincorrect_offset: The specified offset was incorrect. See the value for the correct offset. This error may occur when a previous request was received and processed successfully but the client did not receive the response, e.g. due to a network error.\nclosed: You are attempting to append data to an upload session that has alread been closed (i.e. committed).\nnot_closed: The session must be closed before calling upload_session/finish_batch.\ntoo_large: You can not append to the upload session because the size of a file should not reach the max file size limit (i.e. 350GB).\nother: None\n"),
      }).optional().describe("lookup_failed: The session arguments are incorrect; the value explains the reason.\npath: Unable to save the uploaded contents to a file. Data has already been appended to the upload session. Please retry with empty data body and updated offset.\nproperties_error: The supplied property group is invalid. The file has uploaded without property groups.\ntoo_many_shared_folder_targets: The batch request commits files into too many different shared folders. Please limit your batch request to files contained in a single shared folder.\ntoo_many_write_operations: There are too many write operations happening in the user's Dropbox. You should retry uploading this file.\nother: None\n"),
      ".tag": z.enum(["success", "failure"]).optional(),
      success: z.object({
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
      }).optional().describe("name: The last component of the path (including extension). This never contains a slash.\nid: A unique identifier for the file.\nclient_modified: For files, this is the modification time set by the desktop client when the file was added to Dropbox. Since this time is not verified (the Dropbox server stores whatever the desktop client sends up), this should only be used for display purposes (such as sorting) and not, for example, to determine if a file has changed or not.\nserver_modified: The last time the file was modified on Dropbox.\nrev: A unique identifier for the current revision of a file. This field is the same rev as elsewhere in the API and can be used to detect changes and avoid conflicts.\nsize: The file size in bytes.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will be null if the file or folder is not mounted.\npath_display: The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1, and at least the last path component will have the correct casing. Changes to only the casing of paths won't be returned by :route:`list_folder/continue`. This field will be null if the file or folder is not mounted.\nparent_shared_folder_id: Please use :field:`FileSharingInfo.parent_shared_folder_id` or :field:`FolderSharingInfo.parent_shared_folder_id` instead.\nmedia_info: Additional information if the file is a photo or video.\nsymlink_info: Set if this file is a symlink.\nsharing_info: Set if this file is contained in a shared folder.\nproperty_groups: Additional information if the file has custom properties with the property template specified.\nhas_explicit_shared_members: This flag will only be present if include_has_explicit_shared_members  is true in :route:`list_folder` or :route:`get_metadata`. If this  flag is present, it will be true if this file has any explicit shared  members. This is different from sharing_info in that this could be true  in the case where a file has explicit members but is not contained within  a shared folder.\ncontent_hash: A hash of the file content. This field can be used to verify data integrity. For more information see our :link:`Content hash /developers/reference/content-hash` page.\n"),
    })).optional().describe("Commit result for each file in the batch."),
  }).optional().describe("entries: Commit result for each file in the batch.\n"),
}).describe("Result returned by :route:`upload_session/finish_batch` that may either launch an asynchronous job or complete synchronously.\nasync_job_id: This response indicates that the processing is asynchronous. The string is an id that can be used to obtain the status of the asynchronous job.\ncomplete: None\nother: None\n")

export const filesUploadSessionFinishBatch = pikkuSessionlessFunc({
  description: "This route helps you commit many files at once into a user's Dropbox. Use :route:`upload_session/start` and :route:`upload_session/append_v2` to upload file contents. We recommend uploading many files in parallel to increase throughput. Once the file contents have been uploaded, rather than calling :route:`upload_session/finish`, use this route to finish all your upload sessions in a single request.\n:field:`UploadSessionStartArg.close` or :field:`UploadSessionAppendArg.close` needs to be true for the last :route:`upload_session/start` or :route:`upload_session/append_v2` call. The maximum size of a file one can upload to an upload session is 350 GB.\nThis route will return a job_id immediately and do the async commit job in background. Use :route:`upload_session/finish_batch/check` to check the job status.\nFor the same account, this route should be executed serially. That means you should not start the next job before current job finishes. We allow up to 1000 entries in a single request.",
  input: FilesUploadSessionFinishBatchInput,
  output: FilesUploadSessionFinishBatchOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/files/upload_session/finish_batch", data) as any
  },
})
