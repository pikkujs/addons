// Project versions — This resource represents project versions. Use it to get, get lists of, create, update, move, merge, and delete project versions. This resource also provides counts of issues by version.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const UpdateVersionInput = z.object({
  id: z.string().describe("The ID of the version."),
  archived: z.boolean().optional().describe("Indicates that the version is archived. Optional when creating or updating a version."),
  description: z.string().optional().describe("The description of the version. Optional when creating or updating a version."),
  expand: z.string().optional().describe("Use [expand](em>#expansion) to include additional information about version in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `operations` Returns the list of operations available for this version.\n *  `issuesstatus` Returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*.\n\nOptional for create and update."),
  moveUnfixedIssuesTo: z.string().url().optional().describe("The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not applicable when creating a version. Optional when updating a version."),
  name: z.string().optional().describe("The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters."),
  project: z.string().optional().describe("Deprecated. Use `projectId`."),
  projectId: z.number().int().optional().describe("The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version."),
  releaseDate: z.string().date().optional().describe("The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version."),
  released: z.boolean().optional().describe("Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version."),
  startDate: z.string().date().optional().describe("The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version."),
})

export const UpdateVersionOutput = z.object({
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
}).describe("Details about a project version.")

export const updateVersion = pikkuSessionlessFunc({
  description: "Updates a project version.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.",
  input: UpdateVersionInput,
  output: UpdateVersionOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/version/{id}", data) as any
  },
})
