import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UsersGetAccountInput = z.object({
  account_id: z.string().optional().describe("A user's account identifier."),
})

export const UsersGetAccountOutput = z.object({
  account_id: z.string().optional().describe("The user's unique Dropbox ID."),
  is_teammate: z.boolean().optional().describe("Whether this user is a teammate of the current user. If this account is the current user's account, then this will be :val:`true`."),
  email_verified: z.boolean().optional().describe("Whether the user has verified their e-mail address."),
  team_member_id: z.string().optional().describe("The user's unique team member id. This field will only be present if the user is part of a team and :field:`is_teammate` is :val:`true`."),
  disabled: z.boolean().optional().describe("Whether the user has been disabled."),
  email: z.string().optional().describe("The user's e-mail address. Do not rely on this without checking the :field:`email_verified` field. Even then, it's possible that the user has since lost access to their e-mail."),
  profile_photo_url: z.string().optional().describe("URL for the photo representing the user, if one is set."),
  name: z.object({
    familiar_name: z.string().optional().describe("Locale-dependent name. In the US, a person's familiar name is their :field:`given_name`, but elsewhere, it could be any combination of a person's :field:`given_name` and :field:`surname`."),
    surname: z.string().optional().describe("Also known as a last name or family name."),
    display_name: z.string().optional().describe("A name that can be used directly to represent the name of a user's Dropbox account."),
    given_name: z.string().optional().describe("Also known as a first name."),
    abbreviated_name: z.string().optional().describe("An abbreviated form of the person's name. Their initials in most locales."),
  }).optional().describe("Representations for a person's name to assist with internationalization.\ngiven_name: Also known as a first name.\nsurname: Also known as a last name or family name.\nfamiliar_name: Locale-dependent name. In the US, a person's familiar name is their :field:`given_name`, but elsewhere, it could be any combination of a person's :field:`given_name` and :field:`surname`.\ndisplay_name: A name that can be used directly to represent the name of a user's Dropbox account.\nabbreviated_name: An abbreviated form of the person's name. Their initials in most locales.\n"),
}).describe("Basic information about any account.\naccount_id: The user's unique Dropbox ID.\nname: Details of a user's name.\nemail: The user's e-mail address. Do not rely on this without checking the :field:`email_verified` field. Even then, it's possible that the user has since lost access to their e-mail.\nemail_verified: Whether the user has verified their e-mail address.\ndisabled: Whether the user has been disabled.\nis_teammate: Whether this user is a teammate of the current user. If this account is the current user's account, then this will be :val:`true`.\nprofile_photo_url: URL for the photo representing the user, if one is set.\nteam_member_id: The user's unique team member id. This field will only be present if the user is part of a team and :field:`is_teammate` is :val:`true`.\n")

export const usersGetAccount = pikkuSessionlessFunc({
  description: "Get information about a user's account.",
  input: UsersGetAccountInput,
  output: UsersGetAccountOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/users/get_account", data) as any
  },
})
