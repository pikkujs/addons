// Project versions — This resource represents project versions. Use it to get, get lists of, create, update, move, merge, and delete project versions. This resource also provides counts of issues by version.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const GetProjectVersionsPaginatedInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  orderBy: z.enum(["description", "-description", "+description", "name", "-name", "+name", "releaseDate", "-releaseDate", "+releaseDate", "sequence", "-sequence", "+sequence", "startDate", "-startDate", "+startDate"]).optional().describe("[Order](#ordering) the results by a field:\n\n *  `description` Sorts by version description.\n *  `name` Sorts by version name.\n *  `releaseDate` Sorts by release date, starting with the oldest date. Versions with no release date are listed last.\n *  `sequence` Sorts by the order of appearance in the user interface.\n *  `startDate` Sorts by start date, starting with the oldest date. Versions with no start date are listed last."),
  query: z.string().optional().describe("Filter the results using a literal string. Versions with matching `name` or `description` are returned (case insensitive)."),
  status: z.string().optional().describe("A list of status values used to filter the results by version status. This parameter accepts a comma-separated list. The status values are `released`, `unreleased`, and `archived`."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `issuesstatus` Returns the number of issues in each status category for each version.\n *  `operations` Returns actions that can be performed on the specified version."),
})

export const GetProjectVersionsPaginatedOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    archived: z.boolean().optional().describe("Indicates that the version is archived. Optional when creating or updating a version."),
    description: z.string().optional().describe("The description of the version. Optional when creating or updating a version."),
    expand: z.string().optional().describe("Use [expand](em>#expansion) to include additional information about version in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `operations` Returns the list of operations available for this version.\n *  `issuesstatus` Returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*.\n\nOptional for create and update."),
    id: z.string().optional().describe("The ID of the version."),
    issuesStatusForFixVersion: z.object({
      done: z.number().int().optional().describe("Count of issues with status *done*."),
      inProgress: z.number().int().optional().describe("Count of issues with status *in progress*."),
      toDo: z.number().int().optional().describe("Count of issues with status *to do*."),
      unmapped: z.number().int().optional().describe("Count of issues with a status other than *to do*, *in progress*, and *done*."),
    }).optional().describe("If the expand option `issuesstatus` is used, returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*."),
    moveUnfixedIssuesTo: z.string().url().optional().describe("The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not applicable when creating a version. Optional when updating a version."),
    name: z.string().optional().describe("The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters."),
    operations: z.array(z.object({
      href: z.string().optional(),
      iconClass: z.string().optional(),
      id: z.string().optional(),
      label: z.string().optional(),
      styleClass: z.string().optional(),
      title: z.string().optional(),
      weight: z.number().int().optional(),
    })).optional().describe("If the expand option `operations` is used, returns the list of operations available for this version."),
    overdue: z.boolean().optional().describe("Indicates that the version is overdue."),
    project: z.string().optional().describe("Deprecated. Use `projectId`."),
    projectId: z.number().int().optional().describe("The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version."),
    releaseDate: z.string().date().optional().describe("The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version."),
    released: z.boolean().optional().describe("Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version."),
    self: z.string().url().optional().describe("The URL of the version."),
    startDate: z.string().date().optional().describe("The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version."),
    userReleaseDate: z.string().optional().describe("The date on which work on this version is expected to finish, expressed in the instance's *Day/Month/Year Format* date format."),
    userStartDate: z.string().optional().describe("The date on which work on this version is expected to start, expressed in the instance's *Day/Month/Year Format* date format."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getProjectVersionsPaginated = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of all versions in a project. See the [Get project versions](#api-rest-api-3-project-projectIdOrKey-versions-get) resource if you want to get a full list of versions without pagination.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.",
  input: GetProjectVersionsPaginatedInput,
  output: GetProjectVersionsPaginatedOutput,
  errors: [NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/{projectIdOrKey}/version", data) as any
  },
})
