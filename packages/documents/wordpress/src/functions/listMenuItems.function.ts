import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListMenuItemsInput = z.object({
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  page: z.number().int().min(1).optional().default(1).describe("Current page of the collection."),
  per_page: z.number().int().min(1).max(100).optional().default(100).describe("Maximum number of items to be returned in result set."),
  search: z.string().optional().describe("Limit results to those matching a string."),
  after: z.unknown().optional().describe("Limit response to posts published after a given ISO8601 compliant date."),
  modified_after: z.unknown().optional().describe("Limit response to posts modified after a given ISO8601 compliant date."),
  before: z.unknown().optional().describe("Limit response to posts published before a given ISO8601 compliant date."),
  modified_before: z.unknown().optional().describe("Limit response to posts modified before a given ISO8601 compliant date."),
  exclude: z.array(z.number().int()).optional().describe("Ensure result set excludes specific IDs."),
  include: z.array(z.number().int()).optional().describe("Limit result set to specific IDs."),
  search_semantics: z.literal("exact").optional().describe("How to interpret the search input."),
  offset: z.string().optional().describe("Offset the result set by a specific number of items."),
  order: z.enum(["asc", "desc"]).optional().default("asc").describe("Order sort attribute ascending or descending."),
  orderby: z.enum(["author", "date", "id", "include", "modified", "parent", "relevance", "slug", "include_slugs", "title", "menu_order"]).optional().default("menu_order").describe("Sort collection by object attribute."),
  search_columns: z.array(z.enum(["post_title", "post_content", "post_excerpt"])).optional().describe("Array of column names to be searched."),
  slug: z.array(z.string()).optional().describe("Limit result set to posts with one or more specific slugs."),
  status: z.array(z.enum(["publish", "future", "draft", "pending", "private", "trash", "auto-draft", "inherit", "request-pending", "request-confirmed", "request-failed", "request-completed", "any"])).optional().describe("Limit result set to posts assigned one or more statuses."),
  tax_relation: z.enum(["AND", "OR"]).optional().describe("Limit result set based on relationship between multiple taxonomies."),
  menus: z.union([z.array(z.number().int()), z.object({
  terms: z.array(z.number().int()).optional().default([]).describe("Term IDs."),
  operator: z.enum(["AND", "OR"]).optional().default("OR").describe("Whether items must be assigned all or any of the specified terms."),
})]).optional().describe("Limit result set to items with specific terms assigned in the menus taxonomy."),
  menus_exclude: z.union([z.array(z.number().int()), z.object({
  terms: z.array(z.number().int()).optional().default([]).describe("Term IDs."),
})]).optional().describe("Limit result set to items except those with specific terms assigned in the menus taxonomy."),
  menu_order: z.string().optional().describe("Limit result set to posts with a specific menu_order value."),
})

export const ListMenuItemsOutput = z.array(z.object({
  title: z.union([z.string(), z.record(z.string(), z.unknown())]).optional().describe("The title for the object."),
  id: z.number().int().min(0).optional().default(0).describe("Unique identifier for the object."),
  type_label: z.string().optional().describe("The singular label used to describe this type of menu item."),
  type: z.enum(["taxonomy", "post_type", "post_type_archive", "custom"]).optional().default("custom").describe("The family of objects originally represented, such as \"post_type\" or \"taxonomy\"."),
  status: z.enum(["publish", "future", "draft", "pending", "private"]).optional().default("publish").describe("A named status for the object."),
  parent: z.number().int().min(0).optional().default(0).describe("The ID for the parent of the object."),
  attr_title: z.string().optional().describe("Text for the title attribute of the link element for this menu item."),
  classes: z.array(z.string()).optional().describe("Class names for the link element of this menu item."),
  description: z.string().optional().describe("The description of this menu item."),
  menu_order: z.number().int().min(1).optional().default(1).describe("The DB ID of the nav_menu_item that is this item's menu parent, if any, otherwise 0."),
  object: z.string().optional().describe("The type of object originally represented, such as \"category\", \"post\", or \"attachment\"."),
  object_id: z.number().int().min(0).optional().default(0).describe("The database ID of the original object this menu item represents, for example the ID for posts or the term_id for categories."),
  target: z.enum(["_blank", ""]).optional().describe("The target attribute of the link element for this menu item."),
  url: z.string().url().optional().describe("The URL to which this menu item points."),
  xfn: z.array(z.string()).optional().describe("The XFN relationship expressed in the link of this menu item."),
  invalid: z.boolean().optional().describe("Whether the menu item represents an object that no longer exists."),
  menus: z.number().int().optional().describe("The terms assigned to the object in the nav_menu taxonomy."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
}))

export const listMenuItems = pikkuSessionlessFunc({
  input: ListMenuItemsInput,
  output: ListMenuItemsOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/menu-items", data) as any
  },
})
