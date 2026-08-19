import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingListFileMembersBatchInput = z.object({
  files: z.array(z.string()).optional().describe("Files for which to return members."),
  limit: z.number().optional().describe("Number of members to return max per query. Defaults to 10 if no limit is specified."),
})

export const SharingListFileMembersBatchOutput = z.array(z.object({
  result: z.object({
    access_error: z.object({
      ".tag": z.enum(["no_permission", "invalid_file", "is_folder", "inside_public_folder", "inside_osx_package", "other"]).optional(),
    }).optional().describe("User could not access this file.\nno_permission: Current user does not have sufficient privileges to perform the desired action.\ninvalid_file: File specified was not found.\nis_folder: A folder can't be shared this way. Use folder sharing or a shared link instead.\ninside_public_folder: A file inside a public folder can't be shared this way. Use a public link instead.\ninside_osx_package: A Mac OS X package can't be shared this way. Use a shared link instead.\nother: None\n"),
    ".tag": z.enum(["result", "access_error", "other"]).optional(),
    result: z.object({
      member_count: z.number().optional().describe("The number of members on this file. This does not include inherited members."),
      members: z.object({
        cursor: z.string().optional().describe("Present if there are additional shared file members that have not been returned yet. Pass the cursor into :route:`list_file_members/continue` to list additional members."),
        users: z.array(z.object({
          access_type: z.object({
            ".tag": z.enum(["owner", "editor", "viewer", "viewer_no_comment", "other"]).optional(),
          }).optional().describe("Defines the access levels for collaborators.\nowner: The collaborator is the owner of the shared folder. Owners can view and edit the shared folder as well as set the folder's policies using :route:`update_folder_policy`.\neditor: The collaborator can both view and edit the shared folder.\nviewer: The collaborator can only view the shared folder.\nviewer_no_comment: The collaborator can only view the shared folder and does not have any access to comments.\nother: None\n"),
          platform_type: z.object({
            ".tag": z.enum(["web", "mobile", "desktop", "unknown", "other"]).optional(),
          }).optional().describe("Possible platforms on which a user may view content.\nweb: The content was viewed on the web.\nmobile: The content was viewed on a mobile client.\ndesktop: The content was viewed on a desktop client.\nunknown: The content was viewed on an unknown platform.\nother: None\n"),
          user: z.object({
            email: z.string().optional().describe("Email address of user."),
            team_member_id: z.string().optional().describe("The team member ID of the shared folder member. Only present if :field:`same_team` is true."),
            display_name: z.string().optional().describe("The display name of the user."),
            account_id: z.string().optional().describe("The account ID of the user."),
            same_team: z.boolean().optional().describe("If the user is in the same team as current user."),
          }).optional().describe("Basic information about a user. Use :route:`users.get_account` and :route:`users.get_account_batch` to obtain more detailed information.\naccount_id: The account ID of the user.\nemail: Email address of user.\ndisplay_name: The display name of the user.\nsame_team: If the user is in the same team as current user.\nteam_member_id: The team member ID of the shared folder member. Only present if :field:`same_team` is true.\n"),
          time_last_seen: z.string().optional().describe("The UTC timestamp of when the user has last seen the content, if they have."),
          is_inherited: z.boolean().optional().describe("True if the member has access from a parent folder."),
          permissions: z.array(z.object({
            action: z.object({
              ".tag": z.enum(["leave_a_copy", "make_editor", "make_owner", "make_viewer", "make_viewer_no_comment", "remove", "other"]).optional(),
            }).optional().describe("Actions that may be taken on members of a shared folder.\nleave_a_copy: Allow the member to keep a copy of the folder when removing.\nmake_editor: Make the member an editor of the folder.\nmake_owner: Make the member an owner of the folder.\nmake_viewer: Make the member a viewer of the folder.\nmake_viewer_no_comment: Make the member a viewer of the folder without commenting permissions.\nremove: Remove the member from the folder.\nother: None\n"),
            reason: z.object({
              insufficient_plan: z.object({
                message: z.any().optional().describe("A message to tell the user to upgrade in order to support expected action."),
                upsell_url: z.any().optional().describe("A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade."),
              }).optional().describe("message: A message to tell the user to upgrade in order to support expected action.\nupsell_url: A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade.\n"),
              ".tag": z.enum(["user_not_same_team_as_owner", "user_not_allowed_by_owner", "target_is_indirect_member", "target_is_owner", "target_is_self", "target_not_active", "folder_is_limited_team_folder", "owner_not_on_team", "permission_denied", "restricted_by_team", "user_account_type", "user_not_on_team", "folder_is_inside_shared_folder", "restricted_by_parent_folder", "insufficient_plan", "other"]).optional(),
            }).optional().describe("Possible reasons the user is denied a permission.\nuser_not_same_team_as_owner: User is not on the same team as the folder owner.\nuser_not_allowed_by_owner: User is prohibited by the owner from taking the action.\ntarget_is_indirect_member: Target is indirectly a member of the folder, for example by being part of a group.\ntarget_is_owner: Target is the owner of the folder.\ntarget_is_self: Target is the user itself.\ntarget_not_active: Target is not an active member of the team.\nfolder_is_limited_team_folder: Folder is team folder for a limited team.\nowner_not_on_team: The content owner needs to be on a Dropbox team to perform this action.\npermission_denied: The user does not have permission to perform this action on the link.\nrestricted_by_team: The user's team policy prevents performing this action on the link.\nuser_account_type: The user's account type does not support this action.\nuser_not_on_team: The user needs to be on a Dropbox team to perform this action.\nfolder_is_inside_shared_folder: Folder is inside of another shared folder.\nrestricted_by_parent_folder: Policy cannot be changed due to restrictions from parent folder.\ninsufficient_plan: None\nother: None\n"),
            allow: z.boolean().optional().describe("True if the user is allowed to take the action."),
          })).optional().describe("The permissions that requesting user has on this member. The set of permissions corresponds to the MemberActions in the request."),
          initials: z.string().optional().describe("Never set."),
        })).optional().describe("The list of user members of the shared file."),
        groups: z.array(z.object({
          initials: z.string().optional().describe("Never set."),
          permissions: z.array(z.object({
            action: z.object({
              ".tag": z.enum(["leave_a_copy", "make_editor", "make_owner", "make_viewer", "make_viewer_no_comment", "remove", "other"]).optional(),
            }).optional().describe("Actions that may be taken on members of a shared folder.\nleave_a_copy: Allow the member to keep a copy of the folder when removing.\nmake_editor: Make the member an editor of the folder.\nmake_owner: Make the member an owner of the folder.\nmake_viewer: Make the member a viewer of the folder.\nmake_viewer_no_comment: Make the member a viewer of the folder without commenting permissions.\nremove: Remove the member from the folder.\nother: None\n"),
            reason: z.object({
              insufficient_plan: z.object({
                message: z.any().optional().describe("A message to tell the user to upgrade in order to support expected action."),
                upsell_url: z.any().optional().describe("A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade."),
              }).optional().describe("message: A message to tell the user to upgrade in order to support expected action.\nupsell_url: A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade.\n"),
              ".tag": z.enum(["user_not_same_team_as_owner", "user_not_allowed_by_owner", "target_is_indirect_member", "target_is_owner", "target_is_self", "target_not_active", "folder_is_limited_team_folder", "owner_not_on_team", "permission_denied", "restricted_by_team", "user_account_type", "user_not_on_team", "folder_is_inside_shared_folder", "restricted_by_parent_folder", "insufficient_plan", "other"]).optional(),
            }).optional().describe("Possible reasons the user is denied a permission.\nuser_not_same_team_as_owner: User is not on the same team as the folder owner.\nuser_not_allowed_by_owner: User is prohibited by the owner from taking the action.\ntarget_is_indirect_member: Target is indirectly a member of the folder, for example by being part of a group.\ntarget_is_owner: Target is the owner of the folder.\ntarget_is_self: Target is the user itself.\ntarget_not_active: Target is not an active member of the team.\nfolder_is_limited_team_folder: Folder is team folder for a limited team.\nowner_not_on_team: The content owner needs to be on a Dropbox team to perform this action.\npermission_denied: The user does not have permission to perform this action on the link.\nrestricted_by_team: The user's team policy prevents performing this action on the link.\nuser_account_type: The user's account type does not support this action.\nuser_not_on_team: The user needs to be on a Dropbox team to perform this action.\nfolder_is_inside_shared_folder: Folder is inside of another shared folder.\nrestricted_by_parent_folder: Policy cannot be changed due to restrictions from parent folder.\ninsufficient_plan: None\nother: None\n"),
            allow: z.boolean().optional().describe("True if the user is allowed to take the action."),
          })).optional().describe("The permissions that requesting user has on this member. The set of permissions corresponds to the MemberActions in the request."),
          group: z.object({
            group_external_id: z.string().optional().describe("External ID of group. This is an arbitrary ID that an admin can attach to a group."),
            is_owner: z.boolean().optional().describe("If the current user is an owner of the group."),
            member_count: z.number().optional().describe("The number of members in the group."),
            same_team: z.boolean().optional().describe("If the group is owned by the current user's team."),
            is_member: z.boolean().optional().describe("If the current user is a member of the group."),
            group_management_type: z.object({
              ".tag": z.enum(["user_managed", "company_managed", "system_managed", "other"]).optional(),
            }).optional().describe("The group type determines how a group is managed.\nuser_managed: A group which is managed by selected users.\ncompany_managed: A group which is managed by team admins only.\nsystem_managed: A group which is managed automatically by Dropbox.\nother: None\n"),
            group_name: z.string().optional(),
            group_id: z.string().optional(),
            group_type: z.object({
              ".tag": z.enum(["team", "user_managed", "other"]).optional(),
            }).optional().describe("The group type determines how a group is created and managed.\nteam: A group to which team members are automatically added. Applicable to :link:`team folders https://www.dropbox.com/help/986` only.\nuser_managed: A group is created and managed by a user.\nother: None\n"),
          }).optional().describe("The information about a group. Groups is a way to manage a list of users  who need same access permission to the shared folder.\ngroup_name: None\ngroup_id: None\ngroup_management_type: Who is allowed to manage the group.\ngroup_type: The type of group.\nis_member: If the current user is a member of the group.\nis_owner: If the current user is an owner of the group.\nsame_team: If the group is owned by the current user's team.\ngroup_external_id: External ID of group. This is an arbitrary ID that an admin can attach to a group.\nmember_count: The number of members in the group.\n"),
          access_type: z.object({
            ".tag": z.enum(["owner", "editor", "viewer", "viewer_no_comment", "other"]).optional(),
          }).optional().describe("Defines the access levels for collaborators.\nowner: The collaborator is the owner of the shared folder. Owners can view and edit the shared folder as well as set the folder's policies using :route:`update_folder_policy`.\neditor: The collaborator can both view and edit the shared folder.\nviewer: The collaborator can only view the shared folder.\nviewer_no_comment: The collaborator can only view the shared folder and does not have any access to comments.\nother: None\n"),
          is_inherited: z.boolean().optional().describe("True if the member has access from a parent folder."),
        })).optional().describe("The list of group members of the shared file."),
        invitees: z.array(z.object({
          invitee: z.object({
            ".tag": z.enum(["email", "other"]).optional(),
            email: z.string().optional().describe("E-mail address of invited user."),
          }).optional().describe("Information about the recipient of a shared content invitation.\nemail: E-mail address of invited user.\nother: None\n"),
          access_type: z.object({
            ".tag": z.enum(["owner", "editor", "viewer", "viewer_no_comment", "other"]).optional(),
          }).optional().describe("Defines the access levels for collaborators.\nowner: The collaborator is the owner of the shared folder. Owners can view and edit the shared folder as well as set the folder's policies using :route:`update_folder_policy`.\neditor: The collaborator can both view and edit the shared folder.\nviewer: The collaborator can only view the shared folder.\nviewer_no_comment: The collaborator can only view the shared folder and does not have any access to comments.\nother: None\n"),
          user: z.object({
            email: z.string().optional().describe("Email address of user."),
            team_member_id: z.string().optional().describe("The team member ID of the shared folder member. Only present if :field:`same_team` is true."),
            display_name: z.string().optional().describe("The display name of the user."),
            account_id: z.string().optional().describe("The account ID of the user."),
            same_team: z.boolean().optional().describe("If the user is in the same team as current user."),
          }).optional().describe("Basic information about a user. Use :route:`users.get_account` and :route:`users.get_account_batch` to obtain more detailed information.\naccount_id: The account ID of the user.\nemail: Email address of user.\ndisplay_name: The display name of the user.\nsame_team: If the user is in the same team as current user.\nteam_member_id: The team member ID of the shared folder member. Only present if :field:`same_team` is true.\n"),
          is_inherited: z.boolean().optional().describe("True if the member has access from a parent folder."),
          initials: z.string().optional().describe("Never set."),
          permissions: z.array(z.object({
            action: z.object({
              ".tag": z.enum(["leave_a_copy", "make_editor", "make_owner", "make_viewer", "make_viewer_no_comment", "remove", "other"]).optional(),
            }).optional().describe("Actions that may be taken on members of a shared folder.\nleave_a_copy: Allow the member to keep a copy of the folder when removing.\nmake_editor: Make the member an editor of the folder.\nmake_owner: Make the member an owner of the folder.\nmake_viewer: Make the member a viewer of the folder.\nmake_viewer_no_comment: Make the member a viewer of the folder without commenting permissions.\nremove: Remove the member from the folder.\nother: None\n"),
            reason: z.object({
              insufficient_plan: z.object({
                message: z.any().optional().describe("A message to tell the user to upgrade in order to support expected action."),
                upsell_url: z.any().optional().describe("A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade."),
              }).optional().describe("message: A message to tell the user to upgrade in order to support expected action.\nupsell_url: A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade.\n"),
              ".tag": z.enum(["user_not_same_team_as_owner", "user_not_allowed_by_owner", "target_is_indirect_member", "target_is_owner", "target_is_self", "target_not_active", "folder_is_limited_team_folder", "owner_not_on_team", "permission_denied", "restricted_by_team", "user_account_type", "user_not_on_team", "folder_is_inside_shared_folder", "restricted_by_parent_folder", "insufficient_plan", "other"]).optional(),
            }).optional().describe("Possible reasons the user is denied a permission.\nuser_not_same_team_as_owner: User is not on the same team as the folder owner.\nuser_not_allowed_by_owner: User is prohibited by the owner from taking the action.\ntarget_is_indirect_member: Target is indirectly a member of the folder, for example by being part of a group.\ntarget_is_owner: Target is the owner of the folder.\ntarget_is_self: Target is the user itself.\ntarget_not_active: Target is not an active member of the team.\nfolder_is_limited_team_folder: Folder is team folder for a limited team.\nowner_not_on_team: The content owner needs to be on a Dropbox team to perform this action.\npermission_denied: The user does not have permission to perform this action on the link.\nrestricted_by_team: The user's team policy prevents performing this action on the link.\nuser_account_type: The user's account type does not support this action.\nuser_not_on_team: The user needs to be on a Dropbox team to perform this action.\nfolder_is_inside_shared_folder: Folder is inside of another shared folder.\nrestricted_by_parent_folder: Policy cannot be changed due to restrictions from parent folder.\ninsufficient_plan: None\nother: None\n"),
            allow: z.boolean().optional().describe("True if the user is allowed to take the action."),
          })).optional().describe("The permissions that requesting user has on this member. The set of permissions corresponds to the MemberActions in the request."),
        })).optional().describe("The list of invited members of a file, but have not logged in and claimed this."),
      }).optional().describe("Shared file user, group, and invitee membership.\nUsed for the results of :route:`list_file_members` and :route:`list_file_members/continue`, and used as part of the results for :route:`list_file_members/batch`.\nusers: The list of user members of the shared file.\ngroups: The list of group members of the shared file.\ninvitees: The list of invited members of a file, but have not logged in and claimed this.\ncursor: Present if there are additional shared file members that have not been returned yet. Pass the cursor into :route:`list_file_members/continue` to list additional members.\n"),
    }).optional().describe("members: A list of members on this file.\nmember_count: The number of members on this file. This does not include inherited members.\n"),
  }).optional().describe("result: The results of the query for this file if it was successful.\naccess_error: The result of the query for this file if it was an error.\nother: None\n"),
  file: z.string().optional().describe("This is the input file identifier, whether an ID or a path."),
}))

export const sharingListFileMembersBatch = pikkuSessionlessFunc({
  description: "Get members of multiple files at once. The arguments to this route are more limited, and the limit on query result size per file is more strict. To customize the results more, use the individual file endpoint.\nInherited users and groups are not included in the result, and permissions are not returned for this endpoint.",
  input: SharingListFileMembersBatchInput,
  output: SharingListFileMembersBatchOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/list_file_members/batch", data) as any
  },
})
