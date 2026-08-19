// brand — Endpoints related to custom branding and white-labeling. See [our branding documentation](https://docs.mattermost.com/administration/branding.html) for more information.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateBrandImageOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createBrandImage = pikkuSessionlessFunc({
  description: "Uploads a brand image.\n##### Permissions\nMust have `manage_system` permission.",
  output: CreateBrandImageOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/brand/image") as any
  },
})
