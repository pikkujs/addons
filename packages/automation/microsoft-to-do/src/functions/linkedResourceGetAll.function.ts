import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LinkedResourceGetAllInput = z.object({
  taskListId: z.string(),
  taskId: z.string(),
  $top: z.number().int().optional(),
})

export const LinkedResourceGetAllOutput = z.record(z.string(), z.unknown())

export const linkedResourceGetAll = pikkuSessionlessFunc({
  description: "List linked resources",
  input: LinkedResourceGetAllInput,
  output: LinkedResourceGetAllOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("GET", "/todo/lists/{taskListId}/tasks/{taskId}/linkedResources", data) as any
  },
})
