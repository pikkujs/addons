// Workflow schemes — This resource represents workflow schemes. Use it to manage workflow schemes and the workflow scheme's workflows and issue types. A workflow scheme maps issue types to workflows. A workflow scheme can be associated with one or more projects, which enables the projects to use the workflow-issue type mappings. Active workflow schemes (workflow schemes that are used by projects) cannot be edited. When an active workflow scheme is edited, a draft copy of the scheme is created. The draft workflow scheme is then be edited and published (replacing the active scheme). See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg) for more information.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetWorkflowSchemeIssueTypeInput = z.object({
  id: z.number().int().describe("The ID of the workflow scheme."),
  issueType: z.string().describe("The ID of the issue type."),
  returnDraftIfExists: z.boolean().optional().default(false).describe("Returns the mapping from the workflow scheme's draft rather than the workflow scheme, if set to true. If no draft exists, the mapping from the workflow scheme is returned."),
})

export const GetWorkflowSchemeIssueTypeOutput = z.object({
  issueType: z.string().optional().describe("The ID of the issue type. Not required if updating the issue type-workflow mapping."),
  updateDraftIfNeeded: z.boolean().optional().describe("Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the workflow scheme cannot be edited. Defaults to `false`. Only applicable when updating the workflow-issue types mapping."),
  workflow: z.string().optional().describe("The name of the workflow."),
}).describe("Details about the mapping between an issue type and a workflow.")

export const getWorkflowSchemeIssueType = pikkuSessionlessFunc({
  description: "Returns the issue type-workflow mapping for an issue type in a workflow scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetWorkflowSchemeIssueTypeInput,
  output: GetWorkflowSchemeIssueTypeOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/workflowscheme/{id}/issuetype/{issueType}", data) as any
  },
})
