import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateNavigationInput = z.object({
  id: z.string().describe("Unique identifier for the post."),
  date: z.string().datetime().nullable().optional().describe("The date the post was published, in the site's timezone."),
  date_gmt: z.string().datetime().nullable().optional().describe("The date the post was published, as GMT."),
  slug: z.string().optional().describe("An alphanumeric identifier for the post unique to its type."),
  status: z.enum(["publish", "future", "draft", "pending", "private"]).optional().describe("A named status for the post."),
  password: z.string().optional().describe("A password to protect access to the content and excerpt."),
  title: z.object({
  raw: z.string().optional().describe("Title for the post, as it exists in the database."),
  rendered: z.string().optional().describe("HTML title for the post, transformed for display."),
}).optional().describe("The title for the post."),
  content: z.object({
  raw: z.string().optional().describe("Content for the post, as it exists in the database."),
  rendered: z.string().optional().describe("HTML content for the post, transformed for display."),
  block_version: z.number().int().optional().describe("Version of the content block format used by the post."),
  protected: z.boolean().optional().describe("Whether the content is protected with a password."),
}).optional().describe("The content for the post."),
  template: z.string().optional().describe("The theme file to use to display the post."),
})

export const UpdateNavigationOutput = z.object({
  date: z.string().datetime().nullable().optional().describe("The date the post was published, in the site's timezone."),
  date_gmt: z.string().datetime().nullable().optional().describe("The date the post was published, as GMT."),
  guid: z.object({
    raw: z.string().optional().describe("GUID for the post, as it exists in the database."),
    rendered: z.string().optional().describe("GUID for the post, transformed for display."),
  }).optional().describe("The globally unique identifier for the post."),
  id: z.number().int().optional().describe("Unique identifier for the post."),
  link: z.string().url().optional().describe("URL to the post."),
  modified: z.string().datetime().optional().describe("The date the post was last modified, in the site's timezone."),
  modified_gmt: z.string().datetime().optional().describe("The date the post was last modified, as GMT."),
  slug: z.string().optional().describe("An alphanumeric identifier for the post unique to its type."),
  status: z.enum(["publish", "future", "draft", "pending", "private"]).optional().describe("A named status for the post."),
  type: z.string().optional().describe("Type of post."),
  password: z.string().optional().describe("A password to protect access to the content and excerpt."),
  title: z.object({
    raw: z.string().optional().describe("Title for the post, as it exists in the database."),
    rendered: z.string().optional().describe("HTML title for the post, transformed for display."),
  }).optional().describe("The title for the post."),
  content: z.object({
    raw: z.string().optional().describe("Content for the post, as it exists in the database."),
    rendered: z.string().optional().describe("HTML content for the post, transformed for display."),
    block_version: z.number().int().optional().describe("Version of the content block format used by the post."),
    protected: z.boolean().optional().describe("Whether the content is protected with a password."),
  }).optional().describe("The content for the post."),
  template: z.string().optional().describe("The theme file to use to display the post."),
})

export const updateNavigation = pikkuSessionlessFunc({
  input: UpdateNavigationInput,
  output: UpdateNavigationOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("PUT", "/navigation/{id}", data) as any
  },
})
