// Issue type schemes — This resource represents issue type schemes in classic projects. Use it to: * get issue type schemes and a list of the projects that use them. * associate issue type schemes with projects. * add issue types to issue type schemes. * delete issue types from issue type schemes. * create, update, and delete issue type schemes. * change the order of issue types in issue type schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetIssueTypeSchemeForProjectsInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  projectId: z.array(z.number().int()).describe("The list of project IDs. To include multiple project IDs, provide an ampersand-separated list. For example, `projectId=10000&projectId=10001`."),
})

export const GetIssueTypeSchemeForProjectsOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    issueTypeScheme: z.object({
      defaultIssueTypeId: z.string().optional().describe("The ID of the default issue type of the issue type scheme."),
      description: z.string().optional().describe("The description of the issue type scheme."),
      id: z.string().describe("The ID of the issue type scheme."),
      isDefault: z.boolean().optional().describe("Whether the issue type scheme is the default."),
      name: z.string().describe("The name of the issue type scheme."),
    }).describe("Details of an issue type scheme."),
    projectIds: z.array(z.string()).describe("The IDs of the projects using the issue type scheme."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getIssueTypeSchemeForProjects = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of issue type schemes and, for each issue type scheme, a list of the projects that use it.\n\nOnly issue type schemes used in classic projects are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetIssueTypeSchemeForProjectsInput,
  output: GetIssueTypeSchemeForProjectsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issuetypescheme/project", data) as any
  },
})
