// Workflows — This resource represents workflows. Use it to: * get workflows. * create workflows. * delete inactive workflows.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetWorkflowsPaginatedInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  workflowName: z.array(z.string()).optional().describe("The name of a workflow to return. To include multiple workflows, provide an ampersand-separated list. For example, `workflowName=name1&workflowName=name2`."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `transitions` For each workflow, returns information about the transitions inside the workflow.\n *  `transitions.rules` For each workflow transition, returns information about its rules. Transitions are included automatically if this expand is requested.\n *  `transitions.properties` For each workflow transition, returns information about its properties. Transitions are included automatically if this expand is requested.\n *  `statuses` For each workflow, returns information about the statuses inside the workflow.\n *  `statuses.properties` For each workflow status, returns information about its properties. Statuses are included automatically if this expand is requested.\n *  `default` For each workflow, returns information about whether this is the default workflow.\n *  `schemes` For each workflow, returns information about the workflow schemes the workflow is assigned to.\n *  `projects` For each workflow, returns information about the projects the workflow is assigned to, through workflow schemes.\n *  `hasDraftWorkflow` For each workflow, returns information about whether the workflow has a draft version.\n *  `operations` For each workflow, returns information about the actions that can be undertaken on the workflow."),
  queryString: z.string().optional().describe("String used to perform a case-insensitive partial match with workflow name."),
  orderBy: z.enum(["name", "-name", "+name", "created", "-created", "+created", "updated", "+updated", "-updated"]).optional().describe("[Order](#ordering) the results by a field:\n\n *  `name` Sorts by workflow name.\n *  `created` Sorts by create time.\n *  `updated` Sorts by update time."),
  isActive: z.boolean().optional().describe("Filters active and inactive workflows."),
})

export const GetWorkflowsPaginatedOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    created: z.string().datetime().optional().describe("The creation date of the workflow."),
    description: z.string().describe("The description of the workflow."),
    hasDraftWorkflow: z.boolean().optional().describe("Whether the workflow has a draft version."),
    id: z.object({
      entityId: z.string().optional().describe("The entity ID of the workflow."),
      name: z.string().describe("The name of the workflow."),
    }).describe("Properties that identify a published workflow."),
    isDefault: z.boolean().optional().describe("Whether this is the default workflow."),
    operations: z.object({
      canDelete: z.boolean().describe("Whether the workflow can be deleted."),
      canEdit: z.boolean().describe("Whether the workflow can be updated."),
    }).optional().describe("Operations allowed on a workflow"),
    projects: z.array(z.object({
      avatarUrls: z.object({
        "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
        "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
        "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
        "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
      }).optional().describe("The URLs of the project's avatars."),
      id: z.string().optional().describe("The ID of the project."),
      key: z.string().optional().describe("The key of the project."),
      name: z.string().optional().describe("The name of the project."),
      projectCategory: z.object({
        description: z.string().optional().describe("The name of the project category."),
        id: z.string().optional().describe("The ID of the project category."),
        name: z.string().optional().describe("The description of the project category."),
        self: z.string().optional().describe("The URL of the project category."),
      }).optional().describe("The category the project belongs to."),
      projectTypeKey: z.enum(["software", "service_desk", "business"]).optional().describe("The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project."),
      self: z.string().optional().describe("The URL of the project details."),
      simplified: z.boolean().optional().describe("Whether or not the project is simplified."),
    })).optional().describe("The projects the workflow is assigned to, through workflow schemes."),
    schemes: z.array(z.object({
      id: z.string().describe("The ID of the workflow scheme."),
      name: z.string().describe("The name of the workflow scheme."),
    })).optional().describe("The workflow schemes the workflow is assigned to."),
    statuses: z.array(z.object({
      id: z.string().describe("The ID of the issue status."),
      name: z.string().describe("The name of the status in the workflow."),
      properties: z.record(z.string(), z.unknown().describe("Additional properties that modify the behavior of issues in this status. Supports the properties <code>jira.issue.editable</code> and <code>issueEditable</code> (deprecated) that indicate whether issues are editable.")).optional().describe("Additional properties that modify the behavior of issues in this status. Supports the properties `jira.issue.editable` and `issueEditable` (deprecated) that indicate whether issues are editable."),
    })).optional().describe("The statuses of the workflow."),
    transitions: z.array(z.object({
      description: z.string().describe("The description of the transition."),
      from: z.array(z.string()).describe("The statuses the transition can start from."),
      id: z.string().describe("The ID of the transition."),
      name: z.string().describe("The name of the transition."),
      properties: z.record(z.string(), z.unknown().describe("The properties of the transition.")).optional().describe("The properties of the transition."),
      rules: z.object({
        conditionsTree: z.union([z.object({
          configuration: z.record(z.string(), z.unknown()).optional().describe("EXPERIMENTAL. The configuration of the transition rule."),
          nodeType: z.string(),
          type: z.string().describe("The type of the transition rule."),
        }), z.object({
          conditions: z.array(z.union([z.object({
            configuration: z.record(z.string(), z.unknown()).optional().describe("EXPERIMENTAL. The configuration of the transition rule."),
            nodeType: z.string(),
            type: z.string().describe("The type of the transition rule."),
          }), z.any()])).describe("The list of workflow conditions."),
          nodeType: z.string(),
          operator: z.enum(["AND", "OR"]).describe("The compound condition operator."),
        })]).optional().describe("The workflow transition rule conditions tree."),
        postFunctions: z.array(z.object({
          configuration: z.unknown().optional().describe("EXPERIMENTAL. The configuration of the transition rule."),
          type: z.string().describe("The type of the transition rule."),
        })).optional().describe("The workflow post functions."),
        validators: z.array(z.object({
          configuration: z.unknown().optional().describe("EXPERIMENTAL. The configuration of the transition rule."),
          type: z.string().describe("The type of the transition rule."),
        })).optional().describe("The workflow validators."),
      }).optional().describe("A collection of transition rules."),
      screen: z.object({
        id: z.string().describe("The ID of the screen."),
        name: z.string().optional().describe("The name of the screen."),
      }).optional().describe("The details of a transition screen."),
      to: z.string().describe("The status the transition goes to."),
      type: z.enum(["global", "initial", "directed"]).describe("The type of the transition."),
    })).optional().describe("The transitions of the workflow."),
    updated: z.string().datetime().optional().describe("The last edited date of the workflow."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getWorkflowsPaginated = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of published classic workflows. When workflow names are specified, details of those workflows are returned. Otherwise, all published classic workflows are returned.\n\nThis operation does not return next-gen workflows.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetWorkflowsPaginatedInput,
  output: GetWorkflowsPaginatedOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/workflow/search", data) as any
  },
})
