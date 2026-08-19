import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProjectCreateInput = z.object({
  teamId: z.string(),
  name: z.string().optional(),
  workspace: z.string().optional(),
})

export const ProjectCreateOutput = z.record(z.string(), z.unknown())

export const projectCreate = pikkuSessionlessFunc({
  description: "Project create",
  input: ProjectCreateInput,
  output: ProjectCreateOutput,
  func: async ({ asana }, data) => {
    return asana.call("POST", "/teams/{teamId}/projects", data) as any
  },
})
