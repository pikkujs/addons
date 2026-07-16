// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const AppsDeleteTokenInput = z.object({
  client_id: z.string().describe("The client ID of the GitHub app."),
  access_token: z.string().describe("The OAuth access token used to authenticate to the GitHub API."),
})

export const appsDeleteToken = pikkuSessionlessFunc({
  description: "OAuth application owners can revoke a single token for an OAuth application. You must use [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) when accessing this endpoint, using the OAuth application's `client_id` and `client_secret` as the username and password.",
  input: AppsDeleteTokenInput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/applications/{client_id}/token", data)
  },
})
