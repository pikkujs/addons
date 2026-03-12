// Apps — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/apps-resource/) for details about using the Apps resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppIPAssignmentsDeleteInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  ip: z.string().describe("IP address"),
})

export const appIPAssignmentsDelete = pikkuSessionlessFunc({
  input: AppIPAssignmentsDeleteInput,
  output: z.void(),
  func: async ({ flyio }, data) => {
    return flyio.call('DELETE', '/apps/{app_name}/ip_assignments/{ip}', data)
  },
})
