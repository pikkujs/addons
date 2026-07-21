import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SharingRemoveFileMemberInput = z.object({
  member: z.object({
  ".tag": z.enum(["dropbox_id", "email", "other"]).optional(),
  dropbox_id: z.string().optional().describe("Dropbox account, team member, or group ID of member."),
  email: z.string().optional().describe("E-mail address of member."),
}).optional().describe("Includes different ways to identify a member of a shared folder.\ndropbox_id: Dropbox account, team member, or group ID of member.\nemail: E-mail address of member.\nother: None\n"),
  file: z.string().optional().describe("File from which to remove members."),
})

export const SharingRemoveFileMemberOutput = z.object({
  member_error: z.object({
    access_error: z.object({
      ".tag": z.enum(["no_permission", "invalid_file", "is_folder", "inside_public_folder", "inside_osx_package", "other"]).optional(),
    }).optional().describe("User could not access this file.\nno_permission: Current user does not have sufficient privileges to perform the desired action.\ninvalid_file: File specified was not found.\nis_folder: A folder can't be shared this way. Use folder sharing or a shared link instead.\ninside_public_folder: A file inside a public folder can't be shared this way. Use a public link instead.\ninside_osx_package: A Mac OS X package can't be shared this way. Use a shared link instead.\nother: None\n"),
    ".tag": z.enum(["invalid_member", "no_permission", "access_error", "no_explicit_access", "other"]).optional(),
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
  }).optional().describe("invalid_member: Specified member was not found.\nno_permission: User does not have permission to perform this action on this member.\naccess_error: Specified file was invalid or user does not have access.\nno_explicit_access: The action cannot be completed because the target member does not have explicit access to the file. The return value is the access that the member has to the file from a parent folder.\nother: None\n"),
  ".tag": z.enum(["success", "member_error"]).optional(),
  success: z.object({
    ".tag": z.enum(["owner", "editor", "viewer", "viewer_no_comment", "other"]).optional(),
  }).optional().describe("Defines the access levels for collaborators.\nowner: The collaborator is the owner of the shared folder. Owners can view and edit the shared folder as well as set the folder's policies using :route:`update_folder_policy`.\neditor: The collaborator can both view and edit the shared folder.\nviewer: The collaborator can only view the shared folder.\nviewer_no_comment: The collaborator can only view the shared folder and does not have any access to comments.\nother: None\n"),
}).describe("success: Member was successfully removed from this file. If AccessLevel is given, the member still has access via a parent shared folder.\nmember_error: User was not able to perform this action.\n")

export const sharingRemoveFileMember = pikkuSessionlessFunc({
  description: "Identical to remove_file_member_2 but with less information returned.",
  input: SharingRemoveFileMemberInput,
  output: SharingRemoveFileMemberOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/remove_file_member", data) as any
  },
})
