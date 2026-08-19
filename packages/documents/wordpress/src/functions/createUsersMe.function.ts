import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateUsersMeInput = z.object({
  username: z.string().optional().describe("Login name for the user."),
  name: z.string().optional().describe("Display name for the user."),
  first_name: z.string().optional().describe("First name for the user."),
  last_name: z.string().optional().describe("Last name for the user."),
  email: z.string().email().optional().describe("The email address for the user."),
  url: z.string().url().optional().describe("URL of the user."),
  description: z.string().optional().describe("Description of the user."),
  locale: z.enum(["", "en_US"]).optional().describe("Locale for the user."),
  nickname: z.string().optional().describe("The nickname for the user."),
  slug: z.string().optional().describe("An alphanumeric identifier for the user."),
  roles: z.array(z.string()).optional().describe("Roles assigned to the user."),
  password: z.string().optional().describe("Password for the user (never included)."),
  meta: z.object({
  persisted_preferences: z.object({
    _modified: z.string().datetime().optional().describe("The date and time the preferences were updated."),
  }).optional(),
}).optional().describe("Meta fields."),
})

export const CreateUsersMeOutput = z.object({
  id: z.number().int().optional().describe("Unique identifier for the user."),
  username: z.string().optional().describe("Login name for the user."),
  name: z.string().optional().describe("Display name for the user."),
  first_name: z.string().optional().describe("First name for the user."),
  last_name: z.string().optional().describe("Last name for the user."),
  email: z.string().email().optional().describe("The email address for the user."),
  url: z.string().url().optional().describe("URL of the user."),
  description: z.string().optional().describe("Description of the user."),
  link: z.string().url().optional().describe("Author URL of the user."),
  locale: z.enum(["", "en_US"]).optional().describe("Locale for the user."),
  nickname: z.string().optional().describe("The nickname for the user."),
  slug: z.string().optional().describe("An alphanumeric identifier for the user."),
  registered_date: z.string().datetime().optional().describe("Registration date for the user."),
  roles: z.array(z.string()).optional().describe("Roles assigned to the user."),
  password: z.string().optional().describe("Password for the user (never included)."),
  capabilities: z.record(z.string(), z.unknown()).optional().describe("All capabilities assigned to the user."),
  extra_capabilities: z.record(z.string(), z.unknown()).optional().describe("Any extra capabilities assigned to the user."),
  avatar_urls: z.object({
    "24": z.string().url().optional().describe("Avatar URL with image size of 24 pixels."),
    "48": z.string().url().optional().describe("Avatar URL with image size of 48 pixels."),
    "96": z.string().url().optional().describe("Avatar URL with image size of 96 pixels."),
  }).optional().describe("Avatar URLs for the user."),
  meta: z.object({
    persisted_preferences: z.object({
      _modified: z.string().datetime().optional().describe("The date and time the preferences were updated."),
    }).optional(),
  }).optional().describe("Meta fields."),
})

export const createUsersMe = pikkuSessionlessFunc({
  input: CreateUsersMeInput,
  output: CreateUsersMeOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/users/me", data) as any
  },
})
