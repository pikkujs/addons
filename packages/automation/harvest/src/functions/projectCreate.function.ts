import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProjectCreateInput = z.object({
  client_id: z.string().optional(),
  name: z.string().optional(),
  is_billable: z.boolean().optional(),
  bill_by: z.string().optional(),
  budget_by: z.string().optional(),
})

export const ProjectCreateOutput = z.record(z.string(), z.unknown())

export const projectCreate = pikkuSessionlessFunc({
  description: "Project create",
  input: ProjectCreateInput,
  output: ProjectCreateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("POST", "/projects", data) as any
  },
})
