// Apps — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/apps-resource/) for details about using the Apps resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppIPAssignmentsListInput = z.object({
  app_name: z.string().describe("Fly App Name"),
})

export const AppIPAssignmentsListOutput = z.object({
  ips: z.array(z.object({
    created_at: z.string().optional(),
    ip: z.string().optional(),
    region: z.string().optional(),
    service_name: z.string().optional(),
    shared: z.boolean().optional(),
  })).optional(),
})

export const appIPAssignmentsList = pikkuSessionlessFunc({
  input: AppIPAssignmentsListInput,
  output: AppIPAssignmentsListOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/ip_assignments', data) as any
  },
})
