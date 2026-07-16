// Issue security level — This resource represents issue security levels. Use it to obtain the details of any issue security level. For more information about issue security levels, see [Configuring issue-level security](https://confluence.atlassian.com/x/J4lKLg).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetIssueSecurityLevelMembersInput = z.object({
  issueSecuritySchemeId: z.number().int().describe("The ID of the issue security scheme. Use the [Get issue security schemes](#api-rest-api-3-issuesecurityschemes-get) operation to get a list of issue security scheme IDs."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  issueSecurityLevelId: z.array(z.number().int()).optional().describe("The list of issue security level IDs. To include multiple issue security levels separate IDs with ampersand: `issueSecurityLevelId=10000&issueSecurityLevelId=10001`."),
  expand: z.string().optional().describe("Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `all` Returns all expandable information.\n *  `field` Returns information about the custom field granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `user` Returns information about the user who is granted the permission."),
})

export const GetIssueSecurityLevelMembersOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    holder: z.object({
      expand: z.string().optional().describe("Expand options that include additional permission holder details in the response."),
      parameter: z.string().optional().describe("As a group's name can change, use of `value` is recommended. The identifier associated withthe `type` value that defines the holder of the permission."),
      type: z.string().describe("The type of permission holder."),
      value: z.string().optional().describe("The identifier associated with the `type` value that defines the holder of the permission."),
    }).describe("The user or group being granted the permission. It consists of a `type` and a type-dependent `parameter`. See [Holder object](../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information."),
    id: z.number().int().describe("The ID of the issue security level member."),
    issueSecurityLevelId: z.number().int().describe("The ID of the issue security level."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getIssueSecurityLevelMembers = pikkuSessionlessFunc({
  description: "Returns issue security level members.\n\nOnly issue security level members in context of classic projects are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetIssueSecurityLevelMembersInput,
  output: GetIssueSecurityLevelMembersOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issuesecurityschemes/{issueSecuritySchemeId}/members", data) as any
  },
})
