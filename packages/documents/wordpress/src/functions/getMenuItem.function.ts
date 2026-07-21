import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetMenuItemInput = z.object({
  id: z.string().describe("Unique identifier for the post."),
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const GetMenuItemOutput = z.object({
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
})

export const getMenuItem = pikkuSessionlessFunc({
  input: GetMenuItemInput,
  output: GetMenuItemOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/menu-items/{id}", data) as any
  },
})
