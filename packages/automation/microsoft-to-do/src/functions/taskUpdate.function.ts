import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskUpdateInput = z.object({
  taskListId: z.string(),
  taskId: z.string(),
  title: z.string().optional(),
  importance: z.string().optional(),
  status: z.string().optional(),
})

export const TaskUpdateOutput = z.record(z.string(), z.unknown())

export const taskUpdate = pikkuSessionlessFunc({
  description: "Update a task",
  input: TaskUpdateInput,
  output: TaskUpdateOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("PATCH", "/todo/lists/{taskListId}/tasks/{taskId}", data) as any
  },
})
