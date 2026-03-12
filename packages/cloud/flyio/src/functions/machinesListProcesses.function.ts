// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const MachinesListProcessesInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  sort_by: z.string().optional().describe("Sort by"),
  order: z.string().optional().describe("Order"),
})

export const MachinesListProcessesOutput = z.array(z.object({
  command: z.string().optional(),
  cpu: z.number().int().optional(),
  directory: z.string().optional(),
  listen_sockets: z.array(z.object({
    address: z.string().optional(),
    proto: z.string().optional(),
  })).optional(),
  pid: z.number().int().optional(),
  rss: z.number().int().optional(),
  rtime: z.number().int().optional(),
  stime: z.number().int().optional(),
}))

export const machinesListProcesses = pikkuSessionlessFunc({
  description: "List all processes running on a specific Machine within an app, with optional sorting parameters.",
  input: MachinesListProcessesInput,
  output: MachinesListProcessesOutput,
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/machines/{machine_id}/ps', data) as any
  },
})
