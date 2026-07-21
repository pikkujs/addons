import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListViewDefinitionsOutput = z.object({
  definitions: z.object({
    conditions_all: z.array(z.record(z.string(), z.unknown())).optional(),
    conditions_any: z.array(z.record(z.string(), z.unknown())).optional(),
    groupables: z.array(z.record(z.string(), z.unknown())).optional(),
    output: z.array(z.record(z.string(), z.unknown())).optional(),
    sortables: z.array(z.record(z.string(), z.unknown())).optional(),
  }).optional(),
})

export const listViewDefinitions = pikkuSessionlessFunc({
  description: "Returns the definitions of the conditions and actions a view can perform.\nThe definitions include conditions, output columns, groupable fields, and\nsortable fields.\n\n#### Allowed For\n\n* Agents",
  output: ListViewDefinitionsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/views/definitions") as any
  },
})
