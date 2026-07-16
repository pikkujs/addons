// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetFieldConfigurationSchemeProjectMappingInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  projectId: z.array(z.number().int()).describe("The list of project IDs. To include multiple projects, separate IDs with ampersand: `projectId=10000&projectId=10001`."),
})

export const GetFieldConfigurationSchemeProjectMappingOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    fieldConfigurationScheme: z.object({
      description: z.string().optional().describe("The description of the field configuration scheme."),
      id: z.string().describe("The ID of the field configuration scheme."),
      name: z.string().describe("The name of the field configuration scheme."),
    }).optional().describe("Details of a field configuration scheme."),
    projectIds: z.array(z.string()).describe("The IDs of projects using the field configuration scheme."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getFieldConfigurationSchemeProjectMapping = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of field configuration schemes and, for each scheme, a list of the projects that use it.\n\nThe list is sorted by field configuration scheme ID. The first item contains the list of project IDs assigned to the default field configuration scheme.\n\nOnly field configuration schemes used in classic projects are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetFieldConfigurationSchemeProjectMappingInput,
  output: GetFieldConfigurationSchemeProjectMappingOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/fieldconfigurationscheme/project", data) as any
  },
})
