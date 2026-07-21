import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListThemesInput = z.object({
  status: z.array(z.enum(["active", "inactive"])).optional().describe("Limit result set to themes assigned one or more statuses."),
})

export const ListThemesOutput = z.array(z.object({
  stylesheet: z.string().optional().describe("The theme's stylesheet. This uniquely identifies the theme."),
  stylesheet_uri: z.string().url().optional().describe("The uri for the theme's stylesheet directory."),
  template: z.string().optional().describe("The theme's template. If this is a child theme, this refers to the parent theme, otherwise this is the same as the theme's stylesheet."),
  template_uri: z.string().url().optional().describe("The uri for the theme's template directory. If this is a child theme, this refers to the parent theme, otherwise this is the same as the theme's stylesheet directory."),
  author: z.object({
    raw: z.string().optional().describe("The theme author's name, as found in the theme header."),
    rendered: z.string().optional().describe("HTML for the theme author, transformed for display."),
  }).optional().describe("The theme author."),
  author_uri: z.object({
    raw: z.string().url().optional().describe("The website of the theme author, as found in the theme header."),
    rendered: z.string().url().optional().describe("The website of the theme author, transformed for display."),
  }).optional().describe("The website of the theme author."),
  description: z.object({
    raw: z.string().optional().describe("The theme description, as found in the theme header."),
    rendered: z.string().optional().describe("The theme description, transformed for display."),
  }).optional().describe("A description of the theme."),
  is_block_theme: z.boolean().optional().describe("Whether the theme is a block-based theme."),
  name: z.object({
    raw: z.string().optional().describe("The theme name, as found in the theme header."),
    rendered: z.string().optional().describe("The theme name, transformed for display."),
  }).optional().describe("The name of the theme."),
  requires_php: z.string().optional().describe("The minimum PHP version required for the theme to work."),
  requires_wp: z.string().optional().describe("The minimum WordPress version required for the theme to work."),
  screenshot: z.string().url().optional().describe("The theme's screenshot URL."),
  tags: z.object({
    raw: z.array(z.string()).optional().describe("The theme tags, as found in the theme header."),
    rendered: z.string().optional().describe("The theme tags, transformed for display."),
  }).optional().describe("Tags indicating styles and features of the theme."),
  textdomain: z.string().optional().describe("The theme's text domain."),
  theme_supports: z.object({
    "align-wide": z.boolean().optional().default(false).describe("Whether theme opts in to wide alignment CSS class."),
    "automatic-feed-links": z.boolean().optional().default(false).describe("Whether posts and comments RSS feed links are added to head."),
    "block-templates": z.boolean().optional().default(false).describe("Whether a theme uses block-based templates."),
    "block-template-parts": z.boolean().optional().default(false).describe("Whether a theme uses block-based template parts."),
    "custom-background": z.union([z.boolean(), z.record(z.string(), z.unknown())]).optional().describe("Custom background if defined by the theme."),
    "custom-header": z.union([z.boolean(), z.record(z.string(), z.unknown())]).optional().describe("Custom header if defined by the theme."),
    "custom-logo": z.union([z.boolean(), z.record(z.string(), z.unknown())]).optional().describe("Custom logo if defined by the theme."),
    "customize-selective-refresh-widgets": z.boolean().optional().default(false).describe("Whether the theme enables Selective Refresh for Widgets being managed with the Customizer."),
    "dark-editor-style": z.boolean().optional().default(false).describe("Whether theme opts in to the dark editor style UI."),
    "disable-custom-colors": z.boolean().optional().default(false).describe("Whether the theme disables custom colors."),
    "disable-custom-font-sizes": z.boolean().optional().default(false).describe("Whether the theme disables custom font sizes."),
    "disable-custom-gradients": z.boolean().optional().default(false).describe("Whether the theme disables custom gradients."),
    "disable-layout-styles": z.boolean().optional().default(false).describe("Whether the theme disables generated layout styles."),
    "editor-color-palette": z.union([z.boolean(), z.array(z.object({
      name: z.string().optional(),
      slug: z.string().optional(),
      color: z.string().optional(),
    }))]).optional().describe("Custom color palette if defined by the theme."),
    "editor-font-sizes": z.union([z.boolean(), z.array(z.object({
      name: z.string().optional(),
      size: z.number().optional(),
      slug: z.string().optional(),
    }))]).optional().describe("Custom font sizes if defined by the theme."),
    "editor-gradient-presets": z.union([z.boolean(), z.array(z.object({
      name: z.string().optional(),
      gradient: z.string().optional(),
      slug: z.string().optional(),
    }))]).optional().describe("Custom gradient presets if defined by the theme."),
    "editor-spacing-sizes": z.union([z.boolean(), z.array(z.object({
      name: z.string().optional(),
      size: z.string().optional(),
      slug: z.string().optional(),
    }))]).optional().describe("Custom spacing sizes if defined by the theme."),
    "editor-styles": z.boolean().optional().default(false).describe("Whether theme opts in to the editor styles CSS wrapper."),
    html5: z.union([z.boolean(), z.array(z.enum(["search-form", "comment-form", "comment-list", "gallery", "caption", "script", "style"]))]).optional().describe("Allows use of HTML5 markup for search forms, comment forms, comment lists, gallery, and caption."),
    formats: z.array(z.enum(["standard", "aside", "chat", "gallery", "link", "image", "quote", "status", "video", "audio"])).optional().default(["standard"]).describe("Post formats supported."),
    "post-thumbnails": z.union([z.boolean(), z.array(z.string())]).optional().describe("The post types that support thumbnails or true if all post types are supported."),
    "responsive-embeds": z.boolean().optional().default(false).describe("Whether the theme supports responsive embedded content."),
    "title-tag": z.boolean().optional().default(false).describe("Whether the theme can manage the document title tag."),
    "wp-block-styles": z.boolean().optional().default(false).describe("Whether theme opts in to default WordPress block styles for viewing."),
  }).optional().describe("Features supported by this theme."),
  theme_uri: z.object({
    raw: z.string().url().optional().describe("The URI of the theme's webpage, as found in the theme header."),
    rendered: z.string().url().optional().describe("The URI of the theme's webpage, transformed for display."),
  }).optional().describe("The URI of the theme's webpage."),
  version: z.string().optional().describe("The theme's current version."),
  status: z.enum(["inactive", "active"]).optional().describe("A named status for the theme."),
  default_template_types: z.array(z.object({
    slug: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })).optional().describe("A list of default template types."),
  default_template_part_areas: z.array(z.object({
    area: z.string().optional(),
    label: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    area_tag: z.string().optional(),
  })).optional().describe("A list of allowed area values for template parts."),
}))

export const listThemes = pikkuSessionlessFunc({
  input: ListThemesInput,
  output: ListThemesOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/themes", data) as any
  },
})
