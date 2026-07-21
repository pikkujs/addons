import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UsersProfileGetInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `users.profile:read`"),
  include_labels: z.boolean().optional().describe("Include labels for each ID in custom profile fields"),
  user: z.string().optional().describe("User to retrieve profile info for"),
})

export const UsersProfileGetOutput = z.object({
  ok: z.literal(true),
  profile: z.object({
    always_active: z.boolean().optional(),
    api_app_id: z.string().regex(new RegExp("^(A[A-Z0-9]{1,})?$")).optional(),
    avatar_hash: z.string(),
    bot_id: z.string().regex(new RegExp("^B[A-Z0-9]{8,}$")).optional(),
    display_name: z.string(),
    display_name_normalized: z.string(),
    email: z.string().email().nullable().optional(),
    fields: z.union([z.record(z.string(), z.unknown()), z.array(z.unknown())]).nullable(),
    first_name: z.string().nullable().optional(),
    guest_expiration_ts: z.number().int().nullable().optional(),
    guest_invited_by: z.string().nullable().optional(),
    image_1024: z.string().url().nullable().optional(),
    image_192: z.string().url().nullable().optional(),
    image_24: z.string().url().nullable().optional(),
    image_32: z.string().url().nullable().optional(),
    image_48: z.string().url().nullable().optional(),
    image_512: z.string().url().nullable().optional(),
    image_72: z.string().url().nullable().optional(),
    image_original: z.string().url().nullable().optional(),
    is_app_user: z.boolean().optional(),
    is_custom_image: z.boolean().optional(),
    is_restricted: z.boolean().nullable().optional(),
    is_ultra_restricted: z.boolean().nullable().optional(),
    last_avatar_image_hash: z.string().optional(),
    last_name: z.string().nullable().optional(),
    memberships_count: z.number().int().optional(),
    name: z.string().nullable().optional(),
    phone: z.string(),
    pronouns: z.string().optional(),
    real_name: z.string(),
    real_name_normalized: z.string(),
    skype: z.string(),
    status_default_emoji: z.string().optional(),
    status_default_text: z.string().optional(),
    status_default_text_canonical: z.string().nullable().optional(),
    status_emoji: z.string(),
    status_expiration: z.number().int().optional(),
    status_text: z.string(),
    status_text_canonical: z.string().nullable().optional(),
    team: z.string().regex(new RegExp("^[TE][A-Z0-9]{8,}$")).optional(),
    title: z.string(),
    updated: z.number().int().optional(),
    user_id: z.string().optional(),
    username: z.string().nullable().optional(),
  }),
}).describe("Schema for successful response from users.profile.get method")

export const usersProfileGet = pikkuSessionlessFunc({
  description: "Retrieves a user's profile information.",
  input: UsersProfileGetInput,
  output: UsersProfileGetOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/users.profile.get", data) as any
  },
})
