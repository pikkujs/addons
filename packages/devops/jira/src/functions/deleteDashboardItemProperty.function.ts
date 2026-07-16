// Dashboards — This resource represents dashboards. Use it to obtain the details of dashboards as well as get, create, update, or remove item properties and gadgets from dashboards.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteDashboardItemPropertyInput = z.object({
  dashboardId: z.string().describe("The ID of the dashboard."),
  itemId: z.string().describe("The ID of the dashboard item."),
  propertyKey: z.string().describe("The key of the dashboard item property."),
})

export const deleteDashboardItemProperty = pikkuSessionlessFunc({
  description: "Deletes a dashboard item property.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** The user must be the owner of the dashboard. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard.",
  input: DeleteDashboardItemPropertyInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}", data)
  },
})
