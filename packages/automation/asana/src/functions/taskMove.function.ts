import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskMoveInput = z.object({
  sectionId: z.string(),
  task: z.string().optional(),
})

export const TaskMoveOutput = z.record(z.string(), z.unknown())

export const taskMove = pikkuSessionlessFunc({
  description: "Task move",
  input: TaskMoveInput,
  output: TaskMoveOutput,
  func: async ({ asana }, data) => {
    return asana.call("POST", "/sections/{sectionId}/addTask", data) as any
  },
})
