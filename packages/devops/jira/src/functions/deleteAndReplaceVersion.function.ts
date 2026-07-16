// Project versions — This resource represents project versions. Use it to get, get lists of, create, update, move, merge, and delete project versions. This resource also provides counts of issues by version.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const DeleteAndReplaceVersionInput = z.object({
  id: z.string().describe("The ID of the version."),
  customFieldReplacementList: z.array(z.object({
  customFieldId: z.number().int().optional().describe("The ID of the custom field in which to replace the version number."),
  moveTo: z.number().int().optional().describe("The version number to use as a replacement for the deleted version."),
})).optional().describe("An array of custom field IDs (`customFieldId`) and version IDs (`moveTo`) to update when the fields contain the deleted version."),
  moveAffectedIssuesTo: z.number().int().optional().describe("The ID of the version to update `affectedVersion` to when the field contains the deleted version."),
  moveFixIssuesTo: z.number().int().optional().describe("The ID of the version to update `fixVersion` to when the field contains the deleted version."),
})

export const DeleteAndReplaceVersionOutput = z.unknown()

export const deleteAndReplaceVersion = pikkuSessionlessFunc({
  description: "Deletes a project version.\n\nAlternative versions can be provided to update issues that use the deleted version in `fixVersion`, `affectedVersion`, or any version picker custom fields. If alternatives are not provided, occurrences of `fixVersion`, `affectedVersion`, and any version picker custom field, that contain the deleted version, are cleared. Any replacement version must be in the same project as the version being deleted and cannot be the version being deleted.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.",
  input: DeleteAndReplaceVersionInput,
  output: DeleteAndReplaceVersionOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/version/{id}/removeAndSwap", data) as any
  },
})
