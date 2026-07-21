import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LinkedResourceUpdateInput = z.object({
  taskListId: z.string(),
  taskId: z.string(),
  linkedResourceId: z.string(),
  applicationName: z.string().optional(),
  displayName: z.string().optional(),
})

export const LinkedResourceUpdateOutput = z.record(z.string(), z.unknown())

export const linkedResourceUpdate = pikkuSessionlessFunc({
  description: "Update a linked resource",
  input: LinkedResourceUpdateInput,
  output: LinkedResourceUpdateOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("PATCH", "/todo/lists/{taskListId}/tasks/{taskId}/linkedResources/{linkedResourceId}", data) as any
  },
})
