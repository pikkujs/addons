import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowCurrentUserInput = z.object({
  include: z.string().optional().describe("Sideloads to include in the response. Accepts a comma-separated list of values.\nSee [Sideloading](/api-reference/ticketing/users/users/#sideloading).\n. Example: \"roles,organizations\""),
})

export const ShowCurrentUserOutput = z.object({
  user: z.object({
    authenticity_token: z.string().optional().describe("CSRF token required by some Zendesk APIs."),
  }).optional(),
})

export const showCurrentUser = pikkuSessionlessFunc({
  description: "The endpoint returns [user information](/api-reference/ticketing/users/users/) and an `authenticity_token`.\n\n#### Allowed For\n\n* Anonymous users\n\n#### Authenticity Token\n\nZendesk API calls made by end users from a Zendesk help center must include `authenticity_token` in the `X-CSRF-Token` HTTP header. This helps prevent [cross-site request forgery (CSRF)](https://en.wikipedia.org/wiki/Cross-site_request_forgery) attacks.\n\nFor an example using an authenticity token, see the AJAX request in the [Upgrading from Templating API v1](https://developer.zendesk.com/documentation/help_center/help-center-templates/v1#jquery) documentation.",
  input: ShowCurrentUserInput,
  output: ShowCurrentUserOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/me", data) as any
  },
})
