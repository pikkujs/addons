// Workflow transition rules — This resource represents workflow transition rules. Workflow transition rules define a Connect app routine, such as a [workflow post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/) that is executed in association with the workflow. Use it to read and modify configuration of workflow transition rules.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const UpdateWorkflowTransitionRuleConfigurationsInput = z.object({
  workflows: z.array(z.object({
  conditions: z.array(z.object({
    configuration: z.object({
      disabled: z.boolean().optional().default(false).describe("EXPERIMENTAL: Whether the rule is disabled."),
      tag: z.string().max(255).optional().describe("EXPERIMENTAL: A tag used to filter rules in [Get workflow transition rule configurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-rest-api-3-workflow-rule-config-get)."),
      value: z.string().describe("Configuration of the rule, as it is stored by the Connect app on the rule configuration page."),
    }).describe("A rule configuration."),
    id: z.string().describe("The ID of the transition rule."),
    key: z.string().describe("The key of the rule, as defined in the Connect app descriptor."),
    transition: z.object({
      id: z.number().int().describe("The transition ID."),
      name: z.string().describe("The transition name."),
    }).optional(),
  })).optional().describe("The list of conditions within the workflow."),
  postFunctions: z.array(z.object({
    configuration: z.object({
      disabled: z.boolean().optional().default(false).describe("EXPERIMENTAL: Whether the rule is disabled."),
      tag: z.string().max(255).optional().describe("EXPERIMENTAL: A tag used to filter rules in [Get workflow transition rule configurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-rest-api-3-workflow-rule-config-get)."),
      value: z.string().describe("Configuration of the rule, as it is stored by the Connect app on the rule configuration page."),
    }).describe("A rule configuration."),
    id: z.string().describe("The ID of the transition rule."),
    key: z.string().describe("The key of the rule, as defined in the Connect app descriptor."),
    transition: z.object({
      id: z.number().int().describe("The transition ID."),
      name: z.string().describe("The transition name."),
    }).optional(),
  })).optional().describe("The list of post functions within the workflow."),
  validators: z.array(z.object({
    configuration: z.object({
      disabled: z.boolean().optional().default(false).describe("EXPERIMENTAL: Whether the rule is disabled."),
      tag: z.string().max(255).optional().describe("EXPERIMENTAL: A tag used to filter rules in [Get workflow transition rule configurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-rest-api-3-workflow-rule-config-get)."),
      value: z.string().describe("Configuration of the rule, as it is stored by the Connect app on the rule configuration page."),
    }).describe("A rule configuration."),
    id: z.string().describe("The ID of the transition rule."),
    key: z.string().describe("The key of the rule, as defined in the Connect app descriptor."),
    transition: z.object({
      id: z.number().int().describe("The transition ID."),
      name: z.string().describe("The transition name."),
    }).optional(),
  })).optional().describe("The list of validators within the workflow."),
  workflowId: z.object({
    draft: z.boolean().describe("Whether the workflow is in the draft state."),
    name: z.string().describe("The name of the workflow."),
  }).describe("Properties that identify a workflow."),
})).describe("The list of workflows with transition rules to update."),
})

export const UpdateWorkflowTransitionRuleConfigurationsOutput = z.object({
  updateResults: z.array(z.object({
    ruleUpdateErrors: z.record(z.string(), z.array(z.string()).describe("A list of transition rule update errors, indexed by the transition rule ID. Any transition rule that appears here wasn't updated.")).describe("A list of transition rule update errors, indexed by the transition rule ID. Any transition rule that appears here wasn't updated."),
    updateErrors: z.array(z.string()).describe("The list of errors that specify why the workflow update failed. The workflow was not updated if the list contains any entries."),
    workflowId: z.object({
      draft: z.boolean().describe("Whether the workflow is in the draft state."),
      name: z.string().describe("The name of the workflow."),
    }).describe("Properties that identify a workflow."),
  })).describe("A list of workflows."),
}).describe("Details of any errors encountered while updating workflow transition rules.")

export const updateWorkflowTransitionRuleConfigurations = pikkuSessionlessFunc({
  description: "Updates configuration of workflow transition rules. The following rule types are supported:\n\n *  [post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)\n *  [conditions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-condition/)\n *  [validators](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-validator/)\n\nOnly rules created by the calling Connect app can be updated.\n\nTo assist with app migration, this operation can be used to:\n\n *  Disable a rule.\n *  Add a `tag`. Use this to filter rules in the [Get workflow transition rule configurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-rest-api-3-workflow-rule-config-get).\n\nRules are enabled if the `disabled` parameter is not provided.\n\n**[Permissions](#permissions) required:** Only Connect apps can use this operation.",
  input: UpdateWorkflowTransitionRuleConfigurationsInput,
  output: UpdateWorkflowTransitionRuleConfigurationsOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/workflow/rule/config", data) as any
  },
})
