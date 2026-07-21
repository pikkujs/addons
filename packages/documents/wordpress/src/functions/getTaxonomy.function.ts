import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetTaxonomyInput = z.object({
  taxonomy: z.string().describe("An alphanumeric identifier for the taxonomy."),
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const GetTaxonomyOutput = z.object({
  capabilities: z.record(z.string(), z.unknown()).optional().describe("All capabilities used by the taxonomy."),
  description: z.string().optional().describe("A human-readable description of the taxonomy."),
  hierarchical: z.boolean().optional().describe("Whether or not the taxonomy should have children."),
  labels: z.record(z.string(), z.unknown()).optional().describe("Human-readable labels for the taxonomy for various contexts."),
  name: z.string().optional().describe("The title for the taxonomy."),
  slug: z.string().optional().describe("An alphanumeric identifier for the taxonomy."),
  show_cloud: z.boolean().optional().describe("Whether or not the term cloud should be displayed."),
  types: z.array(z.string()).optional().describe("Types associated with the taxonomy."),
  rest_base: z.string().optional().describe("REST base route for the taxonomy."),
  rest_namespace: z.string().optional().describe("REST namespace route for the taxonomy."),
  visibility: z.object({
    public: z.boolean().optional().describe("Whether a taxonomy is intended for use publicly either via the admin interface or by front-end users."),
    publicly_queryable: z.boolean().optional().describe("Whether the taxonomy is publicly queryable."),
    show_ui: z.boolean().optional().describe("Whether to generate a default UI for managing this taxonomy."),
    show_admin_column: z.boolean().optional().describe("Whether to allow automatic creation of taxonomy columns on associated post-types table."),
    show_in_nav_menus: z.boolean().optional().describe("Whether to make the taxonomy available for selection in navigation menus."),
    show_in_quick_edit: z.boolean().optional().describe("Whether to show the taxonomy in the quick/bulk edit panel."),
  }).optional().describe("The visibility settings for the taxonomy."),
})

export const getTaxonomy = pikkuSessionlessFunc({
  input: GetTaxonomyInput,
  output: GetTaxonomyOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/taxonomies/{taxonomy}", data) as any
  },
})
