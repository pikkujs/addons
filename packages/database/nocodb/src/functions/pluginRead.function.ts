import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const PluginReadInput = z.object({
  pluginId: z.string().describe("Plugin ID"),
})

export const PluginReadOutput = z.object({
  active: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is plguin active?"),
  category: z.string().optional().describe("Plugin Category"),
  creator: z.string().optional().describe("Plugin Creator (Not in use)"),
  creator_website: z.string().optional().describe("Plugin Creator website (Not in use)"),
  description: z.string().optional().describe("Plugin Description"),
  docs: z.string().optional().describe("Documentation of plugin (Not in use)"),
  icon: z.string().optional().describe("Plugin Icon - IconMapKey. Takes priority over 'logo' if both are provided."),
  id: z.string().min(0).max(20).optional().describe("Unique ID"),
  input: z.union([z.union([z.string(), z.unknown()]), z.number().int()]).optional().describe("Plugin Input"),
  input_schema: z.string().optional().describe("Plugin Input Schema\n"),
  logo: z.string().optional().describe("Plugin logo"),
  price: z.string().optional().describe("Plugin Price (Not in use)"),
  rating: z.number().optional().describe("Plugin Rating (Not in use)"),
  status: z.string().optional().describe("Plugin Status"),
  status_details: z.string().optional().describe("Not in use"),
  tags: z.string().optional().describe("Plugin tags"),
  title: z.string().optional().describe("Plugin Title"),
  version: z.string().optional().describe("Plugin Version"),
}).describe("Model for Plugin")

export const pluginRead = pikkuSessionlessFunc({
  description: "Get the plugin data by ID",
  input: PluginReadInput,
  output: PluginReadOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/plugins/{pluginId}", data) as any
  },
})
