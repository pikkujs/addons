// Filters — This resource represents [filters](https://confluence.atlassian.com/x/eQiiLQ). Use it to get, create, update, or delete filters. Also use it to configure the columns for a filter and set favorite filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetFiltersPaginatedInput = z.object({
  filterName: z.string().optional().describe("String used to perform a case-insensitive partial match with `name`."),
  accountId: z.string().max(128).optional().describe("User account ID used to return filters with the matching `owner.accountId`. This parameter cannot be used with `owner`."),
  owner: z.string().optional().describe("This parameter is deprecated because of privacy changes. Use `accountId` instead. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. User name used to return filters with the matching `owner.name`. This parameter cannot be used with `accountId`."),
  groupname: z.string().optional().describe("As a group's name can change, use of `groupId` is recommended to identify a group. Group name used to returns filters that are shared with a group that matches `sharePermissions.group.groupname`. This parameter cannot be used with the `groupId` parameter."),
  groupId: z.string().optional().describe("Group ID used to returns filters that are shared with a group that matches `sharePermissions.group.groupId`. This parameter cannot be used with the `groupname` parameter."),
  projectId: z.number().int().optional().describe("Project ID used to returns filters that are shared with a project that matches `sharePermissions.project.id`."),
  id: z.array(z.number().int()).optional().describe("The list of filter IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. Do not exceed 200 filter IDs."),
  orderBy: z.enum(["description", "-description", "+description", "favourite_count", "-favourite_count", "+favourite_count", "id", "-id", "+id", "is_favourite", "-is_favourite", "+is_favourite", "name", "-name", "+name", "owner", "-owner", "+owner", "is_shared", "-is_shared", "+is_shared"]).optional().default("name").describe("[Order](#ordering) the results by a field:\n\n *  `description` Sorts by filter description. Note that this sorting works independently of whether the expand to display the description field is in use.\n *  `favourite_count` Sorts by the count of how many users have this filter as a favorite.\n *  `is_favourite` Sorts by whether the filter is marked as a favorite.\n *  `id` Sorts by filter ID.\n *  `name` Sorts by filter name.\n *  `owner` Sorts by the ID of the filter owner.\n *  `is_shared` Sorts by whether the filter is shared."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `description` Returns the description of the filter.\n *  `favourite` Returns an indicator of whether the user has set the filter as a favorite.\n *  `favouritedCount` Returns a count of how many users have set this filter as a favorite.\n *  `jql` Returns the JQL query that the filter uses.\n *  `owner` Returns the owner of the filter.\n *  `searchUrl` Returns a URL to perform the filter's JQL query.\n *  `sharePermissions` Returns the share permissions defined for the filter.\n *  `editPermissions` Returns the edit permissions defined for the filter.\n *  `isWritable` Returns whether the current user has permission to edit the filter.\n *  `subscriptions` Returns the users that are subscribed to the filter.\n *  `viewUrl` Returns a URL to view the filter."),
  overrideSharePermissions: z.boolean().optional().default(false).describe("EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be returned. Available to users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)."),
})

export const GetFiltersPaginatedOutput = z.any()

export const getFiltersPaginated = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of filters. Use this operation to get:\n\n *  specific filters, by defining `id` only.\n *  filters that match all of the specified attributes. For example, all filters for a user with a particular word in their name. When multiple attributes are specified only filters matching all attributes are returned.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None, however, only the following filters that match the query parameters are returned:\n\n *  filters owned by the user.\n *  filters shared with a group that the user is a member of.\n *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.\n *  filters shared with a public project.\n *  filters shared with the public.",
  input: GetFiltersPaginatedInput,
  output: GetFiltersPaginatedOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/filter/search", data) as any
  },
})
