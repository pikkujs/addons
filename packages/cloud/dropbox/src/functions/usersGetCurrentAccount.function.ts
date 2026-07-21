import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UsersGetCurrentAccountInput = z.object({
  body: z.unknown(),
})

export const UsersGetCurrentAccountOutput = z.object({
  referral_link: z.string().optional().describe("The user's :link:`referral link https://www.dropbox.com/referrals`."),
  account_type: z.object({
    ".tag": z.enum(["basic", "pro", "business"]).optional(),
  }).optional().describe("What type of account this user has.\nbasic: The basic account type.\npro: The Dropbox Pro account type.\nbusiness: The Dropbox Business account type.\n"),
  account_id: z.string().optional().describe("The user's unique Dropbox ID."),
  locale: z.string().optional().describe("The language that the user specified. Locale tags will be :link:`IETF language tags http://en.wikipedia.org/wiki/IETF_language_tag`."),
  email_verified: z.boolean().optional().describe("Whether the user has verified their e-mail address."),
  team_member_id: z.string().optional().describe("This account's unique team member id. This field will only be present if :field:`team` is present."),
  root_info: z.object({
    root_namespace_id: z.string().optional().describe("The namespace ID for user's root namespace. It will be the namespace ID of the shared team root if the user is member of a team with a separate team root. Otherwise it will be same as :field:`RootInfo.home_namespace_id`."),
    home_namespace_id: z.string().optional().describe("The namespace ID for user's home namespace."),
  }).optional().describe("Information about current user's root.\nroot_namespace_id: The namespace ID for user's root namespace. It will be the namespace ID of the shared team root if the user is member of a team with a separate team root. Otherwise it will be same as :field:`RootInfo.home_namespace_id`.\nhome_namespace_id: The namespace ID for user's home namespace.\n"),
  disabled: z.boolean().optional().describe("Whether the user has been disabled."),
  is_paired: z.boolean().optional().describe("Whether the user has a personal and work account. If the current account is personal, then :field:`team` will always be :val:`null`, but :field:`is_paired` will indicate if a work account is linked."),
  team: z.object({
    sharing_policies: z.object({
      shared_folder_join_policy: z.object({
        ".tag": z.enum(["from_team_only", "from_anyone", "other"]).optional(),
      }).optional().describe("Policy governing which shared folders a team member can join.\nfrom_team_only: Team members can only join folders shared by teammates.\nfrom_anyone: Team members can join any shared folder, including those shared by users outside the team.\nother: None\n"),
      shared_folder_member_policy: z.object({
        ".tag": z.enum(["team", "anyone", "other"]).optional(),
      }).optional().describe("Policy governing who can be a member of a folder shared by a team member.\nteam: Only a teammate can be a member of a folder shared by a team member.\nanyone: Anyone can be a member of a folder shared by a team member.\nother: None\n"),
      shared_link_create_policy: z.object({
        ".tag": z.enum(["default_public", "default_team_only", "team_only", "other"]).optional(),
      }).optional().describe("Policy governing the visibility of shared links. This policy can apply to newly created shared links, or all shared links.\ndefault_public: By default, anyone can access newly created shared links. No login will be required to access the shared links unless overridden.\ndefault_team_only: By default, only members of the same team can access newly created shared links. Login will be required to access the shared links unless overridden.\nteam_only: Only members of the same team can access all shared links. Login will be required to access all shared links.\nother: None\n"),
    }).optional().describe("Policies governing sharing within and outside of the team.\nshared_folder_member_policy: Who can join folders shared by team members.\nshared_folder_join_policy: Which shared folders team members can join.\nshared_link_create_policy: Who can view shared links owned by team members.\n"),
    office_addin_policy: z.object({
      ".tag": z.enum(["disabled", "enabled", "other"]).optional(),
    }).optional().describe("disabled: Office Add-In is disabled.\nenabled: Office Add-In is enabled.\nother: None\n"),
    id: z.string().optional().describe("The team's unique ID."),
    name: z.string().optional().describe("The name of the team."),
  }).optional().describe("Detailed information about a team.\nid: The team's unique ID.\nname: The name of the team.\nsharing_policies: Team policies governing sharing.\noffice_addin_policy: Team policy governing the use of the Office Add-In.\n"),
  country: z.string().optional().describe("The user's two-letter country code, if available. Country codes are based on :link:`ISO 3166-1 http://en.wikipedia.org/wiki/ISO_3166-1`."),
  email: z.string().optional().describe("The user's e-mail address. Do not rely on this without checking the :field:`email_verified` field. Even then, it's possible that the user has since lost access to their e-mail."),
  profile_photo_url: z.string().optional().describe("URL for the photo representing the user, if one is set."),
  name: z.object({
    familiar_name: z.string().optional().describe("Locale-dependent name. In the US, a person's familiar name is their :field:`given_name`, but elsewhere, it could be any combination of a person's :field:`given_name` and :field:`surname`."),
    surname: z.string().optional().describe("Also known as a last name or family name."),
    display_name: z.string().optional().describe("A name that can be used directly to represent the name of a user's Dropbox account."),
    given_name: z.string().optional().describe("Also known as a first name."),
    abbreviated_name: z.string().optional().describe("An abbreviated form of the person's name. Their initials in most locales."),
  }).optional().describe("Representations for a person's name to assist with internationalization.\ngiven_name: Also known as a first name.\nsurname: Also known as a last name or family name.\nfamiliar_name: Locale-dependent name. In the US, a person's familiar name is their :field:`given_name`, but elsewhere, it could be any combination of a person's :field:`given_name` and :field:`surname`.\ndisplay_name: A name that can be used directly to represent the name of a user's Dropbox account.\nabbreviated_name: An abbreviated form of the person's name. Their initials in most locales.\n"),
}).describe("Detailed information about the current user's account.\naccount_id: The user's unique Dropbox ID.\nname: Details of a user's name.\nemail: The user's e-mail address. Do not rely on this without checking the :field:`email_verified` field. Even then, it's possible that the user has since lost access to their e-mail.\nemail_verified: Whether the user has verified their e-mail address.\ndisabled: Whether the user has been disabled.\nlocale: The language that the user specified. Locale tags will be :link:`IETF language tags http://en.wikipedia.org/wiki/IETF_language_tag`.\nreferral_link: The user's :link:`referral link https://www.dropbox.com/referrals`.\nis_paired: Whether the user has a personal and work account. If the current account is personal, then :field:`team` will always be :val:`null`, but :field:`is_paired` will indicate if a work account is linked.\naccount_type: What type of account this user has.\nroot_info: The root info for this account.\nprofile_photo_url: URL for the photo representing the user, if one is set.\ncountry: The user's two-letter country code, if available. Country codes are based on :link:`ISO 3166-1 http://en.wikipedia.org/wiki/ISO_3166-1`.\nteam: If this account is a member of a team, information about that team.\nteam_member_id: This account's unique team member id. This field will only be present if :field:`team` is present.\n")

export const usersGetCurrentAccount = pikkuSessionlessFunc({
  description: "Get information about the current user's account.",
  input: UsersGetCurrentAccountInput,
  output: UsersGetCurrentAccountOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/users/get_current_account", data) as any
  },
})
