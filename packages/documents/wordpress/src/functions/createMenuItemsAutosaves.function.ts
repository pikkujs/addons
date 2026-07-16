import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateMenuItemsAutosavesInput = z.object({
  id: z.string(),
  parent: z.number().int().min(0).optional().describe("The ID for the parent of the object."),
  title: z.union([z.string(), z.record(z.string(), z.unknown())]).optional().describe("The title for the object."),
  type: z.enum(["taxonomy", "post_type", "post_type_archive", "custom"]).optional().describe("The family of objects originally represented, such as \"post_type\" or \"taxonomy\"."),
  status: z.enum(["publish", "future", "draft", "pending", "private"]).optional().describe("A named status for the object."),
  attr_title: z.string().optional().describe("Text for the title attribute of the link element for this menu item."),
  classes: z.array(z.string()).optional().describe("Class names for the link element of this menu item."),
  description: z.string().optional().describe("The description of this menu item."),
  menu_order: z.number().int().min(1).optional().describe("The DB ID of the nav_menu_item that is this item's menu parent, if any, otherwise 0."),
  object: z.string().optional().describe("The type of object originally represented, such as \"category\", \"post\", or \"attachment\"."),
  object_id: z.number().int().min(0).optional().describe("The database ID of the original object this menu item represents, for example the ID for posts or the term_id for categories."),
  target: z.enum(["_blank", ""]).optional().describe("The target attribute of the link element for this menu item."),
  url: z.string().url().optional().describe("The URL to which this menu item points."),
  xfn: z.array(z.string()).optional().describe("The XFN relationship expressed in the link of this menu item."),
  menus: z.number().int().optional().describe("The terms assigned to the object in the nav_menu taxonomy."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
})

export const CreateMenuItemsAutosavesOutput = z.object({
  author: z.number().int().optional().describe("The ID for the author of the revision."),
  date: z.string().datetime().optional().describe("The date the revision was published, in the site's timezone."),
  date_gmt: z.string().datetime().optional().describe("The date the revision was published, as GMT."),
  guid: z.string().optional().describe("GUID for the revision, as it exists in the database."),
  id: z.number().int().optional().describe("Unique identifier for the revision."),
  modified: z.string().datetime().optional().describe("The date the revision was last modified, in the site's timezone."),
  modified_gmt: z.string().datetime().optional().describe("The date the revision was last modified, as GMT."),
  parent: z.number().int().optional().describe("The ID for the parent of the revision."),
  slug: z.string().optional().describe("An alphanumeric identifier for the revision unique to its type."),
  title: z.union([z.string(), z.record(z.string(), z.unknown())]).optional().describe("The title for the object."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
  preview_link: z.string().url().optional().describe("Preview link for the post."),
})

export const createMenuItemsAutosaves = pikkuSessionlessFunc({
  input: CreateMenuItemsAutosavesInput,
  output: CreateMenuItemsAutosavesOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/menu-items/{id}/autosaves", data) as any
  },
})
