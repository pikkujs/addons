// plugins — Endpoints related to uploading and managing plugins.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListPluginsWebappOutput = z.array(z.object({
  id: z.string().optional().describe("Globally unique identifier that represents the plugin."),
  version: z.string().optional().describe("Version number of the plugin."),
  webapp: z.object({
    bundle_path: z.string().optional().describe("Path to the webapp JavaScript bundle."),
  }).optional(),
}))

export const listPluginsWebapp = pikkuSessionlessFunc({
  description: "Get a list of web app plugins installed and activated on the server.\n\n##### Permissions\nNo permissions required.\n\n__Minimum server version__: 4.4",
  output: ListPluginsWebappOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("GET", "/plugins/webapp") as any
  },
})
