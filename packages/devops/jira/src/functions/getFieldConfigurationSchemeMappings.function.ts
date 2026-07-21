// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetFieldConfigurationSchemeMappingsInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  fieldConfigurationSchemeId: z.array(z.number().int()).min(1).max(50).optional().describe("The list of field configuration scheme IDs. To include multiple field configuration schemes separate IDs with ampersand: `fieldConfigurationSchemeId=10000&fieldConfigurationSchemeId=10001`."),
})

export const GetFieldConfigurationSchemeMappingsOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    fieldConfigurationId: z.string().describe("The ID of the field configuration."),
    fieldConfigurationSchemeId: z.string().describe("The ID of the field configuration scheme."),
    issueTypeId: z.string().describe("The ID of the issue type or *default*. When set to *default* this field configuration issue type item applies to all issue types without a field configuration."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getFieldConfigurationSchemeMappings = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of field configuration issue type items.\n\nOnly items used in classic projects are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetFieldConfigurationSchemeMappingsInput,
  output: GetFieldConfigurationSchemeMappingsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/fieldconfigurationscheme/mapping", data) as any
  },
})
