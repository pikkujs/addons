// Issue custom field options — This resource represents custom issue field select list options created in Jira or using the REST API. This resource supports the following field types: * Checkboxes. * Radio Buttons. * Select List (single choice). * Select List (multiple choices). * Select List (cascading). See [Issue custom field options (apps)](#api-group-Issue-custom-field-options--apps-) to manipulate custom issue field select list options created by a Connect app. Use it to retrieve, create, update, order, and delete custom field options.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetOptionsForContextInput = z.object({
  fieldId: z.string().describe("The ID of the custom field."),
  contextId: z.number().int().describe("The ID of the context."),
  optionId: z.number().int().optional().describe("The ID of the option."),
  onlyOptions: z.boolean().optional().default(false).describe("Whether only options are returned."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(100).describe("The maximum number of items to return per page."),
})

export const GetOptionsForContextOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    disabled: z.boolean().describe("Whether the option is disabled."),
    id: z.string().describe("The ID of the custom field option."),
    optionId: z.string().optional().describe("For cascading options, the ID of the custom field option containing the cascading option."),
    value: z.string().describe("The value of the custom field option."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getOptionsForContext = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of all custom field option for a context. Options are returned first then cascading options, in the order they display in Jira.\n\nThis operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the [Issue custom field options (apps)](#api-group-issue-custom-field-options--apps-) operations.**\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetOptionsForContextInput,
  output: GetOptionsForContextOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/field/{fieldId}/context/{contextId}/option", data) as any
  },
})
