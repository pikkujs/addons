// App migration — This resource supports [app migrations](https://developer.atlassian.com/platform/app-migration/). Use it to: - [to request migrated workflow rules details](https://developer.atlassian.com/platform/app-migration/tutorials/migration-app-workflow-rules/). - [perform bulk updates of entity properties](https://developer.atlassian.com/platform/app-migration/tutorials/entity-properties-bulk-api/). - [perform bulk updates of issue custom field values](https://developer.atlassian.com/platform/app-migration/tutorials/migrating-app-custom-fields/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const MigrationResourceWorkflowRuleSearchPostInput = z.object({
  "Atlassian-Transfer-Id": z.string().uuid().describe("The app migration transfer ID."),
  expand: z.string().optional().describe("Use expand to include additional information in the response. This parameter accepts `transition` which, for each rule, returns information about the transition the rule is assigned to."),
  ruleIds: z.array(z.string().uuid()).min(1).max(10).describe("The list of workflow rule IDs."),
  workflowEntityId: z.string().uuid().describe("The workflow ID."),
})

export const MigrationResourceWorkflowRuleSearchPostOutput = z.object({
  invalidRules: z.array(z.string().uuid()).optional().describe("List of workflow rule IDs that do not belong to the workflow or can not be found."),
  validRules: z.array(z.object({
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
  })).optional().describe("List of valid workflow transition rules."),
  workflowEntityId: z.string().uuid().optional().describe("The workflow ID."),
}).describe("Details of workflow transition rules.")

export const migrationResourceWorkflowRuleSearchPost = pikkuSessionlessFunc({
  description: "Returns configurations for workflow transition rules migrated from server to cloud and owned by the calling Connect app.",
  input: MigrationResourceWorkflowRuleSearchPostInput,
  output: MigrationResourceWorkflowRuleSearchPostOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/atlassian-connect/1/migration/workflow/rule/search", data) as any
  },
})
