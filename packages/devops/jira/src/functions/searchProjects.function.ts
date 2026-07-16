// Projects — This resource represents projects. Use it to get, create, update, and delete projects. Also get statuses available to a project, a project's notification schemes, and update a project's type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const SearchProjectsInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  orderBy: z.enum(["category", "-category", "+category", "key", "-key", "+key", "name", "-name", "+name", "owner", "-owner", "+owner", "issueCount", "-issueCount", "+issueCount", "lastIssueUpdatedDate", "-lastIssueUpdatedDate", "+lastIssueUpdatedDate", "archivedDate", "+archivedDate", "-archivedDate", "deletedDate", "+deletedDate", "-deletedDate"]).optional().default("key").describe("[Order](#ordering) the results by a field.\n\n *  `category` Sorts by project category. A complete list of category IDs is found using [Get all project categories](#api-rest-api-3-projectCategory-get).\n *  `issueCount` Sorts by the total number of issues in each project.\n *  `key` Sorts by project key.\n *  `lastIssueUpdatedTime` Sorts by the last issue update time.\n *  `name` Sorts by project name.\n *  `owner` Sorts by project lead.\n *  `archivedDate` EXPERIMENTAL. Sorts by project archived date.\n *  `deletedDate` EXPERIMENTAL. Sorts by project deleted date."),
  id: z.array(z.number().int()).optional().describe("The project IDs to filter the results by. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. Up to 50 project IDs can be provided."),
  keys: z.array(z.string()).optional().describe("The project keys to filter the results by. To include multiple keys, provide an ampersand-separated list. For example, `keys=PA&keys=PB`. Up to 50 project keys can be provided."),
  query: z.string().optional().describe("Filter the results using a literal string. Projects with a matching `key` or `name` are returned (case insensitive)."),
  typeKey: z.string().optional().describe("Orders results by the [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes). This parameter accepts a comma-separated list. Valid values are `business`, `service_desk`, and `software`."),
  categoryId: z.number().int().optional().describe("The ID of the project's category. A complete list of category IDs is found using the [Get all project categories](#api-rest-api-3-projectCategory-get) operation."),
  action: z.enum(["view", "browse", "edit"]).optional().default("view").describe("Filter results by projects for which the user can:\n\n *  `view` the project, meaning that they have one of the following permissions:\n    \n     *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n     *  *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n     *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).\n *  `browse` the project, meaning that they have the *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n *  `edit` the project, meaning that they have one of the following permissions:\n    \n     *  *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n     *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expanded options include:\n\n *  `description` Returns the project description.\n *  `projectKeys` Returns all project keys associated with a project.\n *  `lead` Returns information about the project lead.\n *  `issueTypes` Returns all issue types associated with the project.\n *  `url` Returns the URL associated with the project.\n *  `insight` EXPERIMENTAL. Returns the insight details of total issue count and last issue update time for the project."),
  status: z.array(z.enum(["live", "archived", "deleted"])).optional().describe("EXPERIMENTAL. Filter results by project status:\n\n *  `live` Search live projects.\n *  `archived` Search archived projects.\n *  `deleted` Search deleted projects, those in the recycle bin."),
  properties: z.array(z.record(z.string(), z.unknown())).optional().describe("EXPERIMENTAL. A list of project properties to return for the project. This parameter accepts a comma-separated list."),
  propertyQuery: z.string().optional().describe("EXPERIMENTAL. A query string used to search properties. The query string cannot be specified using a JSON object. For example, to search for the value of `nested` from `{\"something\":{\"nested\":1,\"other\":2}}` use `[thepropertykey].something.nested=1`. Note that the propertyQuery key is enclosed in square brackets to enable searching where the propertyQuery key includes dot (.) or equals (=) characters. Note that `thepropertykey` is only returned when included in `properties`."),
})

export const SearchProjectsOutput = z.any()

export const searchProjects = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of projects visible to the user.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** Projects are returned only where the user has one of:\n\n *  *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n *  *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: SearchProjectsInput,
  output: SearchProjectsOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/search", data) as any
  },
})
