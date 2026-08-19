import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateEndUserIdentityInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  "type[]": z.enum(["email", "phone_number"]).optional().describe("Filters results by one or more identity types using the format `?type[]={type}&type[]={type}`"),
  brand_id: z.number().int().optional().describe("When brand separation is enabled, associates the new identity with the specified brand."),
})

export const CreateEndUserIdentityOutput = z.object({
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

export const createEndUserIdentity = pikkuSessionlessFunc({
  description: "Adds an identity to an end user's profile.\n\nSupported identity types for end users:\n\n| Type             | Example |\n| ---------------- | ------- |\n| email            | `{ \"type\" : \"email\", \"value\" : \"someone@example.com\" }` |\n| phone_number     | `{ \"type\" : \"phone_number\", \"value\" : \"+1 555-123-4567\" }` |\n\n#### Allowed For\n\n* Verified end users",
  input: CreateEndUserIdentityInput,
  output: CreateEndUserIdentityOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/end_users/{user_id}/identities", data) as any
  },
})
