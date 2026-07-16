import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListTypesInput = z.object({
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const ListTypesOutput = z.object({
  capabilities: z.record(z.string(), z.unknown()).optional().describe("All capabilities used by the post type."),
  description: z.string().optional().describe("A human-readable description of the post type."),
  hierarchical: z.boolean().optional().describe("Whether or not the post type should have children."),
  viewable: z.boolean().optional().describe("Whether or not the post type can be viewed."),
  labels: z.record(z.string(), z.unknown()).optional().describe("Human-readable labels for the post type for various contexts."),
  name: z.string().optional().describe("The title for the post type."),
  slug: z.string().optional().describe("An alphanumeric identifier for the post type."),
  supports: z.record(z.string(), z.unknown()).optional().describe("All features, supported by the post type."),
  has_archive: z.union([z.string(), z.boolean()]).optional().describe("If the value is a string, the value will be used as the archive slug. If the value is false the post type has no archive."),
  taxonomies: z.array(z.string()).optional().describe("Taxonomies associated with post type."),
  rest_base: z.string().optional().describe("REST base route for the post type."),
  rest_namespace: z.string().optional().describe("REST route's namespace for the post type."),
  visibility: z.object({
    show_ui: z.boolean().optional().describe("Whether to generate a default UI for managing this post type."),
    show_in_nav_menus: z.boolean().optional().describe("Whether to make the post type available for selection in navigation menus."),
  }).optional().describe("The visibility settings for the post type."),
  icon: z.string().nullable().optional().describe("The icon for the post type."),
  template: z.array(z.string()).optional().describe("The block template associated with the post type."),
  template_lock: z.union([z.enum(["all", "insert", "contentOnly"]), z.literal(false)]).optional().describe("The template_lock associated with the post type, or false if none."),
})

export const listTypes = pikkuSessionlessFunc({
  input: ListTypesInput,
  output: ListTypesOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/types", data) as any
  },
})
