// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetAllDashboardsInput = z.object({
  filter: z.enum(["my", "favourite"]).optional().describe("The filter applied to the list of dashboards. Valid values are:\n\n *  `favourite` Returns dashboards the user has marked as favorite.\n *  `my` Returns dashboards owned by the user."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(20).describe("The maximum number of items to return per page."),
})

export const GetAllDashboardsOutput = z.any()

export const getAllDashboards = pikkuSessionlessFunc({
  description: "Returns a list of dashboards owned by or shared with the user. The list may be filtered to include only favorite or owned dashboards.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  input: GetAllDashboardsInput,
  output: GetAllDashboardsOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/dashboard", data) as any
  },
})
