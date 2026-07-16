// Issue type screen schemes — This resource represents issue type screen schemes. Use it to: * get issue type screen schemes and a list of the projects that use them. * create issue type screen schemes. * update issue type screen schemes. * delete issue type screen schemes. * associate issue type screen schemes with projects. * append issue type to screen scheme mappings to issue type screen schemes. * remove issue type to screen scheme mappings from issue type screen schemes. * update default screen scheme of issue type screen scheme.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetProjectsForIssueTypeScreenSchemeInput = z.object({
  issueTypeScreenSchemeId: z.number().int().describe("The ID of the issue type screen scheme."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  query: z.string().optional().default(""),
})

export const GetProjectsForIssueTypeScreenSchemeOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    avatarUrls: z.object({
      "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
      "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
      "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
      "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
    }).optional().describe("The URLs of the project's avatars."),
    id: z.string().optional().describe("The ID of the project."),
    key: z.string().optional().describe("The key of the project."),
    name: z.string().optional().describe("The name of the project."),
    projectCategory: z.object({
      description: z.string().optional().describe("The name of the project category."),
      id: z.string().optional().describe("The ID of the project category."),
      name: z.string().optional().describe("The description of the project category."),
      self: z.string().optional().describe("The URL of the project category."),
    }).optional().describe("The category the project belongs to."),
    projectTypeKey: z.enum(["software", "service_desk", "business"]).optional().describe("The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project."),
    self: z.string().optional().describe("The URL of the project details."),
    simplified: z.boolean().optional().describe("Whether or not the project is simplified."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getProjectsForIssueTypeScreenScheme = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of projects associated with an issue type screen scheme.\n\nOnly company-managed projects associated with an issue type screen scheme are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetProjectsForIssueTypeScreenSchemeInput,
  output: GetProjectsForIssueTypeScreenSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/project", data) as any
  },
})
