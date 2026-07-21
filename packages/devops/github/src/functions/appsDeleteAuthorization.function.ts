// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const AppsDeleteAuthorizationInput = z.object({
  client_id: z.string().describe("The client ID of the GitHub app."),
  access_token: z.string().describe("The OAuth access token used to authenticate to the GitHub API."),
})

export const appsDeleteAuthorization = pikkuSessionlessFunc({
  description: "OAuth application owners can revoke a grant for their OAuth application and a specific user. You must use [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) when accessing this endpoint, using the OAuth application's `client_id` and `client_secret` as the username and password. You must also provide a valid OAuth `access_token` as an input parameter and the grant for the token's owner will be deleted.\nDeleting an OAuth application's grant will also delete all OAuth tokens associated with the application for the user. Once deleted, the application will have no access to the user's account and will no longer be listed on [the application authorizations settings screen within GitHub](https://github.com/settings/applications#authorized).",
  input: AppsDeleteAuthorizationInput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/applications/{client_id}/grant", data)
  },
})
