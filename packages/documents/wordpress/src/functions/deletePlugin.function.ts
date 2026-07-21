import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeletePluginInput = z.object({
  plugin: z.string(),
})

export const DeletePluginOutput = z.object({
  plugin: z.string().regex(new RegExp("[^.\\/]+(?:\\/[^.\\/]+)?")).optional().describe("The plugin file."),
  status: z.enum(["inactive", "active"]).optional().describe("The plugin activation status."),
  name: z.string().optional().describe("The plugin name."),
  plugin_uri: z.string().url().optional().describe("The plugin's website address."),
  author: z.string().optional().describe("The plugin author."),
  author_uri: z.string().url().optional().describe("Plugin author's website address."),
  description: z.object({
    raw: z.string().optional().describe("The raw plugin description."),
    rendered: z.string().optional().describe("The plugin description formatted for display."),
  }).optional().describe("The plugin description."),
  version: z.string().optional().describe("The plugin version number."),
  network_only: z.boolean().optional().describe("Whether the plugin can only be activated network-wide."),
  requires_wp: z.string().optional().describe("Minimum required version of WordPress."),
  requires_php: z.string().optional().describe("Minimum required version of PHP."),
  textdomain: z.string().optional().describe("The plugin's text domain."),
})

export const deletePlugin = pikkuSessionlessFunc({
  input: DeletePluginInput,
  output: DeletePluginOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("DELETE", "/plugins/{plugin}", data) as any
  },
})
