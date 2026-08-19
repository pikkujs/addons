import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListUsersInput = z.object({
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  page: z.number().int().min(1).optional().default(1).describe("Current page of the collection."),
  per_page: z.number().int().min(1).max(100).optional().default(10).describe("Maximum number of items to be returned in result set."),
  search: z.string().optional().describe("Limit results to those matching a string."),
  exclude: z.array(z.number().int()).optional().describe("Ensure result set excludes specific IDs."),
  include: z.array(z.number().int()).optional().describe("Limit result set to specific IDs."),
  offset: z.string().optional().describe("Offset the result set by a specific number of items."),
  order: z.enum(["asc", "desc"]).optional().default("asc").describe("Order sort attribute ascending or descending."),
  orderby: z.enum(["id", "include", "name", "registered_date", "slug", "include_slugs", "email", "url"]).optional().default("name").describe("Sort collection by user attribute."),
  slug: z.array(z.string()).optional().describe("Limit result set to users with one or more specific slugs."),
  roles: z.array(z.string()).optional().describe("Limit result set to users matching at least one specific role provided. Accepts csv list or single role."),
  capabilities: z.array(z.string()).optional().describe("Limit result set to users matching at least one specific capability provided. Accepts csv list or single capability."),
  who: z.literal("authors").optional().describe("Limit result set to users who are considered authors."),
  has_published_posts: z.array(z.enum(["post", "page", "attachment", "nav_menu_item", "wp_block", "wp_template", "wp_template_part", "wp_global_styles", "wp_navigation", "wp_font_family", "wp_font_face"])).optional().describe("Limit result set to users who have published posts."),
  search_columns: z.array(z.enum(["email", "name", "id", "username", "slug"])).optional().describe("Array of column names to be searched."),
})

export const ListUsersOutput = z.array(z.object({
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
}))

export const listUsers = pikkuSessionlessFunc({
  input: ListUsersInput,
  output: ListUsersOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/users", data) as any
  },
})
