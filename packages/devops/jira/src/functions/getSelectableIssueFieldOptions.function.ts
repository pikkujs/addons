// Issue custom field options (apps) — This resource represents custom issue field select list options created by a Connect app. See [Issue custom field options](#api-group-Issue-custom-field-options) to manipulate options created in Jira or using the REST API. A select list issue field is a type of [issue field](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field/) that enables a user to select an option from a list. Use it to add, remove, and update the options of a select list issue field.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetSelectableIssueFieldOptionsInput = z.object({
  fieldKey: z.string().describe("The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:\n\n *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.\n *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `\"key\": \"teams-add-on__team-issue-field\"`"),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  projectId: z.number().int().optional().describe("Filters the results to options that are only available in the specified project."),
})

export const GetSelectableIssueFieldOptionsOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    config: z.object({
      attributes: z.array(z.enum(["notSelectable", "defaultValue"])).optional().describe("DEPRECATED"),
      scope: z.object({
        global: z.object({
          attributes: z.array(z.enum(["notSelectable", "defaultValue"])).optional().describe("Defines the behavior of the option in the global context.If notSelectable is set, the option cannot be set as the field's value. This is useful for archiving an option that has previously been selected but shouldn't be used anymore.If defaultValue is set, the option is selected by default."),
        }).optional().describe("Defines the behavior of the option within the global context. If this property is set, even if set to an empty object, then the option is available in all projects."),
        projects: z.array(z.number().int()).optional().describe("DEPRECATED"),
        projects2: z.array(z.object({
          attributes: z.array(z.enum(["notSelectable", "defaultValue"])).optional().describe("Defines the behavior of the option in the project.If notSelectable is set, the option cannot be set as the field's value. This is useful for archiving an option that has previously been selected but shouldn't be used anymore.If defaultValue is set, the option is selected by default."),
          id: z.number().int().optional().describe("The ID of the project that the option's behavior applies to."),
        })).optional().describe("Defines the projects in which the option is available and the behavior of the option within each project. Specify one object per project. The behavior of the option in a project context overrides the behavior in the global context."),
      }).optional().describe("Defines the projects that the option is available in. If the scope is not defined, then the option is available in all projects."),
    }).optional().describe("Details of the projects the option is available in."),
    id: z.number().int().describe("The unique identifier for the option. This is only unique within the select field's set of options."),
    properties: z.record(z.string(), z.unknown()).optional().describe("The properties of the object, as arbitrary key-value pairs. These properties can be searched using JQL, if the extractions (see [Issue Field Option Property Index](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/)) are defined in the descriptor for the issue field module."),
    value: z.string().describe("The option's name, which is displayed in Jira."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getSelectableIssueFieldOptions = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of options for a select list issue field that can be viewed and selected by the user.\n\nNote that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: GetSelectableIssueFieldOptionsInput,
  output: GetSelectableIssueFieldOptionsOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/field/{fieldKey}/option/suggestions/edit", data) as any
  },
})
