import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingListFolderMembersInput = z.object({
  shared_folder_id: z.string().optional().describe("The ID for the shared folder."),
  limit: z.number().optional().describe("The maximum number of results that include members, groups and invitees to return per request."),
  actions: z.array(z.object({
  ".tag": z.enum(["leave_a_copy", "make_editor", "make_owner", "make_viewer", "make_viewer_no_comment", "remove", "other"]).optional(),
})).optional().describe("This is a list indicating whether each returned member will include a boolean value :field:`MemberPermission.allow` that describes whether the current user can perform the MemberAction on the member."),
})

export const SharingListFolderMembersOutput = z.object({
  cursor: z.string().optional().describe("Present if there are additional shared folder members that have not been returned yet. Pass the cursor into :route:`list_folder_members/continue` to list additional members."),
  users: z.array(z.object({
    initials: z.string().optional().describe("Never set."),
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
    })).optional().describe("The permissions that requesting user has on this member. The set of permissions corresponds to the MemberActions in the request."),
    user: z.object({
      email: z.string().optional().describe("Email address of user."),
      team_member_id: z.string().optional().describe("The team member ID of the shared folder member. Only present if :field:`same_team` is true."),
      display_name: z.string().optional().describe("The display name of the user."),
      account_id: z.string().optional().describe("The account ID of the user."),
      same_team: z.boolean().optional().describe("If the user is in the same team as current user."),
    }).optional().describe("Basic information about a user. Use :route:`users.get_account` and :route:`users.get_account_batch` to obtain more detailed information.\naccount_id: The account ID of the user.\nemail: Email address of user.\ndisplay_name: The display name of the user.\nsame_team: If the user is in the same team as current user.\nteam_member_id: The team member ID of the shared folder member. Only present if :field:`same_team` is true.\n"),
    access_type: z.object({
      ".tag": z.enum(["owner", "editor", "viewer", "viewer_no_comment", "other"]).optional(),
    }).optional().describe("Defines the access levels for collaborators.\nowner: The collaborator is the owner of the shared folder. Owners can view and edit the shared folder as well as set the folder's policies using :route:`update_folder_policy`.\neditor: The collaborator can both view and edit the shared folder.\nviewer: The collaborator can only view the shared folder.\nviewer_no_comment: The collaborator can only view the shared folder and does not have any access to comments.\nother: None\n"),
    is_inherited: z.boolean().optional().describe("True if the member has access from a parent folder."),
  })).optional().describe("The list of user members of the shared folder."),
  groups: z.array(z.object({
    initials: z.string().optional().describe("Never set."),
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
  })).optional().describe("The list of group members of the shared folder."),
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
          message: z.string().optional().describe("A message to tell the user to upgrade in order to support expected action."),
          upsell_url: z.string().optional().describe("A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade."),
        }).optional().describe("message: A message to tell the user to upgrade in order to support expected action.\nupsell_url: A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade.\n"),
        ".tag": z.enum(["user_not_same_team_as_owner", "user_not_allowed_by_owner", "target_is_indirect_member", "target_is_owner", "target_is_self", "target_not_active", "folder_is_limited_team_folder", "owner_not_on_team", "permission_denied", "restricted_by_team", "user_account_type", "user_not_on_team", "folder_is_inside_shared_folder", "restricted_by_parent_folder", "insufficient_plan", "other"]).optional(),
      }).optional().describe("Possible reasons the user is denied a permission.\nuser_not_same_team_as_owner: User is not on the same team as the folder owner.\nuser_not_allowed_by_owner: User is prohibited by the owner from taking the action.\ntarget_is_indirect_member: Target is indirectly a member of the folder, for example by being part of a group.\ntarget_is_owner: Target is the owner of the folder.\ntarget_is_self: Target is the user itself.\ntarget_not_active: Target is not an active member of the team.\nfolder_is_limited_team_folder: Folder is team folder for a limited team.\nowner_not_on_team: The content owner needs to be on a Dropbox team to perform this action.\npermission_denied: The user does not have permission to perform this action on the link.\nrestricted_by_team: The user's team policy prevents performing this action on the link.\nuser_account_type: The user's account type does not support this action.\nuser_not_on_team: The user needs to be on a Dropbox team to perform this action.\nfolder_is_inside_shared_folder: Folder is inside of another shared folder.\nrestricted_by_parent_folder: Policy cannot be changed due to restrictions from parent folder.\ninsufficient_plan: None\nother: None\n"),
      allow: z.boolean().optional().describe("True if the user is allowed to take the action."),
    })).optional().describe("The permissions that requesting user has on this member. The set of permissions corresponds to the MemberActions in the request."),
  })).optional().describe("The list of invitees to the shared folder."),
}).describe("Shared folder user and group membership.\nusers: The list of user members of the shared folder.\ngroups: The list of group members of the shared folder.\ninvitees: The list of invitees to the shared folder.\ncursor: Present if there are additional shared folder members that have not been returned yet. Pass the cursor into :route:`list_folder_members/continue` to list additional members.\n")

export const sharingListFolderMembers = pikkuSessionlessFunc({
  description: "Returns shared folder membership by its folder ID.\nApps must have full Dropbox access to use this endpoint.",
  input: SharingListFolderMembersInput,
  output: SharingListFolderMembersOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/list_folder_members", data) as any
  },
})
