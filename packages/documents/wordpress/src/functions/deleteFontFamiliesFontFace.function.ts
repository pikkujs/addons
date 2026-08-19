import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteFontFamiliesFontFaceInput = z.object({
  font_family_id: z.string().describe("The ID for the parent font family of the font face."),
  id: z.string().describe("Unique identifier for the font face."),
  force: z.boolean().optional().default(false).describe("Whether to bypass Trash and force deletion."),
})

export const DeleteFontFamiliesFontFaceOutput = z.object({
  id: z.number().int().optional().describe("Unique identifier for the post."),
  theme_json_version: z.number().int().min(2).max(3).optional().default(3).describe("Version of the theme.json schema used for the typography settings."),
  parent: z.number().int().optional().describe("The ID for the parent font family of the font face."),
  font_face_settings: z.object({
    fontFamily: z.string().optional().default("").describe("CSS font-family value."),
    fontStyle: z.string().optional().default("normal").describe("CSS font-style value."),
    fontWeight: z.union([z.string(), z.number().int()]).optional().describe("List of available font weights, separated by a space."),
    fontDisplay: z.enum(["auto", "block", "fallback", "swap", "optional"]).optional().default("fallback").describe("CSS font-display value."),
    src: z.union([z.string(), z.array(z.string())]).optional().describe("Paths or URLs to the font files."),
    fontStretch: z.string().optional().describe("CSS font-stretch value."),
    ascentOverride: z.string().optional().describe("CSS ascent-override value."),
    descentOverride: z.string().optional().describe("CSS descent-override value."),
    fontVariant: z.string().optional().describe("CSS font-variant value."),
    fontFeatureSettings: z.string().optional().describe("CSS font-feature-settings value."),
    fontVariationSettings: z.string().optional().describe("CSS font-variation-settings value."),
    lineGapOverride: z.string().optional().describe("CSS line-gap-override value."),
    sizeAdjust: z.string().optional().describe("CSS size-adjust value."),
    unicodeRange: z.string().optional().describe("CSS unicode-range value."),
    preview: z.string().url().optional().default("").describe("URL to a preview image of the font face."),
  }).optional().describe("font-face declaration in theme.json format."),
})

export const deleteFontFamiliesFontFace = pikkuSessionlessFunc({
  input: DeleteFontFamiliesFontFaceInput,
  output: DeleteFontFamiliesFontFaceOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("DELETE", "/font-families/{font_family_id}/font-faces/{id}", data) as any
  },
})
