// Workflow transition rules — This resource represents workflow transition rules. Workflow transition rules define a Connect app routine, such as a [workflow post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/) that is executed in association with the workflow. Use it to read and modify configuration of workflow transition rules.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetWorkflowTransitionRuleConfigurationsInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().max(50).optional().default(10).describe("The maximum number of items to return per page."),
  types: z.array(z.enum(["postfunction", "condition", "validator"])).describe("The types of the transition rules to return."),
  keys: z.array(z.string()).optional().describe("The transition rule class keys, as defined in the Connect app descriptor, of the transition rules to return."),
  workflowNames: z.array(z.string()).optional().describe("EXPERIMENTAL: The list of workflow names to filter by."),
  withTags: z.array(z.string()).optional().describe("EXPERIMENTAL: The list of `tags` to filter by."),
  draft: z.boolean().optional().describe("EXPERIMENTAL: Whether draft or published workflows are returned. If not provided, both workflow types are returned."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts `transition`, which, for each rule, returns information about the transition the rule is assigned to."),
})

export const GetWorkflowTransitionRuleConfigurationsOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
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
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getWorkflowTransitionRuleConfigurations = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of workflows with transition rules. The workflows can be filtered to return only those containing workflow transition rules:\n\n *  of one or more transition rule types, such as [workflow post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/).\n *  matching one or more transition rule keys.\n\nOnly workflows containing transition rules created by the calling Connect app are returned.\n\nDue to server-side optimizations, workflows with an empty list of rules may be returned; these workflows can be ignored.\n\n**[Permissions](#permissions) required:** Only Connect apps can use this operation.",
  input: GetWorkflowTransitionRuleConfigurationsInput,
  output: GetWorkflowTransitionRuleConfigurationsOutput,
  errors: [BadRequestError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/workflow/rule/config", data) as any
  },
})
