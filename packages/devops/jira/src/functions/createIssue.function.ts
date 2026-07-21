// Issues — This resource represents Jira issues. Use it to: * create or edit issues, individually or in bulk. * retrieve metadata about the options for creating or editing issues. * delete an issue. * assign a user to an issue. * get issue changelogs. * send notifications about an issue. * get details of the transitions available for an issue. * transition an issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateIssueInput = z.object({
  updateHistory: z.boolean().optional().default(false).describe("Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. When provided, the issue type and request type are added to the user's history for a project. These values are then used to provide defaults on the issue create screen."),
  fields: z.record(z.string(), z.unknown()).optional().describe("List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are required, use `update`. Fields included in here cannot be included in `update`."),
  historyMetadata: z.object({
  activityDescription: z.string().optional().describe("The activity described in the history record."),
  activityDescriptionKey: z.string().optional().describe("The key of the activity described in the history record."),
  actor: z.object({
    avatarUrl: z.string().optional().describe("The URL to an avatar for the user or system associated with a history record."),
    displayName: z.string().optional().describe("The display name of the user or system associated with a history record."),
    displayNameKey: z.string().optional().describe("The key of the display name of the user or system associated with a history record."),
    id: z.string().optional().describe("The ID of the user or system associated with a history record."),
    type: z.string().optional().describe("The type of the user or system associated with a history record."),
    url: z.string().optional().describe("The URL of the user or system associated with a history record."),
  }).optional().describe("Details of the user whose action created the history record."),
  cause: z.object({
    avatarUrl: z.string().optional().describe("The URL to an avatar for the user or system associated with a history record."),
    displayName: z.string().optional().describe("The display name of the user or system associated with a history record."),
    displayNameKey: z.string().optional().describe("The key of the display name of the user or system associated with a history record."),
    id: z.string().optional().describe("The ID of the user or system associated with a history record."),
    type: z.string().optional().describe("The type of the user or system associated with a history record."),
    url: z.string().optional().describe("The URL of the user or system associated with a history record."),
  }).optional().describe("Details of the cause that triggered the creation the history record."),
  description: z.string().optional().describe("The description of the history record."),
  descriptionKey: z.string().optional().describe("The description key of the history record."),
  emailDescription: z.string().optional().describe("The description of the email address associated the history record."),
  emailDescriptionKey: z.string().optional().describe("The description key of the email address associated the history record."),
  extraData: z.record(z.string(), z.string()).optional().describe("Additional arbitrary information about the history record."),
  generator: z.object({
    avatarUrl: z.string().optional().describe("The URL to an avatar for the user or system associated with a history record."),
    displayName: z.string().optional().describe("The display name of the user or system associated with a history record."),
    displayNameKey: z.string().optional().describe("The key of the display name of the user or system associated with a history record."),
    id: z.string().optional().describe("The ID of the user or system associated with a history record."),
    type: z.string().optional().describe("The type of the user or system associated with a history record."),
    url: z.string().optional().describe("The URL of the user or system associated with a history record."),
  }).optional().describe("Details of the system that generated the history record."),
  type: z.string().optional().describe("The type of the history record."),
}).optional().describe("Additional issue history details."),
  properties: z.array(z.object({
  key: z.string().optional().describe("The key of the property. Required on create and update."),
  value: z.unknown().optional().describe("The value of the property. Required on create and update."),
})).optional().describe("Details of issue properties to be add or update."),
  transition: z.object({
  expand: z.string().optional().describe("Expand options that include additional transition details in the response."),
  fields: z.record(z.string(), z.object({
    allowedValues: z.array(z.unknown()).optional().describe("The list of values allowed in the field."),
    autoCompleteUrl: z.string().optional().describe("The URL that can be used to automatically complete the field."),
    configuration: z.record(z.string(), z.unknown()).optional().describe("The configuration properties."),
    defaultValue: z.unknown().optional().describe("The default value of the field."),
    hasDefaultValue: z.boolean().optional().describe("Whether the field has a default value."),
    key: z.string().describe("The key of the field."),
    name: z.string().describe("The name of the field."),
    operations: z.array(z.string()).describe("The list of operations that can be performed on the field."),
    required: z.boolean().describe("Whether the field is required."),
    schema: z.object({
      configuration: z.record(z.string(), z.unknown()).optional().describe("If the field is a custom field, the configuration of the field."),
      custom: z.string().optional().describe("If the field is a custom field, the URI of the field."),
      customId: z.number().int().optional().describe("If the field is a custom field, the custom ID of the field."),
      items: z.string().optional().describe("When the data type is an array, the name of the field items within the array."),
      system: z.string().optional().describe("If the field is a system field, the name of the field."),
      type: z.string().describe("The data type of the field."),
    }).describe("The data type of the field."),
  }).describe("The metadata describing an issue field.")).optional().describe("Details of the fields associated with the issue transition screen. Use this information to populate `fields` and `update` in a transition request."),
  hasScreen: z.boolean().optional().describe("Whether there is a screen associated with the issue transition."),
  id: z.string().optional().describe("The ID of the issue transition. Required when specifying a transition to undertake."),
  isAvailable: z.boolean().optional().describe("Whether the transition is available to be performed."),
  isConditional: z.boolean().optional().describe("Whether the issue has to meet criteria before the issue transition is applied."),
  isGlobal: z.boolean().optional().describe("Whether the issue transition is global, that is, the transition is applied to issues regardless of their status."),
  isInitial: z.boolean().optional().describe("Whether this is the initial issue transition for the workflow."),
  looped: z.boolean().optional(),
  name: z.string().optional().describe("The name of the issue transition."),
  to: z.object({
    description: z.string().optional().describe("The description of the status."),
    iconUrl: z.string().optional().describe("The URL of the icon used to represent the status."),
    id: z.string().optional().describe("The ID of the status."),
    name: z.string().optional().describe("The name of the status."),
    self: z.string().optional().describe("The URL of the status."),
    statusCategory: z.object({
      colorName: z.string().optional().describe("The name of the color used to represent the status category."),
      id: z.number().int().optional().describe("The ID of the status category."),
      key: z.string().optional().describe("The key of the status category."),
      name: z.string().optional().describe("The name of the status category."),
      self: z.string().optional().describe("The URL of the status category."),
    }).optional().describe("The category assigned to the status."),
  }).optional().describe("Details of the issue status after the transition."),
}).optional().describe("Details of a transition. Required when performing a transition, optional when creating or editing an issue."),
  update: z.record(z.string(), z.array(z.object({
  add: z.unknown().optional().describe("The value to add to the field."),
  copy: z.unknown().optional().describe("The field value to copy from another issue."),
  edit: z.unknown().optional().describe("The value to edit in the field."),
  remove: z.unknown().optional().describe("The value to removed from the field."),
  set: z.unknown().optional().describe("The value to set in the field."),
}))).optional().describe("A Map containing the field field name and a list of operations to perform on the issue screen field. Note that fields included in here cannot be included in `fields`."),
})

export const CreateIssueOutput = z.object({
  id: z.string().optional().describe("The ID of the created issue or subtask."),
  key: z.string().optional().describe("The key of the created issue or subtask."),
  self: z.string().optional().describe("The URL of the created issue or subtask."),
  transition: z.object({
    errorCollection: z.object({
      errorMessages: z.array(z.string()).optional().describe("The list of error messages produced by this operation. For example, \"input parameter 'key' must be provided\""),
      errors: z.record(z.string(), z.string()).optional().describe("The list of errors by parameter returned by the operation. For example,\"projectKey\": \"Project keys must start with an uppercase letter, followed by one or more uppercase alphanumeric characters.\""),
      status: z.number().int().optional(),
    }).optional().describe("Error messages from an operation."),
    status: z.number().int().optional(),
    warningCollection: z.object({
      warnings: z.array(z.string()).optional(),
    }).optional(),
  }).optional().describe("The response code and messages related to any requested transition."),
  watchers: z.object({
    errorCollection: z.object({
      errorMessages: z.array(z.string()).optional().describe("The list of error messages produced by this operation. For example, \"input parameter 'key' must be provided\""),
      errors: z.record(z.string(), z.string()).optional().describe("The list of errors by parameter returned by the operation. For example,\"projectKey\": \"Project keys must start with an uppercase letter, followed by one or more uppercase alphanumeric characters.\""),
      status: z.number().int().optional(),
    }).optional().describe("Error messages from an operation."),
    status: z.number().int().optional(),
    warningCollection: z.object({
      warnings: z.array(z.string()).optional(),
    }).optional(),
  }).optional().describe("The response code and messages related to any requested watchers."),
}).describe("Details about a created issue or subtask.")

export const createIssue = pikkuSessionlessFunc({
  description: "Creates an issue or, where the option to create subtasks is enabled in Jira, a subtask. A transition may be applied, to move the issue or subtask to a workflow step other than the default start step, and issue properties set.\n\nThe content of the issue or subtask is defined using `update` and `fields`. The fields that can be set in the issue or subtask are determined using the [ Get create issue metadata](#api-rest-api-3-issue-createmeta-get). These are the same fields that appear on the issue's create screen. Note that the `description`, `environment`, and any `textarea` type custom fields (multi-line text fields) take Atlassian Document Format content. Single line custom fields (`textfield`) accept a string and don't handle Atlassian Document Format content.\n\nCreating a subtask differs from creating an issue as follows:\n\n *  `issueType` must be set to a subtask issue type (use [ Get create issue metadata](#api-rest-api-3-issue-createmeta-get) to find subtask issue types).\n *  `parent` must contain the ID or key of the parent issue.\n\nIn a next-gen project any issue may be made a child providing that the parent and child are members of the same project.\n\n**[Permissions](#permissions) required:** *Browse projects* and *Create issues* [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project in which the issue or subtask is created.",
  input: CreateIssueInput,
  output: CreateIssueOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/issue", data) as any
  },
})
