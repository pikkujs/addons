import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskGetSummaryOutput = z.record(z.string(), z.unknown())

export const taskGetSummary = pikkuSessionlessFunc({
  description: "Get Task summary",
  output: TaskGetSummaryOutput,
  func: async ({ salesforce }) => {
    return salesforce.call("GET", "/query/Task/summary") as any
  },
})
