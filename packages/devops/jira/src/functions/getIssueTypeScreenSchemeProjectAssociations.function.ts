// Issue type screen schemes — This resource represents issue type screen schemes. Use it to: * get issue type screen schemes and a list of the projects that use them. * create issue type screen schemes. * update issue type screen schemes. * delete issue type screen schemes. * associate issue type screen schemes with projects. * append issue type to screen scheme mappings to issue type screen schemes. * remove issue type to screen scheme mappings from issue type screen schemes. * update default screen scheme of issue type screen scheme.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetIssueTypeScreenSchemeProjectAssociationsInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  projectId: z.array(z.number().int()).describe("The list of project IDs. To include multiple projects, separate IDs with ampersand: `projectId=10000&projectId=10001`."),
})

export const GetIssueTypeScreenSchemeProjectAssociationsOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    issueTypeScreenScheme: z.object({
      description: z.string().optional().describe("The description of the issue type screen scheme."),
      id: z.string().describe("The ID of the issue type screen scheme."),
      name: z.string().describe("The name of the issue type screen scheme."),
    }).describe("Details of an issue type screen scheme."),
    projectIds: z.array(z.string()).describe("The IDs of the projects using the issue type screen scheme."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getIssueTypeScreenSchemeProjectAssociations = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of issue type screen schemes and, for each issue type screen scheme, a list of the projects that use it.\n\nOnly issue type screen schemes used in classic projects are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetIssueTypeScreenSchemeProjectAssociationsInput,
  output: GetIssueTypeScreenSchemeProjectAssociationsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issuetypescreenscheme/project", data) as any
  },
})
