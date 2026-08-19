import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const WorkflowsStepCompletedInput = z.object({
  workflow_step_execute_id: z.string().describe("Context identifier that maps to the correct workflow step execution."),
  outputs: z.string().optional().describe("Key-value object of outputs from your step. Keys of this object reflect the configured `key` properties of your [`outputs`](/reference/workflows/workflow_step#output) array from your `workflow_step` object."),
  token: z.string().describe("Authentication token. Requires scope: `workflow.steps:execute`"),
})

export const WorkflowsStepCompletedOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const workflowsStepCompleted = pikkuSessionlessFunc({
  description: "Indicate that an app's step in a workflow completed execution.",
  input: WorkflowsStepCompletedInput,
  output: WorkflowsStepCompletedOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/workflows.stepCompleted", data) as any
  },
})
