// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetFieldConfigurationItemsInput = z.object({
  id: z.number().int().describe("The ID of the field configuration."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
})

export const GetFieldConfigurationItemsOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    description: z.string().optional().describe("The description of the field within the field configuration."),
    id: z.string().describe("The ID of the field within the field configuration."),
    isHidden: z.boolean().optional().describe("Whether the field is hidden in the field configuration."),
    isRequired: z.boolean().optional().describe("Whether the field is required in the field configuration."),
    renderer: z.string().optional().describe("The renderer type for the field within the field configuration."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getFieldConfigurationItems = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of all fields for a configuration.\n\nOnly the fields from configurations used in company-managed (classic) projects are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetFieldConfigurationItemsInput,
  output: GetFieldConfigurationItemsOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/fieldconfiguration/{id}/fields", data) as any
  },
})
