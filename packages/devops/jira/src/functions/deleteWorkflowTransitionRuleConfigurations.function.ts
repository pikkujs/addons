// Workflow transition rules — This resource represents workflow transition rules. Workflow transition rules define a Connect app routine, such as a [workflow post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/) that is executed in association with the workflow. Use it to read and modify configuration of workflow transition rules.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const DeleteWorkflowTransitionRuleConfigurationsInput = z.object({
  workflows: z.array(z.object({
  workflowId: z.object({
    draft: z.boolean().describe("Whether the workflow is in the draft state."),
    name: z.string().describe("The name of the workflow."),
  }).describe("Properties that identify a workflow."),
  workflowRuleIds: z.array(z.string()).describe("The list of connect workflow rule IDs."),
})).describe("The list of workflows with transition rules to delete."),
})

export const DeleteWorkflowTransitionRuleConfigurationsOutput = z.object({
  updateResults: z.array(z.object({
    ruleUpdateErrors: z.record(z.string(), z.array(z.string()).describe("A list of transition rule update errors, indexed by the transition rule ID. Any transition rule that appears here wasn't updated.")).describe("A list of transition rule update errors, indexed by the transition rule ID. Any transition rule that appears here wasn't updated."),
    updateErrors: z.array(z.string()).describe("The list of errors that specify why the workflow update failed. The workflow was not updated if the list contains any entries."),
    workflowId: z.object({
      draft: z.boolean().describe("Whether the workflow is in the draft state."),
      name: z.string().describe("The name of the workflow."),
    }).describe("Properties that identify a workflow."),
  })).describe("A list of workflows."),
}).describe("Details of any errors encountered while updating workflow transition rules.")

export const deleteWorkflowTransitionRuleConfigurations = pikkuSessionlessFunc({
  description: "Deletes workflow transition rules from one or more workflows. These rule types are supported:\n\n *  [post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)\n *  [conditions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-condition/)\n *  [validators](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-validator/)\n\nOnly rules created by the calling Connect app can be deleted.\n\n**[Permissions](#permissions) required:** Only Connect apps can use this operation.",
  input: DeleteWorkflowTransitionRuleConfigurationsInput,
  output: DeleteWorkflowTransitionRuleConfigurationsOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/workflow/rule/config/delete", data) as any
  },
})
