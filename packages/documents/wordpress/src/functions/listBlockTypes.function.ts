import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListBlockTypesInput = z.object({
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
  namespace: z.string().optional().describe("Block namespace."),
})

export const ListBlockTypesOutput = z.array(z.object({
  api_version: z.number().int().optional().default(1).describe("Version of block API."),
  title: z.string().optional().default("").describe("Title of block type."),
  name: z.string().regex(new RegExp("^[a-z][a-z0-9-]*/[a-z][a-z0-9-]*$")).optional().describe("Unique name identifying the block type."),
  description: z.string().optional().default("").describe("Description of block type."),
  icon: z.string().nullable().optional().describe("Icon of block type."),
  attributes: z.record(z.string(), z.record(z.string(), z.unknown())).nullable().optional().describe("Block attributes."),
  provides_context: z.record(z.string(), z.string()).optional().describe("Context provided by blocks of this type."),
  uses_context: z.array(z.string()).optional().default([]).describe("Context values inherited by blocks of this type."),
  selectors: z.record(z.string(), z.unknown()).optional().describe("Custom CSS selectors."),
  supports: z.record(z.string(), z.unknown()).optional().describe("Block supports."),
  category: z.string().nullable().optional().describe("Block category."),
  is_dynamic: z.boolean().optional().default(false).describe("Is the block dynamically rendered."),
  editor_script_handles: z.array(z.string()).optional().default([]).describe("Editor script handles."),
  script_handles: z.array(z.string()).optional().default([]).describe("Public facing and editor script handles."),
  view_script_handles: z.array(z.string()).optional().default([]).describe("Public facing script handles."),
  view_script_module_ids: z.array(z.string()).optional().default([]).describe("Public facing script module IDs."),
  editor_style_handles: z.array(z.string()).optional().default([]).describe("Editor style handles."),
  style_handles: z.array(z.string()).optional().default([]).describe("Public facing and editor style handles."),
  view_style_handles: z.array(z.string()).optional().default([]).describe("Public facing style handles."),
  styles: z.array(z.object({
    name: z.string().optional().describe("Unique name identifying the style."),
    label: z.string().optional().describe("The human-readable label for the style."),
    inline_style: z.string().optional().describe("Inline CSS code that registers the CSS class required for the style."),
    style_handle: z.string().optional().describe("Contains the handle that defines the block style."),
  })).optional().default([]).describe("Block style variations."),
  variations: z.array(z.object({
    name: z.string().optional().describe("The unique and machine-readable name."),
    title: z.string().optional().describe("A human-readable variation title."),
    description: z.string().optional().describe("A detailed variation description."),
    category: z.string().nullable().optional().describe("Block category."),
    icon: z.string().nullable().optional().describe("Icon of block type."),
    isDefault: z.boolean().optional().default(false).describe("Indicates whether the current variation is the default one."),
    attributes: z.record(z.string(), z.unknown()).optional().describe("The initial values for attributes."),
    innerBlocks: z.array(z.object({
      name: z.string().regex(new RegExp("^[a-z][a-z0-9-]*/[a-z][a-z0-9-]*$")).optional().describe("The name of the inner block."),
      attributes: z.record(z.string(), z.unknown()).optional().describe("The attributes of the inner block."),
      innerBlocks: z.array(z.string()).optional().describe("A list of the inner block's own inner blocks. This is a recursive definition following the parent innerBlocks schema."),
    })).optional().describe("The list of inner blocks used in the example."),
    example: z.object({
      attributes: z.record(z.string(), z.unknown()).optional().describe("The attributes used in the example."),
      innerBlocks: z.array(z.object({
        name: z.string().regex(new RegExp("^[a-z][a-z0-9-]*/[a-z][a-z0-9-]*$")).optional().describe("The name of the inner block."),
        attributes: z.record(z.string(), z.unknown()).optional().describe("The attributes of the inner block."),
        innerBlocks: z.array(z.string()).optional().describe("A list of the inner block's own inner blocks. This is a recursive definition following the parent innerBlocks schema."),
      })).optional().describe("The list of inner blocks used in the example."),
    }).nullable().optional().describe("Block example."),
    scope: z.array(z.enum(["block", "inserter", "transform"])).nullable().optional().describe("The list of scopes where the variation is applicable. When not provided, it assumes all available scopes."),
    keywords: z.array(z.string()).optional().default([]).describe("Block keywords."),
  })).optional().describe("Block variations."),
  textdomain: z.string().nullable().optional().describe("Public text domain."),
  parent: z.array(z.string()).nullable().optional().describe("Parent blocks."),
  ancestor: z.array(z.string()).nullable().optional().describe("Ancestor blocks."),
  allowed_blocks: z.array(z.string()).nullable().optional().describe("Allowed child block types."),
  keywords: z.array(z.string()).optional().default([]).describe("Block keywords."),
  example: z.object({
    attributes: z.record(z.string(), z.unknown()).optional().describe("The attributes used in the example."),
    innerBlocks: z.array(z.object({
      name: z.string().regex(new RegExp("^[a-z][a-z0-9-]*/[a-z][a-z0-9-]*$")).optional().describe("The name of the inner block."),
      attributes: z.record(z.string(), z.unknown()).optional().describe("The attributes of the inner block."),
      innerBlocks: z.array(z.string()).optional().describe("A list of the inner block's own inner blocks. This is a recursive definition following the parent innerBlocks schema."),
    })).optional().describe("The list of inner blocks used in the example."),
  }).nullable().optional().describe("Block example."),
  block_hooks: z.record(z.string(), z.string()).optional().describe("This block is automatically inserted near any occurrence of the block types used as keys of this map, into a relative position given by the corresponding value."),
  editor_script: z.string().nullable().optional().describe("Editor script handle. DEPRECATED: Use `editor_script_handles` instead."),
  script: z.string().nullable().optional().describe("Public facing and editor script handle. DEPRECATED: Use `script_handles` instead."),
  view_script: z.string().nullable().optional().describe("Public facing script handle. DEPRECATED: Use `view_script_handles` instead."),
  editor_style: z.string().nullable().optional().describe("Editor style handle. DEPRECATED: Use `editor_style_handles` instead."),
  style: z.string().nullable().optional().describe("Public facing and editor style handle. DEPRECATED: Use `style_handles` instead."),
}))

export const listBlockTypes = pikkuSessionlessFunc({
  input: ListBlockTypesInput,
  output: ListBlockTypesOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/block-types", data) as any
  },
})
