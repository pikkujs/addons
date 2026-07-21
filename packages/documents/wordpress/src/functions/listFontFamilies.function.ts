import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListFontFamiliesInput = z.object({
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  page: z.number().int().min(1).optional().default(1).describe("Current page of the collection."),
  per_page: z.number().int().min(1).max(100).optional().default(10).describe("Maximum number of items to be returned in result set."),
  exclude: z.array(z.number().int()).optional().describe("Ensure result set excludes specific IDs."),
  include: z.array(z.number().int()).optional().describe("Limit result set to specific IDs."),
  search_semantics: z.literal("exact").optional().describe("How to interpret the search input."),
  offset: z.string().optional().describe("Offset the result set by a specific number of items."),
  order: z.enum(["asc", "desc"]).optional().default("desc").describe("Order sort attribute ascending or descending."),
  orderby: z.enum(["id", "include"]).optional().default("id").describe("Sort collection by post attribute."),
  slug: z.array(z.string()).optional().describe("Limit result set to posts with one or more specific slugs."),
})

export const ListFontFamiliesOutput = z.array(z.object({
  id: z.number().int().optional().describe("Unique identifier for the post."),
  theme_json_version: z.number().int().min(2).max(3).optional().default(3).describe("Version of the theme.json schema used for the typography settings."),
  font_faces: z.array(z.number().int()).optional().describe("The IDs of the child font faces in the font family."),
  font_family_settings: z.object({
    name: z.string().optional().describe("Name of the font family preset, translatable."),
    slug: z.string().optional().describe("Kebab-case unique identifier for the font family preset."),
    fontFamily: z.string().optional().describe("CSS font-family value."),
    preview: z.string().url().optional().default("").describe("URL to a preview image of the font family."),
  }).optional().describe("font-face definition in theme.json format."),
}))

export const listFontFamilies = pikkuSessionlessFunc({
  input: ListFontFamiliesInput,
  output: ListFontFamiliesOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/font-families", data) as any
  },
})
