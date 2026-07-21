// Workflow statuses — This resource represents issue workflow statuses. Use it to obtain a list of all statuses associated with workflows and the details of a status.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetStatusInput = z.object({
  idOrName: z.string().describe("The ID or name of the status."),
})

export const GetStatusOutput = z.object({
  description: z.string().optional().describe("The description of the status."),
  iconUrl: z.string().optional().describe("The URL of the icon used to represent the status."),
  id: z.string().optional().describe("The ID of the status."),
  name: z.string().optional().describe("The name of the status."),
  self: z.string().optional().describe("The URL of the status."),
  statusCategory: z.object({
    colorName: z.string().optional().describe("The name of the color used to represent the status category."),
    id: z.number().int().optional().describe("The ID of the status category."),
    key: z.string().optional().describe("The key of the status category."),
    name: z.string().optional().describe("The name of the status category."),
    self: z.string().optional().describe("The URL of the status category."),
  }).optional().describe("The category assigned to the status."),
}).describe("A status.")

export const getStatus = pikkuSessionlessFunc({
  description: "Returns a status. The status must be associated with an active workflow to be returned.\n\nIf a name is used on more than one status, only the status found first is returned. Therefore, identifying the status by its ID may be preferable.\n\nThis operation can be accessed anonymously.\n\n[Permissions](#permissions) required: None.",
  input: GetStatusInput,
  output: GetStatusOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/status/{idOrName}", data) as any
  },
})
