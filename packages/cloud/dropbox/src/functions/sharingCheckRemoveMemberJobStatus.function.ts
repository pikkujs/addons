import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingCheckRemoveMemberJobStatusInput = z.object({
  async_job_id: z.string().optional().describe("Id of the asynchronous job. This is the value of a response returned from the method that launched the job."),
})

export const SharingCheckRemoveMemberJobStatusOutput = z.object({
  failed: z.object({
    access_error: z.object({
      ".tag": z.enum(["invalid_id", "not_a_member", "email_unverified", "unmounted", "other"]).optional(),
    }).optional().describe("There is an error accessing the shared folder.\ninvalid_id: This shared folder ID is invalid.\nnot_a_member: The user is not a member of the shared folder thus cannot access it.\nemail_unverified: Never set.\nunmounted: The shared folder is unmounted.\nother: None\n"),
    ".tag": z.enum(["access_error", "member_error", "folder_owner", "group_access", "team_folder", "no_permission", "too_many_files", "other"]).optional(),
    member_error: z.object({
      ".tag": z.enum(["invalid_dropbox_id", "not_a_member", "no_explicit_access", "other"]).optional(),
      no_explicit_access: z.object({
        access_level: z.object({
          ".tag": z.enum(["owner", "editor", "viewer", "viewer_no_comment", "other"]).optional(),
        }).optional().describe("Defines the access levels for collaborators.\nowner: The collaborator is the owner of the shared folder. Owners can view and edit the shared folder as well as set the folder's policies using :route:`update_folder_policy`.\neditor: The collaborator can both view and edit the shared folder.\nviewer: The collaborator can only view the shared folder.\nviewer_no_comment: The collaborator can only view the shared folder and does not have any access to comments.\nother: None\n"),
        access_details: z.array(z.object({
          path: z.string().optional().describe("The full path to the parent shared folder relative to the acting user's root."),
          shared_folder_id: z.string().optional().describe("The identifier of the parent shared folder."),
          folder_name: z.string().optional().describe("Display name for the folder."),
          permissions: z.array(z.object({
            action: z.object({
              ".tag": z.enum(["leave_a_copy", "make_editor", "make_owner", "make_viewer", "make_viewer_no_comment", "remove", "other"]).optional(),
            }).optional().describe("Actions that may be taken on members of a shared folder.\nleave_a_copy: Allow the member to keep a copy of the folder when removing.\nmake_editor: Make the member an editor of the folder.\nmake_owner: Make the member an owner of the folder.\nmake_viewer: Make the member a viewer of the folder.\nmake_viewer_no_comment: Make the member a viewer of the folder without commenting permissions.\nremove: Remove the member from the folder.\nother: None\n"),
            reason: z.object({
              insufficient_plan: z.object({
                message: z.string().optional().describe("A message to tell the user to upgrade in order to support expected action."),
                upsell_url: z.string().optional().describe("A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade."),
              }).optional().describe("message: A message to tell the user to upgrade in order to support expected action.\nupsell_url: A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade.\n"),
              ".tag": z.enum(["user_not_same_team_as_owner", "user_not_allowed_by_owner", "target_is_indirect_member", "target_is_owner", "target_is_self", "target_not_active", "folder_is_limited_team_folder", "owner_not_on_team", "permission_denied", "restricted_by_team", "user_account_type", "user_not_on_team", "folder_is_inside_shared_folder", "restricted_by_parent_folder", "insufficient_plan", "other"]).optional(),
            }).optional().describe("Possible reasons the user is denied a permission.\nuser_not_same_team_as_owner: User is not on the same team as the folder owner.\nuser_not_allowed_by_owner: User is prohibited by the owner from taking the action.\ntarget_is_indirect_member: Target is indirectly a member of the folder, for example by being part of a group.\ntarget_is_owner: Target is the owner of the folder.\ntarget_is_self: Target is the user itself.\ntarget_not_active: Target is not an active member of the team.\nfolder_is_limited_team_folder: Folder is team folder for a limited team.\nowner_not_on_team: The content owner needs to be on a Dropbox team to perform this action.\npermission_denied: The user does not have permission to perform this action on the link.\nrestricted_by_team: The user's team policy prevents performing this action on the link.\nuser_account_type: The user's account type does not support this action.\nuser_not_on_team: The user needs to be on a Dropbox team to perform this action.\nfolder_is_inside_shared_folder: Folder is inside of another shared folder.\nrestricted_by_parent_folder: Policy cannot be changed due to restrictions from parent folder.\ninsufficient_plan: None\nother: None\n"),
            allow: z.boolean().optional().describe("True if the user is allowed to take the action."),
          })).optional().describe("The user's permissions for the parent shared folder."),
        })).optional().describe("The parent folders that a member has access to. The field is present if the user has access to the first parent folder where the member gains access."),
        warning: z.string().optional().describe("A localized string with additional information about why the user has this access level to the content."),
      }).optional().describe("Contains information about a member's access level to content after an operation.\naccess_level: The member still has this level of access to the content through a parent folder.\nwarning: A localized string with additional information about why the user has this access level to the content.\naccess_details: The parent folders that a member has access to. The field is present if the user has access to the first parent folder where the member gains access.\n"),
    }).optional().describe("invalid_dropbox_id: The target dropbox_id is invalid.\nnot_a_member: The target dropbox_id is not a member of the shared folder.\nno_explicit_access: The target member only has inherited access to the shared folder.\nother: None\n"),
  }).optional().describe("access_error: None\nmember_error: None\nfolder_owner: The target user is the owner of the shared folder. You can't remove this user until ownership has been transferred to another member.\ngroup_access: The target user has access to the shared folder via a group.\nteam_folder: This action cannot be performed on a team shared folder.\nno_permission: The current user does not have permission to perform this action.\ntoo_many_files: This shared folder has too many files for leaving a copy. You can still remove this user without leaving a copy.\nother: None\n"),
  ".tag": z.enum(["in_progress", "complete", "failed"]).optional(),
  complete: z.object({
    access_level: z.object({
      ".tag": z.enum(["owner", "editor", "viewer", "viewer_no_comment", "other"]).optional(),
    }).optional().describe("Defines the access levels for collaborators.\nowner: The collaborator is the owner of the shared folder. Owners can view and edit the shared folder as well as set the folder's policies using :route:`update_folder_policy`.\neditor: The collaborator can both view and edit the shared folder.\nviewer: The collaborator can only view the shared folder.\nviewer_no_comment: The collaborator can only view the shared folder and does not have any access to comments.\nother: None\n"),
    access_details: z.array(z.object({
      path: z.string().optional().describe("The full path to the parent shared folder relative to the acting user's root."),
      shared_folder_id: z.string().optional().describe("The identifier of the parent shared folder."),
      folder_name: z.string().optional().describe("Display name for the folder."),
      permissions: z.array(z.object({
        action: z.object({
          ".tag": z.enum(["leave_a_copy", "make_editor", "make_owner", "make_viewer", "make_viewer_no_comment", "remove", "other"]).optional(),
        }).optional().describe("Actions that may be taken on members of a shared folder.\nleave_a_copy: Allow the member to keep a copy of the folder when removing.\nmake_editor: Make the member an editor of the folder.\nmake_owner: Make the member an owner of the folder.\nmake_viewer: Make the member a viewer of the folder.\nmake_viewer_no_comment: Make the member a viewer of the folder without commenting permissions.\nremove: Remove the member from the folder.\nother: None\n"),
        reason: z.object({
          insufficient_plan: z.object({
            message: z.string().optional().describe("A message to tell the user to upgrade in order to support expected action."),
            upsell_url: z.string().optional().describe("A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade."),
          }).optional().describe("message: A message to tell the user to upgrade in order to support expected action.\nupsell_url: A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade.\n"),
          ".tag": z.enum(["user_not_same_team_as_owner", "user_not_allowed_by_owner", "target_is_indirect_member", "target_is_owner", "target_is_self", "target_not_active", "folder_is_limited_team_folder", "owner_not_on_team", "permission_denied", "restricted_by_team", "user_account_type", "user_not_on_team", "folder_is_inside_shared_folder", "restricted_by_parent_folder", "insufficient_plan", "other"]).optional(),
        }).optional().describe("Possible reasons the user is denied a permission.\nuser_not_same_team_as_owner: User is not on the same team as the folder owner.\nuser_not_allowed_by_owner: User is prohibited by the owner from taking the action.\ntarget_is_indirect_member: Target is indirectly a member of the folder, for example by being part of a group.\ntarget_is_owner: Target is the owner of the folder.\ntarget_is_self: Target is the user itself.\ntarget_not_active: Target is not an active member of the team.\nfolder_is_limited_team_folder: Folder is team folder for a limited team.\nowner_not_on_team: The content owner needs to be on a Dropbox team to perform this action.\npermission_denied: The user does not have permission to perform this action on the link.\nrestricted_by_team: The user's team policy prevents performing this action on the link.\nuser_account_type: The user's account type does not support this action.\nuser_not_on_team: The user needs to be on a Dropbox team to perform this action.\nfolder_is_inside_shared_folder: Folder is inside of another shared folder.\nrestricted_by_parent_folder: Policy cannot be changed due to restrictions from parent folder.\ninsufficient_plan: None\nother: None\n"),
        allow: z.boolean().optional().describe("True if the user is allowed to take the action."),
      })).optional().describe("The user's permissions for the parent shared folder."),
    })).optional().describe("The parent folders that a member has access to. The field is present if the user has access to the first parent folder where the member gains access."),
    warning: z.string().optional().describe("A localized string with additional information about why the user has this access level to the content."),
  }).optional().describe("Contains information about a member's access level to content after an operation.\naccess_level: The member still has this level of access to the content through a parent folder.\nwarning: A localized string with additional information about why the user has this access level to the content.\naccess_details: The parent folders that a member has access to. The field is present if the user has access to the first parent folder where the member gains access.\n"),
}).describe("in_progress: The asynchronous job is still in progress.\ncomplete: Removing the folder member has finished. The value is information about whether the member has another form of access.\nfailed: None\n")

export const sharingCheckRemoveMemberJobStatus = pikkuSessionlessFunc({
  description: "Returns the status of an asynchronous job for sharing a folder.\nApps must have full Dropbox access to use this endpoint.",
  input: SharingCheckRemoveMemberJobStatusInput,
  output: SharingCheckRemoveMemberJobStatusOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/check_remove_member_job_status", data) as any
  },
})
