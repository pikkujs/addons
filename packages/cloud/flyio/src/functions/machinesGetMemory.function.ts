// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MachinesGetMemoryInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
})

export const MachinesGetMemoryOutput = z.object({
  available_mb: z.number().int().optional(),
  limit_mb: z.number().int().optional(),
})

export const machinesGetMemory = pikkuSessionlessFunc({
  description: "Get current memory limit and available capacity for a machine",
  input: MachinesGetMemoryInput,
  output: MachinesGetMemoryOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/machines/{machine_id}/memory', data) as any
  },
})
