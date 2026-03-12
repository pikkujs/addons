// Apps — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/apps-resource/) for details about using the Apps resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppsListInput = z.object({
  org_slug: z.string().describe("The org slug, or 'personal', to filter apps"),
  app_role: z.string().optional().describe("Filter apps by role"),
})

export const AppsListOutput = z.object({
  apps: z.array(z.object({
    id: z.string().optional(),
    internal_numeric_id: z.number().int().optional(),
    machine_count: z.number().int().optional(),
    name: z.string().optional(),
    network: z.string().optional(),
    organization: z.object({
      internal_numeric_id: z.number().int().optional(),
      name: z.string().optional(),
      slug: z.string().optional(),
    }).optional(),
    status: z.string().optional(),
    volume_count: z.number().int().optional(),
  })).optional(),
  total_apps: z.number().int().optional(),
})

export const appsList = pikkuSessionlessFunc({
  description: "List all apps with the ability to filter by organization slug.",
  input: AppsListInput,
  output: AppsListOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps', data) as any
  },
})
