// Apps — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/apps-resource/) for details about using the Apps resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppIPAssignmentsCreateInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  network: z.string().optional(),
  org_slug: z.string().optional(),
  region: z.string().optional(),
  service_name: z.string().optional(),
  type: z.string().optional(),
})

export const AppIPAssignmentsCreateOutput = z.object({
  created_at: z.string().optional(),
  ip: z.string().optional(),
  region: z.string().optional(),
  service_name: z.string().optional(),
  shared: z.boolean().optional(),
})

export const appIPAssignmentsCreate = pikkuSessionlessFunc({
  input: AppIPAssignmentsCreateInput,
  output: AppIPAssignmentsCreateOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/ip_assignments', data) as any
  },
})
