import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListRemoteAuthenticationsInput = z.object({
  brand_id: z.number().int().optional().describe("When brand separation is enabled, scopes the remote authentications to the specified brand.\n"),
})

export const ListRemoteAuthenticationsOutput = z.object({
  remote_authentications: z.array(z.object({
    agent: z.boolean().describe("If true, the method is used for the team member remote authentication"),
    agent_primary: z.boolean().describe("If team members for sign-in are redirected to a remote authentication, this is the default method shown to a team member"),
    auth_flow: z.enum(["PKCE", "authorization_code"]).optional().describe("Authentication mode"),
    auth_mode: z.union([z.literal(2), z.literal(3), z.literal(4)]).describe("The numeric representation of remote authentication type"),
    auth_mode_name: z.enum(["saml", "jwt", "oidc"]).optional().describe("The string representation of remote authentication type"),
    auth_url: z.string().optional().describe("For the \"oidc\" auth mode only.\nThe authorization endpoint to use for the request\n"),
    auto_discovery: z.boolean().optional().describe("For the \"oidc\" auth mode only.\nWhen turned on, Zendesk will automatically extract the configuration details from the OIDC Configuration Document.\nOnly the Issuer URL and Authentication Mode need to be provided\n"),
    brand_id: z.number().int().optional().describe("The ID of the brand associated with this remote authentication configuration."),
    can_display_button_to_end_users: z.boolean().describe("If users can choose how they sign in, this remote authentication method appears as an option when it's active"),
    can_display_button_to_team_members: z.boolean().describe("If team members can choose how they sign in, this remote authentication method appears as an option when it's active"),
    client_id: z.string().optional().describe("For the \"oidc\" auth mode only.\n"),
    end_user: z.boolean().describe("If true, the method is used for the end-user remote authentication"),
    end_user_primary: z.boolean().describe("If end users for sign-in are redirected to a remote authentication, this is the default method shown to an end user"),
    fingerprint: z.string().optional().describe("For the \"saml\" auth mode only.\nThe SHA-256 certificate fingerprint.\n"),
    id: z.number().int().optional().describe("Uniquely identifies a remote authentication. Automatically assigned on creation"),
    ip_ranges: z.string().nullable().optional().describe("Requests from these IP ranges will always be routed via remote authentication. Requests from IP addresses outside these ranges will be routed to the normal sign-in form.\nWhen this is blank, all requests are routed through remote authentication.\nAn IP range is in the format n.n.n.n, where n is a number or an asterisk (*) wild card.\nMultiple IP ranges are separated with spaces\n"),
    is_active: z.boolean().optional().describe("If true, the method is enabled for end users or team members"),
    issuer_url: z.string().optional().describe("For the \"oidc\" auth mode only.\nThis is the URL that is used as the logical identifier for your provider's connection\n"),
    jwks_url: z.string().optional().describe("For the \"oidc\" auth mode only.\nThis is the URL that returns the provider's JSON Web Key Set\n"),
    label: z.string().optional().describe("The sign-in button label"),
    masked_client_secret: z.string().optional().describe("For the \"oidc\" auth mode only.\n"),
    masked_secret: z.string().optional().describe("For the \"jwt\" auth mode only.\nThe token is a shared secret between you and Zendesk. It must never be publicized\n"),
    name: z.string().describe("The name of the remote configuration. It's good to use something recognizable like the identity provider's name"),
    priority: z.number().int().optional(),
    remote_login_url: z.string().describe("The URL that Zendesk invokes to redirect users to the identity provider\n"),
    remote_logout_url: z.string().describe("The URL that Zendesk uses to redirect users after they sign out\n"),
    scope: z.string().optional().describe("For the \"oidc\" auth mode only.\nThese are the user details your account can access, like name and email address.\nSupported scopes within the OIDC standard include `openid`, `profile`, `email`, `address`, and `phone`.\nIt must contain at least `openid` and `email`.\nScopes are separated with spaces\n"),
    token_url: z.string().optional().describe("For the \"oidc\" auth mode only.\nYour account uses this URL to request access tokens for users\n"),
    update_external_ids: z.boolean().optional().describe("For the \"jwt\" auth mode only.\nWhen enabled, the external id of the user being signed in can be updated.\nThis only happens when a user with the external id is not found, but the user's email address is found.\nThe external id is unique for an account.\nUsers without an external id will have one added if it is present in the authentication request\n"),
    user_info_url: z.string().optional().describe("For the \"oidc\" auth mode only.\nThis the URL that returns Claims about the authenticated user\n"),
  })).optional(),
})

export const listRemoteAuthentications = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins",
  input: ListRemoteAuthenticationsInput,
  output: ListRemoteAuthenticationsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/remote_authentications", data) as any
  },
})
