// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetDashboardsPaginatedInput = z.object({
  dashboardName: z.string().optional().describe("String used to perform a case-insensitive partial match with `name`."),
  accountId: z.string().max(128).optional().describe("User account ID used to return dashboards with the matching `owner.accountId`. This parameter cannot be used with the `owner` parameter."),
  owner: z.string().optional().describe("This parameter is deprecated because of privacy changes. Use `accountId` instead. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. User name used to return dashboards with the matching `owner.name`. This parameter cannot be used with the `accountId` parameter."),
  groupname: z.string().optional().describe("As a group's name can change, use of `groupId` is recommended. Group name used to return dashboards that are shared with a group that matches `sharePermissions.group.name`. This parameter cannot be used with the `groupId` parameter."),
  groupId: z.string().optional().describe("Group ID used to return dashboards that are shared with a group that matches `sharePermissions.group.groupId`. This parameter cannot be used with the `groupname` parameter."),
  projectId: z.number().int().optional().describe("Project ID used to returns dashboards that are shared with a project that matches `sharePermissions.project.id`."),
  orderBy: z.enum(["description", "-description", "+description", "favorite_count", "-favorite_count", "+favorite_count", "id", "-id", "+id", "is_favorite", "-is_favorite", "+is_favorite", "name", "-name", "+name", "owner", "-owner", "+owner"]).optional().default("name").describe("[Order](#ordering) the results by a field:\n\n *  `description` Sorts by dashboard description. Note that this sort works independently of whether the expand to display the description field is in use.\n *  `favourite_count` Sorts by dashboard popularity.\n *  `id` Sorts by dashboard ID.\n *  `is_favourite` Sorts by whether the dashboard is marked as a favorite.\n *  `name` Sorts by dashboard name.\n *  `owner` Sorts by dashboard owner name."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  status: z.enum(["active", "archived", "deleted"]).optional().default("active").describe("The status to filter by. It may be active, archived or deleted."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information about dashboard in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `description` Returns the description of the dashboard.\n *  `owner` Returns the owner of the dashboard.\n *  `viewUrl` Returns the URL that is used to view the dashboard.\n *  `favourite` Returns `isFavourite`, an indicator of whether the user has set the dashboard as a favorite.\n *  `favouritedCount` Returns `popularity`, a count of how many users have set this dashboard as a favorite.\n *  `sharePermissions` Returns details of the share permissions defined for the dashboard.\n *  `editPermissions` Returns details of the edit permissions defined for the dashboard.\n *  `isWritable` Returns whether the current user has permission to edit the dashboard."),
})

export const GetDashboardsPaginatedOutput = z.any()

export const getDashboardsPaginated = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of dashboards. This operation is similar to [Get dashboards](#api-rest-api-3-dashboard-get) except that the results can be refined to include dashboards that have specific attributes. For example, dashboards with a particular name. When multiple attributes are specified only filters matching all attributes are returned.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** The following dashboards that match the query parameters are returned:\n\n *  Dashboards owned by the user. Not returned for anonymous users.\n *  Dashboards shared with a group that the user is a member of. Not returned for anonymous users.\n *  Dashboards shared with a private project that the user can browse. Not returned for anonymous users.\n *  Dashboards shared with a public project.\n *  Dashboards shared with the public.",
  input: GetDashboardsPaginatedInput,
  output: GetDashboardsPaginatedOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/dashboard/search", data) as any
  },
})
