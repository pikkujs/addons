// plugins — Endpoints related to uploading and managing plugins.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreatePluginsOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createPlugins = pikkuSessionlessFunc({
  description: "Upload a plugin compressed in a .tar.gz file. Plugins and plugin uploads must be enabled in the server's config settings.\n\n##### Permissions\nMust have `manage_system` permission.\n\n__Minimum server version__: 4.4",
  output: CreatePluginsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/plugins") as any
  },
})
