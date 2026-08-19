import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteTemplatePartsRevisionInput = z.object({
  parent: z.string().describe("The id of a template"),
  id: z.string().describe("Unique identifier for the revision."),
  force: z.boolean().optional().default(false).describe("Required to be true, as revisions do not support trashing."),
})

export const DeleteTemplatePartsRevisionOutput = z.object({
  id: z.string().optional().describe("ID of template."),
  slug: z.string().min(1).regex(new RegExp("[a-zA-Z0-9_\\%-]+")).optional().describe("Unique slug identifying the template."),
  theme: z.string().optional().describe("Theme identifier for the template."),
  type: z.string().optional().describe("Type of template."),
  source: z.string().optional().describe("Source of template"),
  origin: z.string().optional().describe("Source of a customized template"),
  content: z.union([z.record(z.string(), z.unknown()), z.string()]).optional().describe("Content of template."),
  title: z.union([z.record(z.string(), z.unknown()), z.string()]).optional().describe("Title of template."),
  description: z.string().optional().default("").describe("Description of template."),
  status: z.enum(["publish", "future", "draft", "pending", "private"]).optional().default("publish").describe("Status of template."),
  wp_id: z.number().int().optional().describe("Post ID."),
  has_theme_file: z.boolean().optional().describe("Theme file exists."),
  author: z.number().int().optional().describe("The ID for the author of the template."),
  modified: z.string().datetime().optional().describe("The date the template was last modified, in the site's timezone."),
  author_text: z.string().optional().describe("Human readable text for the author."),
  original_source: z.enum(["theme", "plugin", "site", "user"]).optional().describe("Where the template originally comes from e.g. 'theme'"),
  area: z.string().optional().describe("Where the template part is intended for use (header, footer, etc.)"),
})

export const deleteTemplatePartsRevision = pikkuSessionlessFunc({
  input: DeleteTemplatePartsRevisionInput,
  output: DeleteTemplatePartsRevisionOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("DELETE", "/template-parts/{parent}/revisions/{id}", data) as any
  },
})
