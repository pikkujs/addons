// Project components — This resource represents project components. Use it to get, create, update, and delete project components. Also get components for project and get a count of issues by component.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetComponentRelatedIssuesInput = z.object({
  id: z.string().describe("The ID of the component."),
})

export const GetComponentRelatedIssuesOutput = z.object({
  issueCount: z.number().int().optional().describe("The count of issues assigned to a component."),
  self: z.string().url().optional().describe("The URL for this count of issues for a component."),
}).describe("Count of issues assigned to a component.")

export const getComponentRelatedIssues = pikkuSessionlessFunc({
  description: "Returns the counts of issues assigned to the component.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  input: GetComponentRelatedIssuesInput,
  output: GetComponentRelatedIssuesOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/component/{id}/relatedIssueCounts", data) as any
  },
})
