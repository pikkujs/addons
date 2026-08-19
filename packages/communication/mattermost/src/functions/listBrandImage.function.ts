// brand — Endpoints related to custom branding and white-labeling. See [our branding documentation](https://docs.mattermost.com/administration/branding.html) for more information.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ListBrandImageOutput = z.string()

export const listBrandImage = pikkuSessionlessFunc({
  description: "Get the previously uploaded brand image. Returns 404 if no brand image has been uploaded.\n##### Permissions\nNo permission required.",
  output: ListBrandImageOutput,
  errors: [NotFoundError],
  func: async ({ mattermost }) => {
    return mattermost.call("GET", "/brand/image") as any
  },
})
