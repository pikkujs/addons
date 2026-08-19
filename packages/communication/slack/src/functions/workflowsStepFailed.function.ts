import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const WorkflowsStepFailedInput = z.object({
  workflow_step_execute_id: z.string().describe("Context identifier that maps to the correct workflow step execution."),
  error: z.string().describe("A JSON-based object with a `message` property that should contain a human readable error message."),
  token: z.string().describe("Authentication token. Requires scope: `workflow.steps:execute`"),
})

export const WorkflowsStepFailedOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const workflowsStepFailed = pikkuSessionlessFunc({
  description: "Indicate that an app's step in a workflow failed to execute.",
  input: WorkflowsStepFailedInput,
  output: WorkflowsStepFailedOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/workflows.stepFailed", data) as any
  },
})
