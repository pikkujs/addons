// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetDashboardItemPropertyKeysInput = z.object({
  dashboardId: z.string().describe("The ID of the dashboard."),
  itemId: z.string().describe("The ID of the dashboard item."),
})

export const GetDashboardItemPropertyKeysOutput = z.object({
  keys: z.array(z.object({
    key: z.string().optional().describe("The key of the property."),
    self: z.string().optional().describe("The URL of the property."),
  })).optional().describe("Property key details."),
}).describe("List of property keys.")

export const getDashboardItemPropertyKeys = pikkuSessionlessFunc({
  description: "Returns the keys of all properties for a dashboard item.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** The user must be the owner of the dashboard or have the dashboard shared with them. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. The System dashboard is considered to be shared with all other users, and is accessible to anonymous users when Jira’s anonymous access is permitted.",
  input: GetDashboardItemPropertyKeysInput,
  output: GetDashboardItemPropertyKeysOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties", data) as any
  },
})
