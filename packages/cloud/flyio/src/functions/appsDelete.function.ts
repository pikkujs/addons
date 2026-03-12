// Apps — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/apps-resource/) for details about using the Apps resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppsDeleteInput = z.object({
  app_name: z.string().describe("Fly App Name"),
})

export const appsDelete = pikkuSessionlessFunc({
  description: "Delete an app by its name.",
  input: AppsDeleteInput,
  output: z.void(),
  func: async ({ flyio }, data) => {
    return flyio.call('DELETE', '/apps/{app_name}', data)
  },
})
