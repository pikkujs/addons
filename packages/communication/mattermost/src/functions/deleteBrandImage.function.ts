// brand — Endpoints related to custom branding and white-labeling. See [our branding documentation](https://docs.mattermost.com/administration/branding.html) for more information.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteBrandImageOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteBrandImage = pikkuSessionlessFunc({
  description: "Deletes the previously uploaded brand image. Returns 404 if no brand image has been uploaded.\n##### Permissions\nMust have `manage_system` permission.\n__Minimum server version: 5.6__",
  output: DeleteBrandImageOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }) => {
    return mattermost.call("DELETE", "/brand/image") as any
  },
})
