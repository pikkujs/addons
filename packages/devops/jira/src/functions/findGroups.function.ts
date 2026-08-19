// Groups — This resource represents groups of users. Use it to get, create, find, and delete groups as well as add and remove users from groups. (\[WARNING\] The standard Atlassian group names are default names only and can be edited or deleted. For example, an admin or Atlassian support could delete the default group jira-software-users or rename it to jsw-users at any point. See https://support.atlassian.com/user-management/docs/create-and-update-groups/ for details.)

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FindGroupsInput = z.object({
  accountId: z.string().optional().describe("This parameter is deprecated, setting it does not affect the results. To find groups containing a particular user, use [Get user groups](#api-rest-api-3-user-groups-get)."),
  query: z.string().optional().describe("The string to find in group names."),
  exclude: z.array(z.string()).optional().describe("As a group's name can change, use of `excludeGroupIds` is recommended to identify a group.  \nA group to exclude from the result. To exclude multiple groups, provide an ampersand-separated list. For example, `exclude=group1&exclude=group2`. This parameter cannot be used with the `excludeGroupIds` parameter."),
  excludeId: z.array(z.string()).optional().describe("A group ID to exclude from the result. To exclude multiple groups, provide an ampersand-separated list. For example, `excludeId=group1-id&excludeId=group2-id`. This parameter cannot be used with the `excludeGroups` parameter."),
  maxResults: z.number().int().optional().describe("The maximum number of groups to return. The maximum number of groups that can be returned is limited by the system property `jira.ajax.autocomplete.limit`."),
  caseInsensitive: z.boolean().optional().default(false).describe("Whether the search for groups should be case insensitive."),
  userName: z.string().optional().describe("This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
})

export const FindGroupsOutput = z.object({
  groups: z.array(z.object({
    groupId: z.string().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*."),
    html: z.string().optional().describe("The group name with the matched query string highlighted with the HTML bold tag."),
    labels: z.array(z.object({
      text: z.string().optional().describe("The group label name."),
      title: z.string().optional().describe("The title of the group label."),
      type: z.enum(["ADMIN", "SINGLE", "MULTIPLE"]).optional().describe("The type of the group label."),
    })).optional(),
    name: z.string().optional().describe("The name of the group. The name of a group is mutable, to reliably identify a group use ``groupId`.`"),
  })).optional(),
  header: z.string().optional().describe("Header text indicating the number of groups in the response and the total number of groups found in the search."),
  total: z.number().int().optional().describe("The total number of groups found in the search."),
}).describe("The list of groups found in a search, including header text (Showing X of Y matching groups) and total of matched groups.")

export const findGroups = pikkuSessionlessFunc({
  description: "Returns a list of groups whose names contain a query string. A list of group names can be provided to exclude groups from the results.\n\nThe primary use case for this resource is to populate a group picker suggestions list. To this end, the returned object includes the `html` field where the matched query term is highlighted in the group name with the HTML strong tag. Also, the groups list is wrapped in a response object that contains a header for use in the picker, specifically *Showing X of Y matching groups*.\n\nThe list returns with the groups sorted. If no groups match the list criteria, an empty list is returned.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg). Anonymous calls and calls by users without the required permission return an empty list.\n\n*Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). Without this permission, calls where query is not an exact match to an existing group will return an empty list.",
  input: FindGroupsInput,
  output: FindGroupsOutput,
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/groups/picker", data) as any
  },
})
