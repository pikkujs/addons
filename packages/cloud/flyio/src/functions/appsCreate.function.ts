// Apps — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/apps-resource/) for details about using the Apps resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const AppsCreateInput = z.object({
  enable_subdomains: z.boolean().optional(),
  name: z.string().optional(),
  network: z.string().optional(),
  org_slug: z.string().optional(),
})

export const appsCreate = pikkuSessionlessFunc({
  description: "Create an app with the specified details in the request body.",
  input: AppsCreateInput,
  output: z.void(),
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps', data)
  },
})
