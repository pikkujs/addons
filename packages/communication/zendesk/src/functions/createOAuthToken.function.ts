// OAuth Tokens — OAuth tokens are credentials used to authenticate API requests on behalf of users or applications.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateOAuthTokenInput = z.object({
  client_id: z.number().int().optional().describe("The id of the OAuth client. Example: 223443"),
  global_client_id: z.number().int().optional().describe("The id of the global OAuth client. Example: 334556"),
  all: z.boolean().optional().describe("A boolean that returns all OAuth tokens in the account. Requires admin role. Example: true"),
})

export const CreateOAuthTokenOutput = z.object({
  token: z.object({
    client_id: z.number().int().optional().describe("The id of the client this token belongs to"),
    created_at: z.string().datetime().optional().describe("The time the token was created"),
    expires_at: z.string().datetime().optional().describe("The time the token will expire"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    refresh_token: z.string().optional().describe("The refresh token, if generated"),
    refresh_token_expires_at: z.string().datetime().optional().describe("The time the refresh token will expire"),
    scopes: z.array(z.string()).optional().describe("An array of the valid scopes for this token. See [Scopes](#scopes) below"),
    token: z.string().optional().describe("The access token"),
    url: z.string().optional().describe("The API url of this record"),
    used_at: z.string().datetime().optional().describe("The latest time this token was used for authentication"),
    user_id: z.number().int().optional().describe("The id of the user this token authenticates as"),
  }).optional(),
})

export const createOAuthToken = pikkuSessionlessFunc({
  description: "Returns an OAuth access token with a specified [scope](#scopes). Depending on the grant type, the response may also include a refresh token. Zendesk supports the `authorization_code` and `confidentials` grant types for OAuth authentication.\n\nAccess tokens are valid for 30 minutes by default (configurable from 5 minutes to 48 hours). Refresh tokens are valid for 30 days by default (configurable from 7 days to 90 days).\n\nFor a tutorial, see [Creating and using OAuth tokens with the API](/documentation/ticketing/working-with-oauth/creating-and-using-oauth-tokens-with-the-api/).\n\n**Note**: For OAuth clients created on or after April 30, 2026, token expiration is enforced automatically. For older clients, you must explicitly pass `expires_in` during authorization to trigger access token expiration and receive a refresh token.\n\n#### Allowed For\n\n* Admins\n\n#### Request parameters\n\nThe POST request takes a \"token\" object that contains an OAuth client's resource id and scopes.\n\n| Name      | Type    | Description\n| --------- | ------- | --------------------------------------------------\n| client_id | integer | The resource `id` of an [OAuth client](/api-reference/ticketing/oauth/oauth_clients/#json-format) (not the client's unique identifier). For the ids, see [List Clients](/api-reference/ticketing/oauth/oauth_clients/#list-clients)\n| scopes    | array   | Valid scopes for the token. See [Scopes](#scopes) below\n\n#### Scopes\n\nThe **scopes** parameter defines whether requests authenticated with the token can\npost, put, and delete data, or only get data.\n\n**Note**: Don't confuse the **scopes** parameter (plural) with the **scope** parameter (singular)\nfor [grant-type tokens](/api-reference/ticketing/oauth/grant_type_tokens/).\n\nThe **scopes** parameter is an array of strings, each specifying a resource name and\nan access setting. Access is either \"read\" or \"write\". If you don't specify a resource,\naccess to all resources is assumed. If you don't specify the access, read and write\naccess are assumed.\n\nThe syntax is as follows:\n\n`\"scopes\": [resource:scope, ...]`\n\nwhere `resource` is optional.\n\n**Examples**\n\n`\"scopes\": [\"read\"]`\n\n`\"scopes\": [\"tickets:read\"]`\n\nTo give read and write access to a resource, specify both scopes:\n\n`\"scopes\": [\"users:read\", \"users:write\"]`\n\nTo give write access only to one resource and read access to everything\nelse:\n\n`\"scopes\": [\"organizations:write\", \"read\"]`\n\n**Note**: The endpoint returns an access token even if you specify an\ninvalid scope. Any request you make with the token will return\na \"Forbidden\" error.\n\n**Available scopes**\n\n* `read` - gives access to GET endpoints. Includes\npermission to sideload related resources\n* `write` - gives access to POST, PUT, and DELETE endpoints\n* `impersonate` - allows Zendesk Support admins to make requests on behalf of\nend users. See [Making API requests on behalf of end users](/documentation/ticketing/using-the-zendesk-api/making-api-requests-on-behalf-of-end-users/)\n\n**Resources that can be scoped**\n\n* tickets\n* users\n* auditlogs (read only)\n* organizations\n* hc\n* apps\n* triggers\n* automations\n* targets\n* webhooks\n* macros\n* requests\n* satisfaction_ratings\n* dynamic_content\n* any_channel (write only)\n* web_widget (write only)\n* security (read only)\n* unrestricted (read and write)",
  input: CreateOAuthTokenInput,
  output: CreateOAuthTokenOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/oauth/tokens", data) as any
  },
})
