// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CreateUsersLoginSwitchInput = z.object({
  current_service: z.string().describe("The service the user currently uses to login"),
  new_service: z.string().describe("The service the user will use to login"),
  email: z.string().optional().describe("The email of the user"),
  password: z.string().optional().describe("The password used with the current service"),
  mfa_code: z.string().optional().describe("The MFA code of the current service"),
  ldap_id: z.string().optional().describe("The LDAP/AD id of the user"),
})

export const CreateUsersLoginSwitchOutput = z.object({
  follow_link: z.string().optional().describe("The link for the user to follow to login or to complete the account switching when the current service is OAuth2/SAML"),
})

export const createUsersLoginSwitch = pikkuSessionlessFunc({
  description: "Switch a user's login method from using email to OAuth2/SAML/LDAP or back to email. When switching to OAuth2/SAML, account switching is not complete until the user follows the returned link and completes any steps on the OAuth2/SAML service provider.\n\nTo switch from email to OAuth2/SAML, specify `current_service`, `new_service`, `email` and `password`.\n\nTo switch from OAuth2/SAML to email, specify `current_service`, `new_service`, `email` and `new_password`.\n\nTo switch from email to LDAP/AD, specify `current_service`, `new_service`, `email`, `password`, `ldap_ip` and `new_password` (this is the user's LDAP password).\n\nTo switch from LDAP/AD to email, specify `current_service`, `new_service`, `ldap_ip`, `password` (this is the user's LDAP password), `email`  and `new_password`.\n\nAdditionally, specify `mfa_code` when trying to switch an account on LDAP/AD or email that has MFA activated.\n\n##### Permissions\nNo current authentication required except when switching from OAuth2/SAML to email.",
  input: CreateUsersLoginSwitchInput,
  output: CreateUsersLoginSwitchOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/login/switch", data) as any
  },
})
