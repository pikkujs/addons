// Workflow scheme drafts — This resource represents draft workflow schemes. Use it to manage drafts of workflow schemes. A workflow scheme maps issue types to workflows. A workflow scheme can be associated with one or more projects, which enables the projects to use the workflow-issue type mappings. Active workflow schemes (workflow schemes that are used by projects) cannot be edited. Editing an active workflow scheme creates a draft copy of the scheme. The draft workflow scheme can then be edited and published (replacing the active scheme). See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg) for more information.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetWorkflowSchemeDraftIssueTypeInput = z.object({
  id: z.number().int().describe("The ID of the workflow scheme that the draft belongs to."),
  issueType: z.string().describe("The ID of the issue type."),
})

export const GetWorkflowSchemeDraftIssueTypeOutput = z.object({
  issueType: z.string().optional().describe("The ID of the issue type. Not required if updating the issue type-workflow mapping."),
  updateDraftIfNeeded: z.boolean().optional().describe("Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the workflow scheme cannot be edited. Defaults to `false`. Only applicable when updating the workflow-issue types mapping."),
  workflow: z.string().optional().describe("The name of the workflow."),
}).describe("Details about the mapping between an issue type and a workflow.")

export const getWorkflowSchemeDraftIssueType = pikkuSessionlessFunc({
  description: "Returns the issue type-workflow mapping for an issue type in a workflow scheme's draft.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetWorkflowSchemeDraftIssueTypeInput,
  output: GetWorkflowSchemeDraftIssueTypeOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/workflowscheme/{id}/draft/issuetype/{issueType}", data) as any
  },
})
