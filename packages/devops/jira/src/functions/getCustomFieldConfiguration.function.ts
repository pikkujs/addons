// Issue custom field configuration (apps) — This resource represents configurations stored against a custom field context by a [Forge app](https://developer.atlassian.com/platform/forge/). Configurations are information used by the Forge app at runtime to determine how to handle or process the data in a custom field in a given context. Use this resource to set and read configurations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetCustomFieldConfigurationInput = z.object({
  fieldIdOrKey: z.string().describe("The ID or key of the custom field, for example `customfield_10000`."),
  id: z.array(z.number().int()).optional().describe("The list of configuration IDs. To include multiple configurations, separate IDs with an ampersand: `id=10000&id=10001`. Can't be provided with `fieldContextId`, `issueId`, `projectKeyOrId`, or `issueTypeId`."),
  fieldContextId: z.array(z.number().int()).optional().describe("The list of field context IDs. To include multiple field contexts, separate IDs with an ampersand: `fieldContextId=10000&fieldContextId=10001`. Can't be provided with `id`, `issueId`, `projectKeyOrId`, or `issueTypeId`."),
  issueId: z.number().int().optional().describe("The ID of the issue to filter results by. If the issue doesn't exist, an empty list is returned. Can't be provided with `projectKeyOrId`, or `issueTypeId`."),
  projectKeyOrId: z.string().optional().describe("The ID or key of the project to filter results by. Must be provided with `issueTypeId`. Can't be provided with `issueId`."),
  issueTypeId: z.string().optional().describe("The ID of the issue type to filter results by. Must be provided with `projectKeyOrId`. Can't be provided with `issueId`."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(100).describe("The maximum number of items to return per page."),
})

export const GetCustomFieldConfigurationOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    configuration: z.unknown().optional().describe("The field configuration."),
    fieldContextId: z.string().describe("The ID of the field context the configuration is associated with."),
    id: z.string().describe("The ID of the configuration."),
    schema: z.unknown().optional().describe("The field value schema."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getCustomFieldConfiguration = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of configurations for a custom field created by a [Forge app](https://developer.atlassian.com/platform/forge/).\n\nThe result can be filtered by one of these criteria:\n\n *  `id`.\n *  `fieldContextId`.\n *  `issueId`.\n *  `projectKeyOrId` and `issueTypeId`.\n\nOtherwise, all configurations are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the Forge app that created the custom field.",
  input: GetCustomFieldConfigurationInput,
  output: GetCustomFieldConfigurationOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/app/field/{fieldIdOrKey}/context/configuration", data) as any
  },
})
