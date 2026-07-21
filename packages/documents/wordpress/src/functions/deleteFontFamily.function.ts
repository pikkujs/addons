import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteFontFamilyInput = z.object({
  id: z.string().describe("Unique identifier for the post."),
  force: z.boolean().optional().default(false).describe("Whether to bypass Trash and force deletion."),
})

export const DeleteFontFamilyOutput = z.object({
  id: z.number().int().optional().describe("Unique identifier for the post."),
  theme_json_version: z.number().int().min(2).max(3).optional().default(3).describe("Version of the theme.json schema used for the typography settings."),
  font_faces: z.array(z.number().int()).optional().describe("The IDs of the child font faces in the font family."),
  font_family_settings: z.object({
    name: z.string().optional().describe("Name of the font family preset, translatable."),
    slug: z.string().optional().describe("Kebab-case unique identifier for the font family preset."),
    fontFamily: z.string().optional().describe("CSS font-family value."),
    preview: z.string().url().optional().default("").describe("URL to a preview image of the font family."),
  }).optional().describe("font-face definition in theme.json format."),
})

export const deleteFontFamily = pikkuSessionlessFunc({
  input: DeleteFontFamilyInput,
  output: DeleteFontFamilyOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("DELETE", "/font-families/{id}", data) as any
  },
})
