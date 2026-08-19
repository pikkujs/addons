// Issue type schemes — This resource represents issue type schemes in classic projects. Use it to: * get issue type schemes and a list of the projects that use them. * associate issue type schemes with projects. * add issue types to issue type schemes. * delete issue types from issue type schemes. * create, update, and delete issue type schemes. * change the order of issue types in issue type schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetIssueTypeSchemesMappingInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  issueTypeSchemeId: z.array(z.number().int()).optional().describe("The list of issue type scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `issueTypeSchemeId=10000&issueTypeSchemeId=10001`."),
})

export const GetIssueTypeSchemesMappingOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    issueTypeId: z.string().describe("The ID of the issue type."),
    issueTypeSchemeId: z.string().describe("The ID of the issue type scheme."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getIssueTypeSchemesMapping = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of issue type scheme items.\n\nOnly issue type scheme items used in classic projects are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetIssueTypeSchemesMappingInput,
  output: GetIssueTypeSchemesMappingOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issuetypescheme/mapping", data) as any
  },
})
