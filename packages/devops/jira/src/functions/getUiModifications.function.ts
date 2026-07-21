// UI modifications (apps) — UI modifications is an experimental feature available for **Forge apps only**. It enables Forge apps to control how selected Jira fields behave on global create issue dialog. For example: hide specific fields, set them as required, etc.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetUiModificationsInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  expand: z.string().optional().describe("Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `data` Returns UI modification data.\n *  `contexts` Returns UI modification contexts."),
})

export const GetUiModificationsOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    contexts: z.array(z.object({
      id: z.string().optional().describe("The ID of the UI modification context."),
      isAvailable: z.boolean().optional().describe("Whether a context is available. For example, when a project is deleted the context becomes unavailable."),
      issueTypeId: z.string().describe("The issue type ID of the context."),
      projectId: z.string().describe("The project ID of the context."),
      viewType: z.string().describe("The view type of the context. Only `GIC` (Global Issue Create) is supported."),
    })).optional().describe("List of contexts of the UI modification. The maximum number of contexts is 1000."),
    data: z.string().optional().describe("The data of the UI modification. The maximum size of the data is 50000 characters."),
    description: z.string().optional().describe("The description of the UI modification. The maximum length is 255 characters."),
    id: z.string().describe("The ID of the UI modification."),
    name: z.string().describe("The name of the UI modification. The maximum length is 255 characters."),
    self: z.string().describe("The URL of the UI modification."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getUiModifications = pikkuSessionlessFunc({
  description: "Gets UI modifications. UI modifications can only be retrieved by Forge apps.\n\n**[Permissions](#permissions) required:** None.",
  input: GetUiModificationsInput,
  output: GetUiModificationsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/uiModifications", data) as any
  },
})
