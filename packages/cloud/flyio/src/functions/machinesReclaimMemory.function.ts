// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MachinesReclaimMemoryInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  amount_mb: z.number().int().optional(),
})

export const MachinesReclaimMemoryOutput = z.object({
  actual_mb: z.number().int().optional(),
})

export const machinesReclaimMemory = pikkuSessionlessFunc({
  description: "Trigger the balloon device to reclaim memory from a machine",
  input: MachinesReclaimMemoryInput,
  output: MachinesReclaimMemoryOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/machines/{machine_id}/memory/reclaim', data) as any
  },
})
