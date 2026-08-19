import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateUserIdentityInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  user_identity_id: z.number().int().describe("The ID of the user identity. Example: 77938"),
})

export const UpdateUserIdentityOutput = z.object({
  identity: z.object({
    brand_id: z.number().int().optional().describe("The brand ID associated with this identity. Only present when brand separation is enabled."),
    created_at: z.string().datetime().optional().describe("The time the identity was created"),
    deliverable_state: z.string().optional().describe("Email identity type only. Indicates if Zendesk sends notifications to the email address. See [Deliverable state](#deliverable-state)"),
    id: z.number().int().optional().describe("Automatically assigned on creation"),
    primary: z.boolean().optional().describe("If the identity is the primary identity. *Writable only when creating, not when updating. Use the [Make Identity Primary](#make-identity-primary) endpoint instead"),
    type: z.enum(["email", "twitter", "facebook", "google", "phone_number", "agent_forwarding", "any_channel", "foreign", "sdk", "messaging"]).describe("The type of this identity"),
    undeliverable_count: z.number().int().optional().describe("The number of times a soft-bounce response was received at that address"),
    updated_at: z.string().datetime().optional().describe("The time the identity was updated"),
    url: z.string().optional().describe("The API url of this identity"),
    user_id: z.number().int().describe("The id of the user"),
    value: z.string().describe("The identifier for this identity, such as an email address"),
    verification_method: z.enum(["none", "low", "sso", "embed", "full"]).optional().describe("Indicates the state of user identity verification. See [Verification method](#verification-method)."),
    verified: z.boolean().optional().describe("If the identity has been verified. Deprecated. Use `verification_method` as a more accurate representation of a user's state of verification."),
    verified_at: z.string().datetime().nullable().optional().describe("The last time a full verification flow was completed for the identity"),
  }).optional(),
})

export const updateUserIdentity = pikkuSessionlessFunc({
  description: "This endpoint allows you to:\n\n* Set the specified identity as verified (by setting `verified` to \"true\" or `verification_method` to \"low\")\n* Unverify a verified identity (by setting `verified` to \"false\" or `verification_method` to \"none\")\n* Update the `value` property of the specified identity\n\nYou can't change an identity's `primary` attribute with this endpoint. You must use the [Make Identity Primary](#make-identity-primary) endpoint instead.\n\n#### Allowed For\n\n* Agents",
  input: UpdateUserIdentityInput,
  output: UpdateUserIdentityOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/users/{user_id}/identities/{user_identity_id}", data) as any
  },
})
