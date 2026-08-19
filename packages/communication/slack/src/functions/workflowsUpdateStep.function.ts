import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const WorkflowsUpdateStepInput = z.object({
  workflow_step_edit_id: z.string().describe("A context identifier provided with `view_submission` payloads used to call back to `workflows.updateStep`."),
  inputs: z.string().optional().describe("A JSON key-value map of inputs required from a user during configuration. This is the data your app expects to receive when the workflow step starts. **Please note**: the embedded variable format is set and replaced by the workflow system. You cannot create custom variables that will be replaced at runtime. [Read more about variables in workflow steps here](/workflows/steps#variables)."),
  outputs: z.string().optional().describe("An JSON array of output objects used during step execution. This is the data your app agrees to provide when your workflow step was executed."),
  step_name: z.string().optional().describe("An optional field that can be used to override the step name that is shown in the Workflow Builder."),
  step_image_url: z.string().optional().describe("An optional field that can be used to override app image that is shown in the Workflow Builder."),
  token: z.string().describe("Authentication token. Requires scope: `workflow.steps:execute`"),
})

export const WorkflowsUpdateStepOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const workflowsUpdateStep = pikkuSessionlessFunc({
  description: "Update the configuration for a workflow extension step.",
  input: WorkflowsUpdateStepInput,
  output: WorkflowsUpdateStepOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/workflows.updateStep", data) as any
  },
})
