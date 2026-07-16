// Issues — This resource represents Jira issues. Use it to: * create or edit issues, individually or in bulk. * retrieve metadata about the options for creating or editing issues. * delete an issue. * assign a user to an issue. * get issue changelogs. * send notifications about an issue. * get details of the transitions available for an issue. * transition an issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetTransitionsInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information about transitions in the response. This parameter accepts `transitions.fields`, which returns information about the fields in the transition screen for each transition. Fields hidden from the screen are not returned. Use this information to populate the `fields` and `update` fields in [Transition issue](#api-rest-api-3-issue-issueIdOrKey-transitions-post)."),
  transitionId: z.string().optional().describe("The ID of the transition."),
  skipRemoteOnlyCondition: z.boolean().optional().default(false).describe("Whether transitions with the condition *Hide From User Condition* are included in the response."),
  includeUnavailableTransitions: z.boolean().optional().default(false).describe("Whether details of transitions that fail a condition are included in the response"),
  sortByOpsBarAndStatus: z.boolean().optional().default(false).describe("Whether the transitions are sorted by ops-bar sequence value first then category order (Todo, In Progress, Done) or only by ops-bar sequence value."),
})

export const GetTransitionsOutput = z.object({
  expand: z.string().optional().describe("Expand options that include additional transitions details in the response."),
  transitions: z.array(z.object({
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
  })).optional().describe("List of issue transitions."),
}).describe("List of issue transitions.")

export const getTransitions = pikkuSessionlessFunc({
  description: "Returns either all transitions or a transition that can be performed by the user on an issue, based on the issue's status.\n\nNote, if a request is made for a transition that does not exist or cannot be performed on the issue, given its status, the response will return any empty transitions list.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required: A list or transition is returned only when the user has:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n\nHowever, if the user does not have the *Transition issues* [ project permission](https://confluence.atlassian.com/x/yodKLg) the response will not list any transitions.",
  input: GetTransitionsInput,
  output: GetTransitionsOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issue/{issueIdOrKey}/transitions", data) as any
  },
})
