import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingListReceivedFilesContinueInput = z.object({
  cursor: z.string().optional().describe("Cursor in :field:`ListFilesResult.cursor`."),
})

export const SharingListReceivedFilesContinueOutput = z.object({
  cursor: z.string().optional().describe("Cursor used to obtain additional shared files."),
  entries: z.array(z.object({
    owner_team: z.object({
      id: z.string().optional().describe("The team's unique ID."),
      name: z.string().optional().describe("The name of the team."),
    }).optional().describe("Information about a team.\nid: The team's unique ID.\nname: The name of the team.\n"),
    parent_shared_folder_id: z.string().optional().describe("The ID of the parent shared folder. This field is present only if the file is contained within a shared folder."),
    name: z.string().optional().describe("The name of this file."),
    time_invited: z.string().optional().describe("Timestamp indicating when the current user was invited to this shared file. If the user was not invited to the shared file, the timestamp will indicate when the user was invited to the parent shared folder. This value may be absent."),
    preview_url: z.string().optional().describe("URL for displaying a web preview of the shared file."),
    access_type: z.object({
      ".tag": z.enum(["owner", "editor", "viewer", "viewer_no_comment", "other"]).optional(),
    }).optional().describe("Defines the access levels for collaborators.\nowner: The collaborator is the owner of the shared folder. Owners can view and edit the shared folder as well as set the folder's policies using :route:`update_folder_policy`.\neditor: The collaborator can both view and edit the shared folder.\nviewer: The collaborator can only view the shared folder.\nviewer_no_comment: The collaborator can only view the shared folder and does not have any access to comments.\nother: None\n"),
    owner_display_names: z.array(z.string()).optional().describe("The display names of the users that own the file. If the file is part of a team folder, the display names of the team admins are also included. Absent if the owner display names cannot be fetched."),
    path_display: z.string().optional().describe("The cased path to be used for display purposes only. In rare instances the casing will not correctly match the user's filesystem, but this behavior will match the path provided in the Core API v1. Absent for unmounted files."),
    expected_link_metadata: z.object({
      current_audience: z.object({
        ".tag": z.enum(["public", "team", "members", "other"]).optional(),
      }).optional().describe("public: Link is accessible by anyone.\nteam: Link is accessible only by team members.\nmembers: Link is accessible only by members of the content.\nother: None\n"),
      password_protected: z.boolean().optional().describe("Whether the link is protected by a password."),
      expiry: z.string().optional().describe("Whether the link has an expiry set on it. A link with an expiry will have its  audience changed to members when the expiry is reached."),
      access_level: z.object({
        ".tag": z.enum(["owner", "editor", "viewer", "viewer_no_comment", "other"]).optional(),
      }).optional().describe("Defines the access levels for collaborators.\nowner: The collaborator is the owner of the shared folder. Owners can view and edit the shared folder as well as set the folder's policies using :route:`update_folder_policy`.\neditor: The collaborator can both view and edit the shared folder.\nviewer: The collaborator can only view the shared folder.\nviewer_no_comment: The collaborator can only view the shared folder and does not have any access to comments.\nother: None\n"),
      audience_restricting_shared_folder: z.object({
        shared_folder_id: z.string().optional().describe("The ID of the shared folder."),
        audience: z.object({
          ".tag": z.enum(["public", "team", "members", "other"]).optional(),
        }).optional().describe("public: Link is accessible by anyone.\nteam: Link is accessible only by team members.\nmembers: Link is accessible only by members of the content.\nother: None\n"),
        name: z.string().optional().describe("The name of the shared folder."),
      }).optional().describe("Information about the shared folder that prevents the link audience for this link from being more restrictive.\nshared_folder_id: The ID of the shared folder.\nname: The name of the shared folder.\naudience: The link audience of the shared folder.\n"),
      link_permissions: z.array(z.object({
        action: z.object({
          ".tag": z.enum(["change_access_level", "change_audience", "remove_expiry", "remove_password", "set_expiry", "set_password", "other"]).optional(),
        }).optional().describe("Actions that can be performed on a link.\nchange_access_level: Change the access level of the link.\nchange_audience: Change the audience of the link.\nremove_expiry: Remove the expiry date of the link.\nremove_password: Remove the password of the link.\nset_expiry: Create or modify the expiry date of the link.\nset_password: Create or modify the password of the link.\nother: None\n"),
        reason: z.object({
          insufficient_plan: z.object({
            message: z.string().optional().describe("A message to tell the user to upgrade in order to support expected action."),
            upsell_url: z.string().optional().describe("A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade."),
          }).optional().describe("message: A message to tell the user to upgrade in order to support expected action.\nupsell_url: A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade.\n"),
          ".tag": z.enum(["user_not_same_team_as_owner", "user_not_allowed_by_owner", "target_is_indirect_member", "target_is_owner", "target_is_self", "target_not_active", "folder_is_limited_team_folder", "owner_not_on_team", "permission_denied", "restricted_by_team", "user_account_type", "user_not_on_team", "folder_is_inside_shared_folder", "restricted_by_parent_folder", "insufficient_plan", "other"]).optional(),
        }).optional().describe("Possible reasons the user is denied a permission.\nuser_not_same_team_as_owner: User is not on the same team as the folder owner.\nuser_not_allowed_by_owner: User is prohibited by the owner from taking the action.\ntarget_is_indirect_member: Target is indirectly a member of the folder, for example by being part of a group.\ntarget_is_owner: Target is the owner of the folder.\ntarget_is_self: Target is the user itself.\ntarget_not_active: Target is not an active member of the team.\nfolder_is_limited_team_folder: Folder is team folder for a limited team.\nowner_not_on_team: The content owner needs to be on a Dropbox team to perform this action.\npermission_denied: The user does not have permission to perform this action on the link.\nrestricted_by_team: The user's team policy prevents performing this action on the link.\nuser_account_type: The user's account type does not support this action.\nuser_not_on_team: The user needs to be on a Dropbox team to perform this action.\nfolder_is_inside_shared_folder: Folder is inside of another shared folder.\nrestricted_by_parent_folder: Policy cannot be changed due to restrictions from parent folder.\ninsufficient_plan: None\nother: None\n"),
        allow: z.boolean().optional(),
      })).optional().describe("A list of permissions for actions you can perform on the link."),
      audience_options: z.array(z.object({
        ".tag": z.enum(["public", "team", "members", "other"]).optional(),
      })).optional().describe("The audience options that are available for the content. Some audience options may be unavailable. For example, team_only may be unavailable if the content is not owned by a user on a team. The 'default' audience option is always available if the user can modify link settings."),
    }).optional().describe("The expected metadata of a shared link for a file or folder when a link is first created for the content. Absent if the link already exists.\naudience_options: The audience options that are available for the content. Some audience options may be unavailable. For example, team_only may be unavailable if the content is not owned by a user on a team. The 'default' audience option is always available if the user can modify link settings.\ncurrent_audience: The current audience of the link.\nlink_permissions: A list of permissions for actions you can perform on the link.\npassword_protected: Whether the link is protected by a password.\naccess_level: The access level on the link for this file.\naudience_restricting_shared_folder: The shared folder that prevents the link audience for this link from being more restrictive.\nexpiry: Whether the link has an expiry set on it. A link with an expiry will have its  audience changed to members when the expiry is reached.\n"),
    path_lower: z.string().optional().describe("The lower-case full path of this file. Absent for unmounted files."),
    policy: z.object({
      viewer_info_policy: z.object({
        ".tag": z.enum(["enabled", "disabled", "other"]).optional(),
      }).optional().describe("enabled: Viewer information is available on this file.\ndisabled: Viewer information is disabled on this file.\nother: None\n"),
      resolved_member_policy: z.object({
        ".tag": z.enum(["team", "anyone", "other"]).optional(),
      }).optional().describe("Policy governing who can be a member of a shared folder. Only applicable to folders owned by a user on a team.\nteam: Only a teammate can become a member.\nanyone: Anyone can become a member.\nother: None\n"),
      acl_update_policy: z.object({
        ".tag": z.enum(["owner", "editors", "other"]).optional(),
      }).optional().describe("Who can change a shared folder's access control list (ACL). In other words, who can add, remove, or change the privileges of members.\nowner: Only the owner can update the ACL.\neditors: Any editor can update the ACL. This may be further restricted to editors on the same team.\nother: None\n"),
      shared_link_policy: z.object({
        ".tag": z.enum(["anyone", "team", "members", "other"]).optional(),
      }).optional().describe("Who can view shared links in this folder.\nanyone: Links can be shared with anyone.\nteam: Links can be shared with anyone on the same team as the owner.\nmembers: Links can only be shared among members of the shared folder.\nother: None\n"),
      member_policy: z.object({
        ".tag": z.enum(["team", "anyone", "other"]).optional(),
      }).optional().describe("Policy governing who can be a member of a shared folder. Only applicable to folders owned by a user on a team.\nteam: Only a teammate can become a member.\nanyone: Anyone can become a member.\nother: None\n"),
    }).optional().describe("A set of policies governing membership and privileges for a shared folder.\nacl_update_policy: Who can add and remove members from this shared folder.\nshared_link_policy: Who links can be shared with.\nmember_policy: Who can be a member of this shared folder, as set on the folder itself. The effective policy may differ from this value if the team-wide policy is more restrictive. Present only if the folder is owned by a team.\nresolved_member_policy: Who can be a member of this shared folder, taking into account both the folder and the team-wide policy. This value may differ from that of member_policy if the team-wide policy is more restrictive than the folder policy. Present only if the folder is owned by a team.\nviewer_info_policy: Who can enable/disable viewer info for this shared folder.\n"),
    permissions: z.array(z.object({
      action: z.object({
        ".tag": z.enum(["disable_viewer_info", "edit_contents", "enable_viewer_info", "invite_viewer", "invite_viewer_no_comment", "unshare", "relinquish_membership", "share_link", "create_link", "other"]).optional(),
      }).optional().describe("Sharing actions that may be taken on files.\ndisable_viewer_info: Disable viewer information on the file.\nedit_contents: Change or edit contents of the file.\nenable_viewer_info: Enable viewer information on the file.\ninvite_viewer: Add a member with view permissions.\ninvite_viewer_no_comment: Add a member with view permissions but no comment permissions.\nunshare: Stop sharing this file.\nrelinquish_membership: Relinquish one's own membership to the file.\nshare_link: Use create_link instead.\ncreate_link: Create a shared link to the file.\nother: None\n"),
      reason: z.object({
        insufficient_plan: z.object({
          message: z.string().optional().describe("A message to tell the user to upgrade in order to support expected action."),
          upsell_url: z.string().optional().describe("A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade."),
        }).optional().describe("message: A message to tell the user to upgrade in order to support expected action.\nupsell_url: A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade.\n"),
        ".tag": z.enum(["user_not_same_team_as_owner", "user_not_allowed_by_owner", "target_is_indirect_member", "target_is_owner", "target_is_self", "target_not_active", "folder_is_limited_team_folder", "owner_not_on_team", "permission_denied", "restricted_by_team", "user_account_type", "user_not_on_team", "folder_is_inside_shared_folder", "restricted_by_parent_folder", "insufficient_plan", "other"]).optional(),
      }).optional().describe("Possible reasons the user is denied a permission.\nuser_not_same_team_as_owner: User is not on the same team as the folder owner.\nuser_not_allowed_by_owner: User is prohibited by the owner from taking the action.\ntarget_is_indirect_member: Target is indirectly a member of the folder, for example by being part of a group.\ntarget_is_owner: Target is the owner of the folder.\ntarget_is_self: Target is the user itself.\ntarget_not_active: Target is not an active member of the team.\nfolder_is_limited_team_folder: Folder is team folder for a limited team.\nowner_not_on_team: The content owner needs to be on a Dropbox team to perform this action.\npermission_denied: The user does not have permission to perform this action on the link.\nrestricted_by_team: The user's team policy prevents performing this action on the link.\nuser_account_type: The user's account type does not support this action.\nuser_not_on_team: The user needs to be on a Dropbox team to perform this action.\nfolder_is_inside_shared_folder: Folder is inside of another shared folder.\nrestricted_by_parent_folder: Policy cannot be changed due to restrictions from parent folder.\ninsufficient_plan: None\nother: None\n"),
      allow: z.boolean().optional().describe("True if the user is allowed to take the action."),
    })).optional().describe("The sharing permissions that requesting user has on this file. This corresponds to the entries given in :field:`GetFileMetadataBatchArg.actions` or :field:`GetFileMetadataArg.actions`."),
    id: z.string().optional().describe("The ID of the file."),
    link_metadata: z.object({
      current_audience: z.object({
        ".tag": z.enum(["public", "team", "members", "other"]).optional(),
      }).optional().describe("public: Link is accessible by anyone.\nteam: Link is accessible only by team members.\nmembers: Link is accessible only by members of the content.\nother: None\n"),
      url: z.string().optional().describe("The URL of the link."),
      password_protected: z.boolean().optional().describe("Whether the link is protected by a password."),
      audience_exceptions: z.object({
        count: z.number().optional(),
        exceptions: z.array(z.object({
          name: z.string().optional().describe("The name of the content, which is either a file or a folder."),
        })).optional().describe("A truncated list of some of the content that is an exception. The length of this list could be smaller than the count since it is only a sample but will not be empty as long as count is not 0."),
      }).optional().describe("The total count and truncated list of information of content inside this folder that has a different audience than the link on this folder. This is only returned for folders.\ncount: None\nexceptions: A truncated list of some of the content that is an exception. The length of this list could be smaller than the count since it is only a sample but will not be empty as long as count is not 0.\n"),
      expiry: z.string().optional().describe("Whether the link has an expiry set on it. A link with an expiry will have its  audience changed to members when the expiry is reached."),
      access_level: z.object({
        ".tag": z.enum(["owner", "editor", "viewer", "viewer_no_comment", "other"]).optional(),
      }).optional().describe("Defines the access levels for collaborators.\nowner: The collaborator is the owner of the shared folder. Owners can view and edit the shared folder as well as set the folder's policies using :route:`update_folder_policy`.\neditor: The collaborator can both view and edit the shared folder.\nviewer: The collaborator can only view the shared folder.\nviewer_no_comment: The collaborator can only view the shared folder and does not have any access to comments.\nother: None\n"),
      audience_restricting_shared_folder: z.object({
        shared_folder_id: z.string().optional().describe("The ID of the shared folder."),
        audience: z.object({
          ".tag": z.enum(["public", "team", "members", "other"]).optional(),
        }).optional().describe("public: Link is accessible by anyone.\nteam: Link is accessible only by team members.\nmembers: Link is accessible only by members of the content.\nother: None\n"),
        name: z.string().optional().describe("The name of the shared folder."),
      }).optional().describe("Information about the shared folder that prevents the link audience for this link from being more restrictive.\nshared_folder_id: The ID of the shared folder.\nname: The name of the shared folder.\naudience: The link audience of the shared folder.\n"),
      link_permissions: z.array(z.object({
        action: z.object({
          ".tag": z.enum(["change_access_level", "change_audience", "remove_expiry", "remove_password", "set_expiry", "set_password", "other"]).optional(),
        }).optional().describe("Actions that can be performed on a link.\nchange_access_level: Change the access level of the link.\nchange_audience: Change the audience of the link.\nremove_expiry: Remove the expiry date of the link.\nremove_password: Remove the password of the link.\nset_expiry: Create or modify the expiry date of the link.\nset_password: Create or modify the password of the link.\nother: None\n"),
        reason: z.object({
          insufficient_plan: z.object({
            message: z.string().optional().describe("A message to tell the user to upgrade in order to support expected action."),
            upsell_url: z.string().optional().describe("A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade."),
          }).optional().describe("message: A message to tell the user to upgrade in order to support expected action.\nupsell_url: A URL to send the user to in order to obtain the account type they need, e.g. upgrading. Absent if there is no action the user can take to upgrade.\n"),
          ".tag": z.enum(["user_not_same_team_as_owner", "user_not_allowed_by_owner", "target_is_indirect_member", "target_is_owner", "target_is_self", "target_not_active", "folder_is_limited_team_folder", "owner_not_on_team", "permission_denied", "restricted_by_team", "user_account_type", "user_not_on_team", "folder_is_inside_shared_folder", "restricted_by_parent_folder", "insufficient_plan", "other"]).optional(),
        }).optional().describe("Possible reasons the user is denied a permission.\nuser_not_same_team_as_owner: User is not on the same team as the folder owner.\nuser_not_allowed_by_owner: User is prohibited by the owner from taking the action.\ntarget_is_indirect_member: Target is indirectly a member of the folder, for example by being part of a group.\ntarget_is_owner: Target is the owner of the folder.\ntarget_is_self: Target is the user itself.\ntarget_not_active: Target is not an active member of the team.\nfolder_is_limited_team_folder: Folder is team folder for a limited team.\nowner_not_on_team: The content owner needs to be on a Dropbox team to perform this action.\npermission_denied: The user does not have permission to perform this action on the link.\nrestricted_by_team: The user's team policy prevents performing this action on the link.\nuser_account_type: The user's account type does not support this action.\nuser_not_on_team: The user needs to be on a Dropbox team to perform this action.\nfolder_is_inside_shared_folder: Folder is inside of another shared folder.\nrestricted_by_parent_folder: Policy cannot be changed due to restrictions from parent folder.\ninsufficient_plan: None\nother: None\n"),
        allow: z.boolean().optional(),
      })).optional().describe("A list of permissions for actions you can perform on the link."),
      audience_options: z.array(z.object({
        ".tag": z.enum(["public", "team", "members", "other"]).optional(),
      })).optional().describe("The audience options that are available for the content. Some audience options may be unavailable. For example, team_only may be unavailable if the content is not owned by a user on a team. The 'default' audience option is always available if the user can modify link settings."),
    }).optional().describe("Metadata of a shared link for a file or folder.\naudience_options: The audience options that are available for the content. Some audience options may be unavailable. For example, team_only may be unavailable if the content is not owned by a user on a team. The 'default' audience option is always available if the user can modify link settings.\ncurrent_audience: The current audience of the link.\nlink_permissions: A list of permissions for actions you can perform on the link.\npassword_protected: Whether the link is protected by a password.\nurl: The URL of the link.\naccess_level: The access level on the link for this file.\naudience_restricting_shared_folder: The shared folder that prevents the link audience for this link from being more restrictive.\nexpiry: Whether the link has an expiry set on it. A link with an expiry will have its  audience changed to members when the expiry is reached.\naudience_exceptions: The content inside this folder with link audience different than this folder's. This is only returned when an endpoint that returns metadata for a single shared folder is called, e.g. /get_folder_metadata.\n"),
  })).optional().describe("Information about the files shared with current user."),
}).describe("Success results for :route:`list_received_files`.\nentries: Information about the files shared with current user.\ncursor: Cursor used to obtain additional shared files.\n")

export const sharingListReceivedFilesContinue = pikkuSessionlessFunc({
  description: "Get more results with a cursor from :route:`list_received_files`.",
  input: SharingListReceivedFilesContinueInput,
  output: SharingListReceivedFilesContinueOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/list_received_files/continue", data) as any
  },
})
