import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const PluginListInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const PluginListOutput = z.object({
  list: z.array(z.object({
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
  })).min(1).optional(),
  pageInfo: z.object({
    isFirstPage: z.boolean().optional().describe("Is the current page the first page"),
    isLastPage: z.boolean().optional().describe("Is the current page the last page"),
    page: z.number().optional().describe("The current page"),
    offset: z.number().optional().describe("The current offset and it will be present only when the page is not included"),
    pageSize: z.number().optional().describe("The number of pages"),
    totalRows: z.number().optional().describe("The number of rows in the given result"),
  }).optional().describe("Model for Paginated"),
})

export const pluginList = pikkuSessionlessFunc({
  description: "List all plugins",
  input: PluginListInput,
  output: PluginListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/plugins", data) as any
  },
})
