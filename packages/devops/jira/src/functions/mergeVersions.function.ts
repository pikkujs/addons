// Project versions — This resource represents project versions. Use it to get, get lists of, create, update, move, merge, and delete project versions. This resource also provides counts of issues by version.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const MergeVersionsInput = z.object({
  id: z.string().describe("The ID of the version to delete."),
  moveIssuesTo: z.string().describe("The ID of the version to merge into."),
})

export const MergeVersionsOutput = z.unknown()

export const mergeVersions = pikkuSessionlessFunc({
  description: "Merges two project versions. The merge is completed by deleting the version specified in `id` and replacing any occurrences of its ID in `fixVersion` with the version ID specified in `moveIssuesTo`.\n\nConsider using [ Delete and replace version](#api-rest-api-3-version-id-removeAndSwap-post) instead. This resource supports swapping version values in `fixVersion`, `affectedVersion`, and custom fields.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.",
  input: MergeVersionsInput,
  output: MergeVersionsOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/version/{id}/mergeto/{moveIssuesTo}", data) as any
  },
})
