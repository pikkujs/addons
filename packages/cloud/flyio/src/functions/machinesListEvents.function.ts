// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MachinesListEventsInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  limit: z.number().int().optional().describe("The number of events to fetch (max of 50). If omitted, this is set to 20 by default."),
})

export const MachinesListEventsOutput = z.array(z.object({
  id: z.string().optional(),
  request: z.record(z.string(), z.unknown()).optional(),
  source: z.string().optional(),
  status: z.string().optional(),
  timestamp: z.number().int().optional(),
  type: z.string().optional(),
}))

export const machinesListEvents = pikkuSessionlessFunc({
  description: "List all events associated with a specific Machine within an app.",
  input: MachinesListEventsInput,
  output: MachinesListEventsOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/machines/{machine_id}/events', data) as any
  },
})
