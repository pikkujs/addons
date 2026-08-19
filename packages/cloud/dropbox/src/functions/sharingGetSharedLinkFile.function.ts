import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SharingGetSharedLinkFileInput = z.object({
  url: z.string().optional().describe("URL of the shared link."),
  path: z.string().optional().describe("If the shared link is to a folder, this parameter can be used to retrieve the metadata for a specific file or sub-folder in this folder. A relative path should be used."),
  link_password: z.string().optional().describe("If the shared link has a password, this parameter can be used."),
})

export const SharingGetSharedLinkFileOutput = z.object({
  name: z.string().optional().describe("The linked file name (including extension). This never contains a slash."),
  url: z.string().optional().describe("URL of the shared link."),
  expires: z.string().optional().describe("Expiration time, if set. By default the link won't expire."),
  path_lower: z.string().optional().describe("The lowercased full path in the user's Dropbox. This always starts with a slash. This field will only be present only if the linked file is in the authenticated user's  dropbox."),
  content_owner_team_info: z.object({
    id: z.string().optional().describe("The team's unique ID."),
    name: z.string().optional().describe("The name of the team."),
  }).optional().describe("Information about a team.\nid: The team's unique ID.\nname: The name of the team.\n"),
  link_permissions: z.object({
    requested_visibility: z.object({
      ".tag": z.enum(["public", "team_only", "password"]).optional(),
    }).optional().describe("The access permission that can be requested by the caller for the shared link. Note that the final resolved visibility of the shared link takes into account other aspects, such as team and shared folder settings. Check the :type:`ResolvedVisibility` for more info on the possible resolved visibility values of shared links.\npublic: Anyone who has received the link can access it. No login required.\nteam_only: Only members of the same team can access the link. Login is required.\npassword: A link-specific password is required to access the link. Login is not required.\n"),
    resolved_visibility: z.object({
      ".tag": z.enum(["public", "team_only", "password", "team_and_password", "shared_folder_only", "other"]).optional(),
    }).optional().describe("The actual access permissions values of shared links after taking into account user preferences and the team and shared folder settings. Check the :type:`RequestedVisibility` for more info on the possible visibility values that can be set by the shared link's owner.\npublic: Anyone who has received the link can access it. No login required.\nteam_only: Only members of the same team can access the link. Login is required.\npassword: A link-specific password is required to access the link. Login is not required.\nteam_and_password: Only members of the same team who have the link-specific password can access the link. Login is required.\nshared_folder_only: Only members of the shared folder containing the linked file can access the link. Login is required.\nother: None\n"),
    can_revoke: z.boolean().optional().describe("Whether the caller can revoke the shared link."),
    revoke_failure_reason: z.object({
      ".tag": z.enum(["login_required", "email_verify_required", "password_required", "team_only", "owner_only", "other"]).optional(),
    }).optional().describe("login_required: User is not logged in.\nemail_verify_required: User's email is not verified.\npassword_required: The link is password protected.\nteam_only: Access is allowed for team members only.\nowner_only: Access is allowed for the shared link's owner only.\nother: None\n"),
  }).optional().describe("can_revoke: Whether the caller can revoke the shared link.\nresolved_visibility: The current visibility of the link after considering the shared links policies of the the team (in case the link's owner is part of a team) and the shared folder (in case the linked file is part of a shared folder). This field is shown only if the caller has access to this info (the link's owner always has access to this data).\nrequested_visibility: The shared link's requested visibility. This can be overridden by the team and shared folder policies. The final visibility, after considering these policies, can be found in :field:`resolved_visibility`. This is shown only if the caller is the link's owner.\nrevoke_failure_reason: The failure reason for revoking the link. This field will only be present if the :field:`can_revoke` is :val:`false`.\n"),
  team_member_info: z.object({
    member_id: z.string().optional().describe("ID of user as a member of a team. This field will only be present if the member is in the same team as current user."),
    display_name: z.string().optional().describe("The display name of the user."),
    team_info: z.object({
      id: z.string().optional().describe("The team's unique ID."),
      name: z.string().optional().describe("The name of the team."),
    }).optional().describe("Information about a team.\nid: The team's unique ID.\nname: The name of the team.\n"),
  }).optional().describe("Information about a team member.\nteam_info: Information about the member's team.\ndisplay_name: The display name of the user.\nmember_id: ID of user as a member of a team. This field will only be present if the member is in the same team as current user.\n"),
  id: z.string().optional().describe("A unique identifier for the linked file."),
}).describe("The metadata of a shared link.\nurl: URL of the shared link.\nname: The linked file name (including extension). This never contains a slash.\nlink_permissions: The link's access permissions.\nid: A unique identifier for the linked file.\nexpires: Expiration time, if set. By default the link won't expire.\npath_lower: The lowercased full path in the user's Dropbox. This always starts with a slash. This field will only be present only if the linked file is in the authenticated user's  dropbox.\nteam_member_info: The team membership information of the link's owner.  This field will only be present  if the link's owner is a team member.\ncontent_owner_team_info: The team information of the content's owner. This field will only be present if the content's owner is a team member and the content's owner team is different from the link's owner team.\n")

export const sharingGetSharedLinkFile = pikkuSessionlessFunc({
  description: "Download the shared link's file from a user's Dropbox.",
  input: SharingGetSharedLinkFileInput,
  output: SharingGetSharedLinkFileOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/sharing/get_shared_link_file", data) as any
  },
})
